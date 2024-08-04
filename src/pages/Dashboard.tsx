import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button, Avatar, Card, Typography, Flex } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Dashboard: React.FC = () => {
  const { userData, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Card className="profile-card">
      <Flex vertical gap="small" align="center">
        <Avatar size={150} icon={<UserOutlined />} className="avatar" />
        <Typography.Title level={2} className="username">
          {userData?.username}
        </Typography.Title>
        <Button
          size="large"
          type="primary"
          className="profile-btn"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Flex>
    </Card>
  );
};

export default Dashboard;
