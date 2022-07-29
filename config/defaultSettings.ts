/*
 * @Author: Json Chen
 * @Date: 2022-07-20 15:57:14
 * @LastEditTime: 2022-07-29 11:46:31
 * @LastEditors: Json Chen
 * @Description:
 * @FilePath: /mars-antd-pro/config/defaultSettings.ts
 */
import { Settings as LayoutSettings } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Unify Ops Datahub',
  pwa: false,
  logo: 'http://localhost:6003/static/favicon.ico',
  iconfontUrl: '',
};

export default Settings;
