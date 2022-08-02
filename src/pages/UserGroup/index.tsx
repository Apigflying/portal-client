/*
 * @Author: Json Chen
 * @Date: 2022-07-29 09:44:28
 * @LastEditTime: 2022-08-02 11:29:26
 * @LastEditors: Json Chen
 * @Description:
 * @FilePath: /mars-antd-pro/src/pages/UserGroup/index.tsx
 */
import { delUserGroup, getAllAccess, getUserGroupList } from '@/services/mars/user';
import { formatPagation } from '@/utils/format';
import { PlusOutlined } from '@ant-design/icons';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, Popconfirm, Space, Tag } from 'antd';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import ModalForm from './Components/ModalForm';

export default () => {
  const actionRef = useRef<ActionType>();
  const { data: _allAccess } = useRequest(getAllAccess);

  const allAccess = (_allAccess || []) as string[];
  const handleDelete = async (id: string) => {
    const result = await delUserGroup(id);
    if (result.success) {
      actionRef.current?.reload();
    }
  };

  const columns: ProColumns<API.UserGroup>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, { name }) => name,
    },

    {
      title: 'Access',
      key: 'access',
      render: (_, { access }: API.UserGroup) => {
        return (
          <Space wrap>
            {(access || []).map((text: string, index: number) => (
              <Tag color="magenta" key={index}>
                {text}
              </Tag>
            ))}
          </Space>
        );
      },
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, { createdAt }) => moment(createdAt).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      key: '_id',
      render: (_, { _id }: API.UserGroup) => {
        console.log('_id: ', _id);
        return (
          <Space>
            <ModalForm
              reload={actionRef.current?.reload}
              id={_id}
              allAccess={allAccess}
              title="编辑用户组"
              button={<Button type="text">编辑</Button>}
            />
            <Popconfirm
              title="确认删除吗?"
              onConfirm={() => handleDelete(_id)}
              okText="确认"
              cancelText="取消"
            >
              <Button type="text">删除</Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const [pagination, setPagination] = useState<API.PagationFormatted>({
    current: 1,

    pageSize: 10,

    total: 0,
  });

  return (
    <React.Fragment>
      <ProTable<API.UserGroup>
        actionRef={actionRef}
        columns={columns}
        request={async (params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。

          console.log(params, sorter, filter);

          const result = await getUserGroupList();
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
            title="新增用户组"
            reload={actionRef.current?.reload}
            allAccess={allAccess}
            button={
              <Button type="primary">
                <PlusOutlined /> 新增用户组
              </Button>
            }
          />,
        ]}
      />
    </React.Fragment>
  );
};
