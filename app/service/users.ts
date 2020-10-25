import { Service } from 'egg';
import { IBasePaging } from '../../model/base';
import {
  ICreateUserData,
  IUserListQuery,
  IUserListResponse,
} from '../../model/user';

/**
 * Users Service
 */
export default class Users extends Service {
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
        select id, name, avatar, create_time, update_time, status from users ${where} ORDER BY create_time DESC LIMIT ${limit} OFFSET ${offset}
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

  public async createUser(data: ICreateUserData) {
    const { mysql } = this.app;
    const currentTime = +new Date();

    const result = await mysql.insert('users', {
      ...data,
      create_time: currentTime,
      update_time: currentTime,
    });

    return result.insertId;
  }
}
