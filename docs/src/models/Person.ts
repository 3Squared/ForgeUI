export interface Person {
  id: number;
  first_name: string;
  last_name: string;
  age: number;
  dateJoined: Date;
  [key: string]: any;
}
