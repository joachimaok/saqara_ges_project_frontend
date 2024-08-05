import React from 'react';
import { Card, Typography, Button, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/dashboard');
  };

  return (
    <Card className="form-container">
      <Typography.Title level={2}>404 - Page Not Found</Typography.Title>
      <Typography.Text>
        The page you are looking for does not exist or is not yours!
      </Typography.Text>

      <Divider dashed />

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

export default NotFound;
