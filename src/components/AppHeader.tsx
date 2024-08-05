// src/components/AppHeader.tsx
import React from 'react';
import { Layout, Typography } from 'antd';

const { Header } = Layout;

const AppHeader: React.FC = () => {
  return (
    <Header
      style={{ backgroundColor: '#fff', textAlign: 'center', padding: '0' }}
    >
      <Typography.Title level={2} style={{ margin: '0', lineHeight: '64px' }}>
        Project Management App
      </Typography.Title>
    </Header>
  );
};

export default AppHeader;
