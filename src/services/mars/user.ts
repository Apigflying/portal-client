/*
 * @Author: Json Chen
 * @Date: 2022-07-20 15:57:15
 * @LastEditTime: 2022-08-02 16:57:35
 * @LastEditors: Json Chen
 * @Description:
 * @FilePath: /mars-antd-pro/src/services/mars/user.ts
 */
// @ts-ignore
/* eslint-disable */
import { PORTAL_API_PREFIX } from '@/utils/constant';
import { request } from '@umijs/max';


/** 获取当前的用户信息 */
export async function getUserInfo(options?: { [key: string]: any }) {
  return request<API.UserInfoResult>(`${PORTAL_API_PREFIX}/user/info`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取用户列表 */
export async function getUserList(options?: { [key: string]: any }) {
  return request<API.UserListResult>(`${PORTAL_API_PREFIX}/user/list`, {
    method: 'GET',
    ...(options || {}),
  });
}




// 获取用户组列表
export async function getUserGroupList(options?: { [key: string]: any }) {
  return request<API.UserGroupListResult>(`${PORTAL_API_PREFIX}/user/group/list`, {
    method: 'GET',
    ...(options || {}),
  });
}

// 检查用户组name是否存在
export async function checkUserGroupName(body: API.UserGroupNameExistParams, options?: { [key: string]: any }) {
  return request<API.UserGroupNameExistResult>(`${PORTAL_API_PREFIX}/user/group/name/exist`, {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}


export async function delUserGroup(id: string, options?: { [key: string]: any }) {
  return request<API.UserGroupListResult>(`${PORTAL_API_PREFIX}/user/group/del/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}


// 获取所有的权限
export async function getAllAccess(options?: { [key: string]: any }) {
  return request<API.UserPermissionResult>(`${PORTAL_API_PREFIX}/user/all_access`, {
    method: 'GET',
    ...(options || {}),
  });
}
// 获取用户组详情
export async function getUserGroupDetail(id: string, options?: { [key: string]: any }) {
  return request<API.UserGroupResult>(`${PORTAL_API_PREFIX}/user/group/detail/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.UserInfo;
  }>(`${PORTAL_API_PREFIX}/user/info`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function createUserGroup(body: API.UserGroup, options?: { [key: string]: any }) {
  return request<API.UserGroupSetResult>(`${PORTAL_API_PREFIX}/user/group/add`, {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
export async function editUserGroup(body: API.UserGroupEditParams, options?: { [key: string]: any }) {
  const { id, ...params } = body;
  return request<API.UserGroupSetResult>(`${PORTAL_API_PREFIX}/user/group/edit/${id}`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}































// =========================================


/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
