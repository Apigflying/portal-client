/*
 * @Author: Json Chen
 * @Date: 2022-07-20 15:57:15
 * @LastEditTime: 2022-07-28 15:22:08
 * @LastEditors: Json Chen
 * @Description:
 * @FilePath: /mars-antd-pro/src/components/Footer/index.tsx
 */
import { DefaultFooter } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[]}
    />
  );
};

export default Footer;
