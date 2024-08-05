import React from 'react';
import { Alert, Button, Card, Form, Input, Spin, Typography, Flex } from 'antd';
import { Link } from 'react-router-dom';
import registerImage from '../assets/register.png';
import useRegister from '../hooks/useRegister';
import { IRegisterFormValues } from '../interfaces/register-form-values.interface';

const Register: React.FC = () => {
  const { loading, error, registerUser } = useRegister();

  const handleRegister = (values: IRegisterFormValues) => {
    registerUser(values);
  };

  return (
    <Card className="form-container">
      <Flex gap="large" align="center">
        {/* form */}
        <Flex vertical flex={1}>
          <Typography.Title level={3} className="title">
            Create an account
          </Typography.Title>
          <Typography.Text type="secondary" strong className="slogan">
            Join for exclusive access
          </Typography.Text>
          <Form layout="vertical" onFinish={handleRegister} autoComplete="off">
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

            <Form.Item
              label="Confirm Password"
              name="passwordConfirm"
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password',
                },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Re-enter your password"
              />
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
                {loading ? <Spin /> : 'Create account'}
              </Button>
            </Form.Item>

            <Form.Item>
              <Link to="/login">
                <Button size="large" className="btn">
                  Login
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </Flex>

        {/* Image */}
        <Flex flex={1}>
          <img src={registerImage} className="auth-image" alt="Register" />
        </Flex>
      </Flex>
    </Card>
  );
};

export default Register;
