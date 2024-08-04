import React, { useEffect, useState } from 'react';
import {
  Collapse,
  Card,
  Spin,
  Alert,
  Button,
  Modal,
  message,
  Space,
  Empty,
} from 'antd';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { IProject } from '../interfaces/project.interface';

const ProjectList: React.FC = () => {
  const { token } = useAuth();
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:3000/projects', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [token]);

  const handleViewProject = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  const handleEditProject = (projectId: string) => {
    navigate(`/projects/edit/${projectId}`);
  };

  const handleDeleteProject = (projectId: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this project?',
      content: 'This action cannot be undone.',
      okText: 'Yes, delete it',
      okType: 'danger',
      cancelText: 'No, cancel',
      onOk: async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/projects/${projectId}`,
            {
              method: 'DELETE',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          if (!response.ok) {
            throw new Error('Failed to delete project');
          }
          message.success('Project deleted successfully');
          setProjects(projects.filter((project) => project._id !== projectId));
        } catch (err) {
          message.error((err as Error).message);
        }
      },
    });
  };

  if (loading) {
    return <Spin />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  const items = projects.map((project: IProject) => ({
    key: project._id,
    label: project.name,
    children: (
      <div>
        <p>{project.description}</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Space size="middle">
            <Button onClick={() => handleViewProject(project._id)}>View</Button>
            <Button onClick={() => handleEditProject(project._id)}>Edit</Button>
            <Button danger onClick={() => handleDeleteProject(project._id)}>
              Delete
            </Button>
          </Space>
        </div>
      </div>
    ),
  }));

  return (
    <Card title="Your Projects">
      {projects.length === 0 ? (
        <Empty description="No projects available" />
      ) : (
        <Collapse accordion items={items} />
      )}
    </Card>
  );
};

export default ProjectList;
