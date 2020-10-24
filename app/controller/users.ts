import { Controller } from 'egg';
import { IBasePaging } from '../../model/base';
import { IUserListQuery } from '../../model/user';
import { processQuery, transformPagingInfo } from '../utils';

export default class HomeController extends Controller {
  public async list() {
    const {
      ctx,
      ctx: { query },
    } = this;

    const transformedQuery = transformPagingInfo(query);
    const response = await ctx.service.users.list(
      processQuery(transformedQuery) as IUserListQuery & IBasePaging,
    );

    ctx.sendSuccessResponse(response);
  }
}
