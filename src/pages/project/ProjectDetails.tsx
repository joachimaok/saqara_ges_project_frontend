import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Card,
  Spin,
  Alert,
  Button,
  Modal,
  Form,
  Input,
  message,
  Divider,
} from 'antd';
import { useAuth } from '../../contexts/AuthContext';
import { IProject } from '../../interfaces/project.interface';
import TaskList from '../../components/TaskList';
import { ITask } from '../../interfaces/task.interface';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { token, userData } = useAuth();
  const [project, setProject] = useState<IProject | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [editingTask, setEditingTask] = useState<ITask | null>(null);
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
          navigate('*');
        }
        const data: IProject = await response.json();
        if (data.user.username !== userData?.username) {
          navigate('/access-denied');
          return;
        }
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
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API_URL}/tasks`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
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
    setEditingTask(task);
    setIsModalOpen(true);
    form.setFieldsValue({
      name: task.name,
      description: task.description,
    });
  };

  const handleCreateTask = async (values: {
    name: string;
    description: string;
  }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API_URL}/tasks`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...values, projectId: id }),
        },
      );
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
      form.resetFields();
    } catch (err) {
      message.error((err as Error).message);
    } finally {
      setIsModalOpen(false);
      setEditingTask(null);
    }
  };

  const handleUpdateTask = async (values: {
    name: string;
    description: string;
  }) => {
    if (!editingTask) return;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API_URL}/tasks/${editingTask._id}`,
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
        throw new Error('Failed to update task');
      }
      const updatedTask = await response.json();
      message.success('Task updated successfully');
      setProject((prevProject) => {
        if (!prevProject) return null;
        return {
          ...prevProject,
          tasks: prevProject.tasks.map((task) =>
            task._id === updatedTask._id ? updatedTask : task,
          ),
        };
      });
      form.resetFields();
    } catch (err) {
      message.error((err as Error).message);
    } finally {
      setIsModalOpen(false);
      setEditingTask(null);
    }
  };

  const handleCompleteTask = async (taskId: string) => {
    try {
      const task = project?.tasks.find((task) => task._id === taskId);
      if (!task) {
        throw new Error('Task not found');
      }
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API_URL}/tasks/${taskId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ completed: !task.completed }),
        },
      );
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
      const updatedTask = await response.json();
      message.success('Task updated successfully');
      setProject((prevProject) => {
        if (!prevProject) return null;
        return {
          ...prevProject,
          tasks: prevProject.tasks.map((task) =>
            task._id === updatedTask._id ? updatedTask : task,
          ),
        };
      });
    } catch (err) {
      message.error((err as Error).message);
    }
  };

  const showCreateTaskModal = () => {
    setEditingTask(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
    setEditingTask(null);
  };

  if (loading) {
    return <Spin />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <Card title={`Project : ${project?.name}`}>
      <p>{project?.description}</p>
      <Divider dashed />
      <Button type="primary" onClick={showCreateTaskModal}>
        Create Task
      </Button>
      <Divider dashed />
      <TaskList
        tasks={project?.tasks || []}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
        onComplete={handleCompleteTask}
      />
      <Modal
        title={editingTask ? 'Edit Task' : 'Create Task'}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={editingTask ? handleUpdateTask : handleCreateTask}
        >
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
              {editingTask ? 'Update Task' : 'Create Task'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default ProjectDetails;
