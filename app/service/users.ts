import { Service } from 'egg';
import { IBasePaging } from '../../model/base';
import {
  ICreateUserRequest,
  IQueryUserRequest,
  IUserListQuery,
  IUserListResponse,
} from '../../model/user';

/**
 * Users Service
 */
export default class Users extends Service {
  private tableName = 'users';
  /**
   * query user list
   */
  public async getUserList(
    query: IUserListQuery & IBasePaging,
  ): Promise<IUserListResponse> {
    const { mysql } = this.app;
    const { limit, offset, name, ...res } = query;
    const nameWhere = name
      ? `name like binary ${mysql.escape('%' + name + '%')}`
      : '';
    const conditionWhere = Object.keys(res)
      .map((key) => `${key}=${res[key]}`)
      .concat(nameWhere ? [nameWhere] : [])
      .join(' AND ');
    const where = conditionWhere ? `WHERE ${conditionWhere}` : '';
    const sql = `
        select id, name, avatar, create_time, update_time, status from ${this.tableName} ${where} ORDER BY create_time DESC LIMIT ${limit} OFFSET ${offset}
      `;
    this.ctx.logger.info(sql);

    const result = await mysql.query(sql);
    this.ctx.logger.info('result', result);

    const total = await mysql.query(`select COUNT(id) from users ${where}`);
    this.ctx.logger.info('total', total);

    return {
      list: result,
      total: total[0]['COUNT(id)'],
    };
  }

  public async createUser(data: ICreateUserRequest) {
    const { mysql } = this.app;
    const currentTime = +new Date();

    const result = await mysql.insert(this.tableName, {
      ...data,
      create_time: currentTime,
      update_time: currentTime,
    });

    return result.insertId;
  }

  public async getUser(query: IQueryUserRequest) {
    const { mysql } = this.app;
    const result = await mysql.get(this.tableName, query);

    return result;
  }

  public async getUserByCondition(condition: any) {
    const { mysql } = this.app;
    const result = await mysql.select(this.tableName, {
      where: condition,
    });

    return result;
  }
}
