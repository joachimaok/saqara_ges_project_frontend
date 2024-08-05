import React from 'react';
import { Card, Typography, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const AccessDenied: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/dashboard');
  };

  return (
    <Card className="form-container">
      <Typography.Title level={2}>403 - Access Denied</Typography.Title>
      <Typography.Text>
        You do not have permission to view this page.
      </Typography.Text>
      <Button
        type="primary"
        onClick={handleGoHome}
        style={{ marginTop: '20px' }}
      >
        Go to Dashboard
      </Button>
    </Card>
  );
};

export default AccessDenied;
