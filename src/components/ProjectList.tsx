import React, { useEffect, useState } from 'react';
import { List, Card, Spin, Alert } from 'antd';
import { useAuth } from '../contexts/AuthContext';
import { IProject } from '../interfaces/project.interface';

const ProjectList: React.FC = () => {
  const { token } = useAuth();
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [token]);

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
          <List.Item>
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
