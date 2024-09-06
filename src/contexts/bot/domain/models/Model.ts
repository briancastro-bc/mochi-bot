export type BaseModel = {
  _id: string;
}

export type Model = BaseModel & {
  createdAt?: number;
  updatedAt?: number;
}