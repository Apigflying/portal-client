/*
 * @Author: Json Chen
 * @Date: 2022-07-29 10:00:48
 * @LastEditTime: 2022-08-02 15:22:07
 * @LastEditors: Json Chen
 * @Description:
 * @FilePath: /mars-antd-pro/src/pages/Setting/index.tsx
 */
import { getSetting, setSetting } from '@/services/mars/setting';
import {
  ProForm,
  ProFormCheckbox,
  ProFormInstance,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { message } from 'antd';
import React, { useRef } from 'react';

export default () => {
  const formRef = useRef<ProFormInstance>();
  return (
    <React.Fragment>
      <ProForm
        title="新建表单"
        formRef={formRef}
        request={async () => {
          const result = await getSetting();
          console.log('result1: ', result);
          return Promise.resolve(result.payload || {});
        }}
        onFinish={async (values) => {
          // await waitTime(2000);
          const result = await setSetting(values);

          console.log('result2: ', result);

          message.success('提交成功');
          return true;
        }}
      >
        <ProFormTextArea
          width="xl"
          name="ipWhitelist"
          label="IP 白名单"
          fieldProps={{
            showCount: true,
            autoSize: true,
          }}
        />
        <ProFormCheckbox name="ipCheck">启用 IP 白名单</ProFormCheckbox>
      </ProForm>
    </React.Fragment>
  );
};
