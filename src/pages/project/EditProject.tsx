import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Form, Input, Spin, Typography, Alert } from 'antd';
import { useAuth } from '../../contexts/AuthContext';
import { IEditProjectForm, IProject } from '../../interfaces/project.interface';

const EditProject: React.FC = () => {
  const { token } = useAuth();
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<IProject | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_API_URL}/projects/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error('Failed to fetch project');
        }
        const data = await response.json();
        setProject(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, token]);

  const handleEditProject = async (values: IEditProjectForm) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API_URL}/projects/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to update project');
      }

      navigate('/dashboard');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spin />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <Card className="form-container">
      <Typography.Title level={3} className="title">
        Edit Project
      </Typography.Title>
      {project && (
        <Form
          layout="vertical"
          onFinish={handleEditProject}
          initialValues={{
            name: project.name,
            description: project.description,
          }}
          autoComplete="off"
        >
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
              {loading ? <Spin /> : 'Update project'}
            </Button>
          </Form.Item>
        </Form>
      )}
    </Card>
  );
};

export default EditProject;
