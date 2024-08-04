import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button, Avatar, Card, Typography, Flex, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ProjectList from '../components/ProjectList';

const Dashboard: React.FC = () => {
  const { userData, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
  };

  const handleCreateProject = () => {
    navigate('/create-project');
  };

  return (
    <Card className="profile-card">
      <Flex vertical gap="small" align="center">
        <Avatar size={150} icon={<UserOutlined />} className="avatar" />
        <Typography.Title level={2} className="username">
          Welcome {userData?.username}!
        </Typography.Title>
        <Button
          size="large"
          type="primary"
          className="profile-btn"
          onClick={handleLogout}
        >
          Logout
        </Button>

        <Button
          size="large"
          type="default"
          className="profile-btn"
          onClick={handleCreateProject}
        >
          Create Project
        </Button>
      </Flex>

      <Divider dashed />

      <ProjectList />
    </Card>
  );
};

export default Dashboard;
