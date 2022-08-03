/*
 * @Author: Json Chen
 * @Date: 2022-08-03 17:09:56
 * @LastEditTime: 2022-08-03 17:22:57
 * @LastEditors: Json Chen
 * @Description:
 * @FilePath: /mars-antd-pro/src/pages/Account/Components/ModalForm.tsx
 */
import { createUserGroup, editUserGroup } from '@/services/mars/user';
import { ModalForm, ProForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
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

  const [form] = Form.useForm();
  const [detail, setDetail] = useState(undefined);

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
      onFinish={async (values: API.UserGroup) => {
        const result = id ? await editUserGroup({ id, ...values }) : await createUserGroup(values);
        result.success && message.success('操作成功!');
        reload && reload();
        return result.success;
      }}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="name"
          label="品牌名称"
          placeholder={'请输入名称'}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'required!',
            },
          ]}
        />
      </ProForm.Group>
      <ProFormCheckbox name="active">生成文件</ProFormCheckbox>

      <ProForm.Group>
        <ProFormText
          width="md"
          label="品牌BrandCode"
          name="brandCode"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'required!',
            },
          ]}
        />
        <ProFormText
          width="md"
          label="品牌对应StoreCode"
          name="storeCode"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'required!',
            },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          label="品牌接口UserName"
          name="username"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'required!',
            },
          ]}
        />
        <ProFormText.Password
          width="md"
          label="品牌接口Password"
          name="password"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'required!',
            },
          ]}
        />
      </ProForm.Group>
    </ModalForm>
  );
};
