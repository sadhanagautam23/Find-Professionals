export interface Experience {
    _id?: string;
  title: string;
  company: string;
  period: string; // e.g. "2023 – Present"
}

export interface User {
    _id: string;
  username: string;
  email: string;
  about?: string;
  category: string,
  profileCompleted: boolean,
  skills?: string[];
   experiences?: Experience[];
  
}

