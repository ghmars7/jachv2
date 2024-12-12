export interface Student {
  // id: string;
  firstName: string;
  lastName: string;
  class: string;
  birthDate: string;
  email: string;
  parentEmail: string;
  admission: string;
}

export interface Class {
  // id: string;
  level: string;
  teacher: string;
  students: number;
}

export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  class?: string;
}

export interface SchoolYear {
  year: string;
  isActive: boolean;
  archivedAt: Date | null;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  class?: string;
}

export enum Classes {
  "Petite Section" = 1,
  "Moyenne Section" = 2,
  "Grande Section" = 3,
  "CP" = 4,
  "CE1" = 5,
  "CE2" = 6,
  "CM1" = 7,
  "CM2" = 8,
}

export enum Role {
  "professeur" = 1,
  "admin" = 2,
}

export enum Admission {
  "admis" = 1,
  "redoublement" = 2,
}

