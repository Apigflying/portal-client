/*
 * @Author: Json Chen
 * @Date: 2022-07-20 15:57:15
 * @LastEditTime: 2022-07-29 09:44:09
 * @LastEditors: Json Chen
 * @Description:
 * @FilePath: /mars-antd-pro/src/services/swagger/user.ts
 */
// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Create user This can only be done by the logged in user. POST /user */
export async function createUser(body: API.User, options?: { [key: string]: any }) {
  return request<any>('/user', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** Get user by user name GET /user/${param0} */
export async function getUserByName(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserByNameParams,
  options?: { [key: string]: any },
) {
  const { username: param0, ...queryParams } = params;
  return request<API.User>(`/user/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Updated user This can only be done by the logged in user. PUT /user/${param0} */
export async function updateUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateUserParams,
  body: API.User,
  options?: { [key: string]: any },
) {
  const { username: param0, ...queryParams } = params;
  return request<any>(`/user/${param0}`, {
    method: 'PUT',
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Delete user This can only be done by the logged in user. DELETE /user/${param0} */
export async function deleteUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUserParams,
  options?: { [key: string]: any },
) {
  const { username: param0, ...queryParams } = params;
  return request<any>(`/user/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Creates list of users with given input array POST /user/createWithArray */
export async function createUsersWithArrayInput(
  body: API.User[],
  options?: { [key: string]: any },
) {
  return request<any>('/user/createWithArray', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** Creates list of users with given input array POST /user/createWithList */
export async function createUsersWithListInput(body: API.User[], options?: { [key: string]: any }) {
  return request<any>('/user/createWithList', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** Logs out current logged in user session GET /user/logout */
export async function logoutUser(options?: { [key: string]: any }) {
  return request<any>('/user/logout', {
    method: 'GET',
    ...(options || {}),
  });
}
