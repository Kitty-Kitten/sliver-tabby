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
