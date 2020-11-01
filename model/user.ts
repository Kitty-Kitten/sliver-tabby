export enum IUserStatus {
  DISABLED = 0,
  USING,
  DELETED,
}

export interface IUserReadFields {
  name?: string;
  createTime?: number;
  updateTime?: number;
  status?: IUserStatus;
}

export interface IUserListRespData extends Required<IUserReadFields> {
  avatar: string;
}

export interface IUserListResponse {
  list: IUserListRespData[];
  total: number;
}

export interface ICreateUserRequest {
  name: string;
  password: string;
  avatar?: string;
  status?: IUserStatus;
}

export interface IUserBaseRequest {
  id: number;
}

export interface IUserEditRequest extends IUserBaseRequest, IUserReadFields {
  password?: string;
  avatar?: string;
}
