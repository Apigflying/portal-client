/*
 * @Author: Json Chen
 * @Date: 2022-08-03 16:55:17
 * @LastEditTime: 2022-08-03 17:13:14
 * @LastEditors: Json Chen
 * @Description:
 * @FilePath: /mars-antd-pro/src/pages/Account/index.tsx
 */
import { getAccountList } from '@/services/mars/account';
import { PlusOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import React from 'react';
import ModalForm from './Components/ModalForm';

export default () => {
  return (
    <React.Fragment>
      <ProTable
        columns={[{}]}
        request={async (params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。

          console.log(params, sorter, filter);

          const result = await getAccountList();
          console.log('result: ', result);
          if (result.success && result.payload) {
            return Promise.resolve({
              data: result.payload,
              success: true,
            });
          }

          return Promise.resolve({
            data: [],
            success: true,
          });
        }}
        rowKey="_id"
        pagination={false}
        search={false}
        headerTitle="品牌管理"
        toolBarRender={() => [
          <ModalForm
            title={'新增品牌'}
            button={
              <Button type="primary">
                <PlusOutlined /> 新增品牌
              </Button>
            }
          />,
        ]}
      />
    </React.Fragment>
  );
};
