/*
 * @Author: Json Chen
 * @Date: 2022-08-03 17:08:06
 * @LastEditTime: 2022-08-03 17:08:50
 * @LastEditors: Json Chen
 * @Description:
 * @FilePath: /mars-antd-pro/src/services/mars/account.ts
 */
import { PORTAL_API_PREFIX } from '@/utils/constant';
import { request } from '@umijs/max';

// 获取配置信息
export async function getAccountList(options?: { [key: string]: any }) {
  return request<any>(`${PORTAL_API_PREFIX}/account/list`, {
    method: 'GET',
    ...(options || {}),
  });
}
