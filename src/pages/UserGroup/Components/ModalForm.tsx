/*
 * @Author: Json Chen
 * @Date: 2022-07-29 14:43:11
 * @LastEditTime: 2022-07-29 18:01:27
 * @LastEditors: Json Chen
 * @Description:
 * @FilePath: /mars-antd-pro/src/pages/UserGroup/Components/ModalForm.tsx
 */
import {
  checkUserGroupName,
  createUserGroup,
  editUserGroup,
  getAllAccess,
  getUserGroupDetail,
} from '@/services/mars/api';
import { ModalForm, ProForm, ProFormText, useDebounceFn } from '@ant-design/pro-components';
import { useIntl, useRequest } from '@umijs/max';
import { Checkbox, Form, message } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

type IProps = {
  id?: string;
  title: string;
  button: JSX.Element;
};

export default ({ id, title, button }: IProps) => {
  const intl = useIntl();

  const { data: userGroupDetail } = useRequest(() => id && getUserGroupDetail(id), {
    ready: !!id,
  });
  console.log('userGroupDetail: ', userGroupDetail);

  const { data: _allAccess } = useRequest(getAllAccess);
  const allAccess = _allAccess as string[];

  const { run: validateUserGroupName } = useDebounceFn(async (name: string) => {
    const result = await checkUserGroupName({ name, id });
    return result.payload;
  }, 500);

  return (
    <ModalForm
      title={title}
      trigger={button}
      modalProps={{
        onCancel: () => console.log('run'),
      }}
      submitTimeout={2000}
      onFinish={async (values: API.UserGroup) => {
        console.log('values: ', values);
        const result = id ? await editUserGroup({ id, ...values }) : await createUserGroup(values);
        result.success && message.success('操作成功!');
        return result.success;
      }}
    >
      <ProForm.Group label="用户组名称">
        <ProFormText
          width="md"
          name="name"
          placeholder="请输入用户组名称"
          hasFeedback
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
        <Form.Item name="access">
          <Checkbox.Group options={allAccess}></Checkbox.Group>
        </Form.Item>
      </ProForm.Group>
    </ModalForm>
  );
};
