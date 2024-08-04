import React, { useEffect, useState } from 'react';
import { List, Card, Spin, Alert, Button } from 'antd';
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

  if (loading) {
    return <Spin />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <Card title="Your Projects">
      <List
        itemLayout="horizontal"
        dataSource={projects}
        renderItem={(project) => (
          <List.Item
            actions={[
              <Button key="view" onClick={() => handleViewProject(project._id)}>
                View
              </Button>,
              <Button key="edit" onClick={() => handleEditProject(project._id)}>
                Edit
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={project.name}
              description={project.description}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default ProjectList;
