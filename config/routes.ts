/*
 * @Author: Json Chen
 * @Date: 2022-07-20 15:57:14
 * @LastEditTime: 2022-08-02 15:26:04
 * @LastEditors: Json Chen
 * @Description:
 * @FilePath: /mars-antd-pro/config/routes.ts
 */
/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,title 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/login',
    name: 'login',
    layout: false,
    component: './Login',
  },
  {
    path: '/home',
    name: 'home',
    icon: 'home',
    component: './index',
  },
  {
    path: '/user',
    name: 'user',
    icon: 'user',
    routes: [{
      path: '/user/list',
      name: 'list',
      access: 'USER_READ',
      icon: 'useradd',
      component: './User'
    }, {
      path: '/user/group/list',
      name: 'group.list',
      access: 'USER_GROUP_READ',
      icon: 'usergroupadd',
      component: './UserGroup'
    }]
  }, {
    path: '/setting',
    name: 'setting',
    icon: 'setting',
    access: 'SETTING_READ',
    component: './Setting'
  }, {
    path: '/logs',
    name: 'log',
    icon: 'calendar',
    access: 'LOG_READ',
    component: './Log'
  },

  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '*',
    component: './404',
  },
];
