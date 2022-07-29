import Footer from '@/components/Footer';
import { getCaptcha, login } from '@/services/mars/api';
import { TOKEN } from '@/utils/constant';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginForm,
  ProFormCheckbox,
  ProFormInstance,
  ProFormText,
} from '@ant-design/pro-components';
import { FormattedMessage, history, SelectLang, useIntl, useModel } from '@umijs/max';
import { Alert, message, Space, Tooltip } from 'antd';
import React, { useRef, useState } from 'react';
import styles from './index.less';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Login: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const formRef = useRef<ProFormInstance>();
  const intl = useIntl();

  const getUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };

  const handleChangeCaptcha = async () => {
    const result = await getCaptcha();
    setUserLoginState({ captcha: result.payload });
  };

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      const { captcha } = userLoginState;
      if (captcha) values.hex = captcha.hex;
      const result = await login({ ...values });
      if (result.success) {
        // 登录成功提示
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: '登录成功！',
        });
        message.success(defaultLoginSuccessMessage);

        const token = result?.payload?.token;
        // 保存登录的token
        token && localStorage.setItem(TOKEN, token);

        await getUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      }
      formRef.current?.resetFields(['code']);
      // 如果失败去设置用户错误信息
      setUserLoginState(result);
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });
      message.error(defaultLoginFailureMessage);
    }
  };
  const { errorCode, captcha } = userLoginState;
  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>
        <LoginForm
          formRef={formRef}
          logo={<img alt="logo" src="/logo.svg" />}
          title="Unify Ops Datahub"
          subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
          initialValues={{
            remember: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <>
            <ProFormText
              name="username."
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.username.placeholder',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="验证码是必填项!"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="password."
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.password.placeholder',
                defaultMessage: '密码',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="请输入密码！"
                    />
                  ),
                },
              ]}
            />
            {captcha && (
              <Space align="start">
                <Tooltip title="看不清? 点图片更换" color={'#2db7f5'} arrowPointAtCenter>
                  <div
                    style={{ display: 'flex', cursor: 'pointer' }}
                    onClick={handleChangeCaptcha}
                    dangerouslySetInnerHTML={{
                      __html: captcha.svg,
                    }}
                  ></div>
                </Tooltip>

                <ProFormText
                  name="code"
                  fieldProps={{
                    size: 'large',
                    maxLength: 4,
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.captcha.placeholder',
                    defaultMessage: '验证码',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.captcha.required"
                          defaultMessage="请输入用户名!"
                        />
                      ),
                    },
                  ]}
                />
              </Space>
            )}
          </>
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="remember">
              <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />
            </ProFormCheckbox>
          </div>
          {errorCode && (
            <LoginMessage
              content={intl.formatMessage({
                id: `pages.login.error.${errorCode}`,
                defaultMessage: '账户或密码错误',
              })}
            />
          )}
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
