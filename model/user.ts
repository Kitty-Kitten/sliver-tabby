export enum IUserStatus {
  DISABLED = 0,
  USING,
  DELETED,
}

export interface IUserListQuery {
  name?: string;
  createTime?: number;
  updateTime?: number;
  status?: IUserStatus;
}

export interface IUserListRespData extends Required<IUserListQuery> {
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

export interface IUserEditRequest extends IUserBaseRequest {
  createTime?: number;
  updateTime?: number;
}
