/*
 * @Author: Json Chen
 * @Date: 2022-07-20 15:57:15
 * @LastEditTime: 2022-08-02 11:26:36
 * @LastEditors: Json Chen
 * @Description:
 * @FilePath: /mars-antd-pro/src/services/mars/login.ts
 */
// @ts-ignore
/* eslint-disable */
import { API_PREFIX } from '@/utils/constant';
import { request } from '@umijs/max';

/** 登录接口 POST /api/login */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>(`${API_PREFIX}/login`, {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 刷新验证码 GET /api/login/captcha */
export async function getCaptcha(options?: { [key: string]: any }): Promise<any> {
  return request<API.LoginResult>(`${API_PREFIX}/login/captcha`, {
    method: 'GET',
    ...(options || {}),
  });
};
