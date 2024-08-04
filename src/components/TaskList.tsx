import React from 'react';
import { Collapse, Card, Button, Modal, message, Space } from 'antd';
import { ITask } from '../interfaces/task.interface';

interface TaskListProps {
  tasks: ITask[];
  onDelete: (taskId: string) => void;
  onEdit: (task: ITask) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onEdit }) => {
  const handleDeleteTask = (taskId: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this task?',
      content: 'This action cannot be undone.',
      okText: 'Yes, delete it',
      okType: 'danger',
      cancelText: 'No, cancel',
      onOk: () => onDelete(taskId),
    });
  };

  const items = tasks.map((task: ITask) => ({
    key: task._id,
    label: task.name,
    children: (
      <div>
        <p>{task.description}</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Space size="middle">
            <Button onClick={() => onEdit(task)}>Edit</Button>
            <Button danger onClick={() => handleDeleteTask(task._id)}>
              Delete
            </Button>
          </Space>
        </div>
      </div>
    ),
  }));

  return (
    <Card title="Tasks">
      <Collapse accordion items={items} />
    </Card>
  );
};

export default TaskList;
