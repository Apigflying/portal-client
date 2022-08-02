/*
 * @Author: Json Chen
 * @Date: 2022-08-02 14:54:33
 * @LastEditTime: 2022-08-02 15:13:03
 * @LastEditors: Json Chen
 * @Description:
 * @FilePath: /mars-antd-pro/src/services/mars/setting.ts
 */
import { PORTAL_API_PREFIX } from '@/utils/constant';
import { request } from '@umijs/max';

// 获取配置信息
export async function getSetting(
  options?: { [key: string]: any },
) {
  return request<API.SettingResult>(`${PORTAL_API_PREFIX}/setting`, {
    method: 'GET',
    ...(options || {}),
  });
}

// 设置配置信息
export async function setSetting(body: API.SettingResult, options?: { [key: string]: any }) {
  return request<API.SettingResult>(`${PORTAL_API_PREFIX}/setting`, {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
