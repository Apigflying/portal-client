import {
  checkUserGroupName,
  createUserGroup,
  editUserGroup,
  getUserGroupDetail,
} from '@/services/mars/user';
import { ModalForm, ProForm, ProFormText, useDebounceFn } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Checkbox, Form, message } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useState } from 'react';

type IProps = {
  id?: string;
  title: string;
  allAccess: string[];
  button: JSX.Element;
  reload?: () => void;
};

export default ({ id, title, button, allAccess, reload }: IProps) => {
  const intl = useIntl();

  const [form] = Form.useForm();
  const [userGroupDetail, setUserGroupDetail] = useState<API.UserGroup | undefined>(undefined);

  const { run: validateUserGroupName } = useDebounceFn(async (name: string) => {
    const result = await checkUserGroupName({ name, id });
    return result.payload;
  }, 500);

  const onVisibleChange = async (visible: boolean) => {
    if (visible && id) {
      const result = await getUserGroupDetail(id);
      if (result.success) {
        setUserGroupDetail(result.payload);
        form.setFieldsValue({
          name: result.payload.name,
          access: result.payload.access,
        });
      }
    }
  };

  return (
    <ModalForm
      title={title}
      trigger={button}
      modalProps={{
        onCancel: () => console.log('run'),
        destroyOnClose: true,
      }}
      form={form}
      onVisibleChange={onVisibleChange}
      submitTimeout={2000}
      onFinish={async (values: API.UserGroup) => {
        const result = id ? await editUserGroup({ id, ...values }) : await createUserGroup(values);
        result.success && message.success('操作成功!');
        reload && reload();
        return result.success;
      }}
    >
      <ProForm.Group label="用户组名称">
        <ProFormText
          width="md"
          name="name"
          placeholder="请输入用户组名称"
          hasFeedback
          initialValue={userGroupDetail?.name}
          rules={[
            {
              required: true,
              message: 'required!',
            },
            {
              validateTrigger: ['onChange'],
              async validator(_, value: string) {
                const exist = await validateUserGroupName(value);
                if (exist) {
                  return Promise.reject(
                    intl.formatMessage({
                      id: 'pages.user.group.name.exist',
                    }),
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group label="权限管理">
        <Form.Item
          shouldUpdate={(p, c) => {
            return p?.access?.length !== c?.access?.length;
          }}
        >
          {({ getFieldValue, setFieldsValue }) => {
            const currentAccess = getFieldValue('access') || [];
            return (
              <Checkbox
                indeterminate={!!currentAccess.length && currentAccess.length !== allAccess.length}
                checked={currentAccess.length === allAccess.length}
                onChange={(e: CheckboxChangeEvent) => {
                  setFieldsValue({
                    access: e.target.checked ? allAccess : [],
                  });
                }}
              >
                全选
              </Checkbox>
            );
          }}
        </Form.Item>
        <Form.Item name="access" initialValue={userGroupDetail?.access || []}>
          <Checkbox.Group options={allAccess}></Checkbox.Group>
        </Form.Item>
      </ProForm.Group>
    </ModalForm>
  );
};
