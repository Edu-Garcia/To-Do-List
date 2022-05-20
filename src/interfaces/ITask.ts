import { IUser } from "./IUser";

export interface ITask {
  title: string;
  description: string;
  complete: boolean;
  id: string;
  user: IUser | null;
}