import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Spin, Alert, Typography } from 'antd';
import { IProject } from '../../interfaces/project.interface';
import { useAuth } from '../../contexts/AuthContext';

const ProjectDetails: React.FC = () => {
  const { token } = useAuth();
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<IProject | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`http://localhost:3000/projects/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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

  if (loading) {
    return <Spin />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <Card className="project-details" title={project?.name}>
      <Typography.Paragraph>{project?.description}</Typography.Paragraph>
      {/* TODO: Un composant pour afficher les tâches sera ajouté ici plus tard */}
    </Card>
  );
};

export default ProjectDetails;
