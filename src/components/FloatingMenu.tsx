import React from 'react';
import {
  HomeOutlined,
  ArrowLeftOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Button, Avatar, Typography } from 'antd';
import { useAuth } from '../contexts/AuthContext';
import './FloatingMenu.css';

const FloatingMenu: React.FC = () => {
  const { userData, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="floating-menu">
      <div className="user-info">
        <Avatar icon={<UserOutlined />} />
        <Typography.Text>
          {userData?.username.toLocaleUpperCase()}
        </Typography.Text>
      </div>
      <Button
        type="primary"
        shape="circle"
        icon={<HomeOutlined />}
        onClick={() => navigate('/dashboard')}
        size="large"
      />
      <Button
        type="default"
        shape="circle"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        size="large"
      />
      <Button
        danger
        type="primary"
        shape="circle"
        icon={<LogoutOutlined />}
        onClick={handleLogout}
        size="large"
      />
    </div>
  );
};

export default FloatingMenu;
