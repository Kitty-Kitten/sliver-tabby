import { Controller } from 'egg';
import { IBasePaging } from '../../model/base';
import { IUserListQuery } from '../../model/user';
import { processQuery, transformPagingInfo } from '../utils';
import { createUserRule } from '../utils/validation/user';

export default class HomeController extends Controller {
  public async getUserList() {
    const {
      ctx,
      ctx: { query },
    } = this;

    const transformedQuery = transformPagingInfo(query);
    const response = await ctx.service.users.getUserList(
      processQuery(transformedQuery) as IUserListQuery & IBasePaging,
    );

    ctx.sendSuccessResponse(response);
  }

  public async createUser() {
    const { ctx } = this;
    const { body } = ctx.request;

    if (!ctx.helper.validateRequest(createUserRule, body)) {
      return;
    }

    const response = await ctx.service.users.createUser(body);

    ctx.sendSuccessResponse(response);
  }
}
