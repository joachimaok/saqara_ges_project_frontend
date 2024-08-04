import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Spin, Alert, Button, Modal, Form, Input, message } from 'antd';
import { useAuth } from '../../contexts/AuthContext';
import { IProject } from '../../interfaces/project.interface';
import TaskList from '../../components/TaskList';
import { ITask } from '../../interfaces/task.interface';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const [project, setProject] = useState<IProject | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Updated

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

  const handleDeleteTask = async (taskId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      message.success('Task deleted successfully');
      setProject((prevProject) => {
        if (!prevProject) return null;
        return {
          ...prevProject,
          tasks: prevProject.tasks.filter((task) => task._id !== taskId),
        };
      });
    } catch (err) {
      message.error((err as Error).message);
    }
  };

  const handleEditTask = (task: ITask) => {
    // TODO: Implementation for editing task
  };

  const handleCreateTask = async (values: {
    name: string;
    description: string;
  }) => {
    try {
      Object.assign(values, { projectId: id });
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error('Failed to create task');
      }
      const newTask = await response.json();
      message.success('Task created successfully');
      setProject((prevProject) => {
        if (!prevProject) return null;
        return {
          ...prevProject,
          tasks: [...prevProject.tasks, newTask],
        };
      });
    } catch (err) {
      message.error((err as Error).message);
    } finally {
      setIsModalOpen(false); // Updated
    }
  };

  const showCreateTaskModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <Spin />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <Card title={project?.name}>
      <p>{project?.description}</p>
      <Button type="primary" onClick={showCreateTaskModal}>
        Create Task
      </Button>
      <TaskList
        tasks={project?.tasks || []}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
      />
      <Modal
        title="Create Task"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleCreateTask}>
          <Form.Item
            label="Task Name"
            name="name"
            rules={[{ required: true, message: 'Please input the task name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: 'Please input the task description' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Task
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default ProjectDetails;
