/*
 * @Author: Json Chen
 * @Date: 2022-08-02 11:01:44
 * @LastEditTime: 2022-08-02 13:44:30
 * @LastEditors: Json Chen
 * @Description:
 * @FilePath: /mars-antd-pro/src/services/mars/log.ts
 */
import { PORTAL_API_PREFIX } from '@/utils/constant';
import { request } from '@umijs/max';

/** 发送验证码 POST /api/login/captcha */
export async function getLogList(
  params: {
    page?: string;
    size?: string;
    sort?: string;
    asc?: boolean;
  },
  options?: { [key: string]: any },
) {
  return request<API.LogListResult>(`${PORTAL_API_PREFIX}/logs`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function getLogDistinct(
  params: {},
  options?: { [key: string]: any },
) {
  return request<API.LogDistinctResult>(`${PORTAL_API_PREFIX}/logs/distinct`, {
    method: 'GET',
    params,
    ...(options || {}),
  });
}
