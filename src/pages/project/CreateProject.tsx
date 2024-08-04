import React, { useState } from 'react';
import { Button, Card, Form, Input, Spin, Typography, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ICreateProjectForm } from '../../interfaces/project.interface';

const CreateProject: React.FC = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCreateProject = async (values: ICreateProjectForm) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      navigate('/dashboard');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="form-container">
      <Typography.Title level={3} className="title">
        Create a new project
      </Typography.Title>
      <Form layout="vertical" onFinish={handleCreateProject} autoComplete="off">
        <Form.Item
          label="Project Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input the project name',
            },
          ]}
        >
          <Input size="large" placeholder="Enter the project name" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: 'Please input the project description',
            },
          ]}
        >
          <Input size="large" placeholder="Enter the project description" />
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
            type={`${loading ? 'default' : 'primary'}`}
            htmlType="submit"
            size="large"
            className="btn"
          >
            {loading ? <Spin /> : 'Create project'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CreateProject;
