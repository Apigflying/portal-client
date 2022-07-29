/*
 * @Author: Json Chen
 * @Date: 2022-07-20 15:57:14
 * @LastEditTime: 2022-07-29 16:34:00
 * @LastEditors: Json Chen
 * @Description:
 * @FilePath: /mars-antd-pro/src/access.ts
 */
/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */


const childrenHasAccess = (children: any[], permission: string[]): boolean => {
  for (var i = 0; i < children.length; i++) {
    if (children[i].children) {
      return childrenHasAccess(children[i].children, permission);
    } else {
      if (children[i].access && !permission.includes(children[i].access)) {
        continue;
      } else {
        return true;
      }
    }
  }
  return false;
};

export default function access(initialState: { currentUser?: API.UserInfo } | undefined) {
  const { currentUser } = initialState || {};
  const permission = currentUser?.permission || [];
  return {
    canAdmin: !currentUser,
    USER_ACCESS: ({ children }: any) => {
      // antdpro 给做了: 子路由如果都没有权限,就不展示父级的
      return childrenHasAccess(children, permission)
    },
    USER_READ: permission.includes('USER_READ'),
    USER_GROUP_READ: permission.includes('USER_GROUP_READ'),
    SETTING_READ: permission.includes('SETTING_READ'),
    LOG_READ: permission.includes('LOG_READ'),
  };
}
