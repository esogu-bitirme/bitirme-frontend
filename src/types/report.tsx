import { Doctor } from './doctor';

export type Report = {
  id: number;
  description: string;
  diagnosis: string;
  status: Status;
  doctor: Doctor;
  createDate: Date;
  updateDate: Date;
};
