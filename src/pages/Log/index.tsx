/*
 * @Author: Json Chen
 * @Date: 2022-07-29 10:00:36
 * @LastEditTime: 2022-08-02 13:49:48
 * @LastEditors: Json Chen
 * @Description:
 * @FilePath: /mars-antd-pro/src/pages/Log/index.tsx
 */
import { getLogDistinct, getLogList } from '@/services/mars/log';
import { formatPagation } from '@/utils/format';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import moment from 'moment';
import React, { useState } from 'react';

export default () => {
  const { data: distincts } = useRequest(getLogDistinct);

  const { actionDist = [], userDist = [] } = (distincts || {}) as API.LogDistinct;
  const [pagination, setPagination] = useState<API.PagationFormatted>({
    current: 1,

    pageSize: 10,

    total: 0,
  });

  const columns = [
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: true,
      render: (_: any, { createdAt }: API.Log) => moment(createdAt).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '用户',
      dataIndex: 'user',
      key: 'user',
      filters: userDist.map((u) => ({ text: u, value: u })),
    },
    {
      title: '操作类型',
      dataIndex: 'action',
      key: 'action',
      filters: actionDist.map((u) => ({ text: u, value: u })),
    },
    {
      title: 'url',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: '是否成功',
      dataIndex: 'success',
      render(_: any, { success }: API.Log) {
        return success ? (
          <CheckCircleTwoTone twoToneColor="#52c41a" />
        ) : (
          <CloseCircleTwoTone twoToneColor="#eb2f96" />
        );
      },
    },
  ];

  return (
    <React.Fragment>
      <ProTable<API.Log>
        columns={columns}
        request={async (params, sorter, filter) => {
          console.log('request :::: ', params, sorter, filter);
          // 表单搜索项会从 params 传入，传递给后端接口。

          const sort = Object.keys(sorter)[0];
          const asc = Object.values(sorter)[0] === 'ascend';
          const { current = 1, pageSize = 10 } = params;

          const requestParams: any = {
            page: String(current),
            size: String(pageSize),
          };

          if (sort) {
            requestParams.sort = sort;
            requestParams.asc = asc;
          }

          const result = await getLogList(requestParams);
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
        toolBarRender={false}
      />
    </React.Fragment>
  );
};
