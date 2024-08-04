import React from 'react';
import { Alert, Button, Card, Form, Input, Spin, Typography, Flex } from 'antd';
import { Link } from 'react-router-dom';
import loginImage from '../assets/login.png';
import useLogin from '../hooks/useLogin';
import { ILoginFormValues } from '../interfaces/login-form-values.interface copy';

const Login: React.FC = () => {
  const { error, loading, loginUser } = useLogin();

  const handleLogin = async (values: ILoginFormValues) => {
    await loginUser(values);
  };

  return (
    <Card className="form-container">
      <Flex gap="large" align="center">
        {/* Image */}
        <Flex flex={1}>
          <img src={loginImage} className="auth-image" alt="Login" />
        </Flex>

        {/* form */}
        <Flex vertical flex={1}>
          <Typography.Title level={3} className="title">
            Login
          </Typography.Title>
          <Typography.Text type="secondary" strong className="slogan">
            Unlock your projects!
          </Typography.Text>
          <Form layout="vertical" onFinish={handleLogin} autoComplete="off">
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username',
                },
              ]}
            >
              <Input size="large" placeholder="Enter your username" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password',
                },
              ]}
            >
              <Input.Password size="large" placeholder="Enter your password" />
            </Form.Item>

            {error && (
              <Alert
                description={error}
                type="error"
                showIcon
                closable
                className="alert"
              />
            )}

            <Form.Item>
              <Button
                type={loading ? 'default' : 'primary'}
                htmlType="submit"
                size="large"
                className="btn"
              >
                {loading ? <Spin /> : 'Login'}
              </Button>
            </Form.Item>

            <Form.Item>
              <Link to="/">
                <Button size="large" className="btn">
                  Create an account
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </Flex>
      </Flex>
    </Card>
  );
};

export default Login;
