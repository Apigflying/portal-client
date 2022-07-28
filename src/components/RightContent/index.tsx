/*
 * @Author: Json Chen
 * @Date: 2022-07-20 15:57:15
 * @LastEditTime: 2022-07-28 17:38:09
 * @LastEditors: Json Chen
 * @Description:
 * @FilePath: /mars-antd-pro/src/components/RightContent/index.tsx
 */
import { QuestionCircleOutlined } from '@ant-design/icons';
import { SelectLang, useModel } from '@umijs/max';
import { Space } from 'antd';
import React from 'react';
import Avatar from './AvatarDropdown';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }
  return (
    <Space className={className}>
      <span className={styles.action} onClick={() => {}}>
        <QuestionCircleOutlined />
      </span>
      <Avatar menu />
      <SelectLang className={styles.action} />
    </Space>
  );
};
export default GlobalHeaderRight;
