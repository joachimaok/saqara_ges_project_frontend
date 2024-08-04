import { ITask } from './task.interface';
import { IUser } from './user.interface';

export interface IProject {
  _id: string;
  name: string;
  description?: string;
  user: IUser;
  tasks: ITask[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateProjectForm {
  name: string;
  description?: string;
}
