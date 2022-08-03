import { checkUserName, createUser, editUser, getUserGroupDist } from '@/services/mars/user';
import { PORTAL_API_PREFIX } from '@/utils/constant';
import { langMaps } from '@/utils/mapping';
import {
  ModalForm,
  ProFormCheckbox,
  ProFormSelect,
  ProFormText,
  ProFormUploadDragger,
  useDebounceFn,
} from '@ant-design/pro-components';
import { getAllLocales, useIntl } from '@umijs/max';
import { Form, message } from 'antd';
import { useState } from 'react';

type IProps = {
  id?: string;
  title: string;
  button: JSX.Element;
  reload?: () => void;
};

export default ({ id, title, button, reload }: IProps) => {
  const intl = useIntl();
  console.log('getAllLocales', getAllLocales());

  const [form] = Form.useForm();
  const [userDetail, setUserDetail] = useState<API.User | undefined>(undefined);

  const { run: validateUserName } = useDebounceFn(async (name: string) => {
    const result = await checkUserName({ name, id });
    return result.payload;
  }, 500);

  return (
    <ModalForm
      title={title}
      trigger={button}
      modalProps={{
        onCancel: () => console.log('run'),
        destroyOnClose: true,
      }}
      form={form}
      submitTimeout={2000}
      onFinish={async (values: API.User) => {
        const result = id ? await editUser({ _id: id, ...values }) : await createUser(values);
        result.success && message.success('操作成功!');
        reload && reload();
        return result.success;
      }}
    >
      <ProFormText
        width="md"
        name="name"
        label="名称"
        placeholder="请输入用户名称"
        hasFeedback
        initialValue={userDetail?.name}
        rules={[
          {
            required: true,
            message: 'required!',
          },
          {
            validateTrigger: ['onChange'],
            async validator(_, value: string) {
              const exist = await validateUserName(value);
              if (exist) {
                return Promise.reject(
                  intl.formatMessage({
                    id: 'pages.user.name.exist',
                  }),
                );
              }
              return Promise.resolve();
            },
          },
        ]}
      />
      <ProFormText.Password label="密码" name="password" />
      <ProFormText label="邮箱" name="email" />
      <ProFormUploadDragger
        label="头像"
        name="avatar"
        action={`${PORTAL_API_PREFIX}/upload/image`}
      />
      <ProFormSelect
        name="group"
        label="用户组"
        request={async () => {
          // const groups = await getUserGroupDistincts();
          const results = await getUserGroupDist();
          console.log('results: ', results);
          return [
            { label: '全部', value: 'all' },
            { label: '未解决', value: 'open' },
            { label: '已解决', value: 'closed' },
            { label: '解决中', value: 'processing' },
          ];
        }}
      />
      <ProFormSelect
        name="language"
        label="语言"
        options={langMaps.map((item) => {
          return {
            label: item.name,
            value: item.locale,
          };
        })}
        // request={async () => {
        //   // 获取语言列表
        //   // const groups = await getUserGroupDistincts();
        //   langMaps
        //   return [
        //     { label: '全部', value: 'all' },
        //     { label: '未解决', value: 'open' },
        //     { label: '已解决', value: 'closed' },
        //     { label: '解决中', value: 'processing' },
        //   ];
        // }}
      />

      <ProFormCheckbox name="isLock" label="锁定" />
    </ModalForm>
  );
};
