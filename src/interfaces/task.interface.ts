export interface ITask {
  _id: string;
  name: string;
  description?: string;
  completed: boolean;
  project: string;
  createdAt: Date;
  updatedAt: Date;
}
