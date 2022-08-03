/*
 * @Author: Json Chen
 * @Date: 2022-07-29 09:44:21
 * @LastEditTime: 2022-08-03 10:47:31
 * @LastEditors: Json Chen
 * @Description:
 * @FilePath: /mars-antd-pro/src/pages/User/index.tsx
 */
import { getUserList } from '@/services/mars/user';
import { formatPagation } from '@/utils/format';
import { PlusOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useState } from 'react';
import ModalForm from './Components/ModalForm';

export default () => {
  // 获取所有用户组

  const [pagination, setPagination] = useState<API.PagationFormatted>({
    current: 1,

    pageSize: 10,

    total: 0,
  });

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      render(_: any, { name }: API.UserInfo) {
        return (
          <div>
            <div>{name}</div>
            <div>
              <Button type="text">编辑</Button>
              <Button type="text">密码</Button>
              <Button type="text">锁定</Button>
              <Button type="text">删除</Button>
            </div>
          </div>
        );
      },
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '用户组',
      dataIndex: 'group',
      render(_: any, { group }: API.UserInfo) {
        return group?.length ? group.map((item) => item).join(',') : '-';
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
    },
  ];

  return (
    <React.Fragment>
      <ProTable<API.UserInfo>
        columns={columns}
        request={async (params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。

          console.log(params, sorter, filter);

          const result = await getUserList();
          if (result.success && result.payload) {
            setPagination(formatPagation(result.payload));

            return Promise.resolve({
              data: result.payload.docs,
              success: true,
            });
          }

          return Promise.resolve({
            data: [],
            success: true,
          });
        }}
        rowKey="_id"
        pagination={{
          ...pagination,
          showQuickJumper: true,
        }}
        search={false}
        headerTitle="高级表格"
        toolBarRender={() => [
          <ModalForm
            title="新增用户"
            button={
              <Button type="primary">
                <PlusOutlined /> 新增用户
              </Button>
            }
          ></ModalForm>,
        ]}
      />
    </React.Fragment>
  );
};
