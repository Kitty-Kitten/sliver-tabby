import { Controller } from 'egg';
import { IBasePaging } from '../../model/base';
import { BASE_HTTP_CODE, EXCEPTION_MAP } from '../../model/code';
import { IUserListQuery } from '../../model/user';
import { processQuery, transformPagingInfo } from '../utils';
import { createUserRule, getUserRule } from '../utils/validation/user';

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

    if (!ctx.helper.validateRequest(createUserRule, body)) return;

    const hasDuplicateName = await ctx.service.users.getUserByCondition({
      name: body.name,
    });

    if (hasDuplicateName.length) {
      ctx.sendErrorResponse(
        EXCEPTION_MAP.DUPLICATE_VALUE,
        BASE_HTTP_CODE.PARAM_ERROR,
      );
      return;
    }

    const response = await ctx.service.users.createUser(body);

    ctx.sendSuccessResponse(response);
  }

  public async getUser() {
    const {
      ctx,
      ctx: { query },
    } = this;

    if (!ctx.helper.validateRequest(getUserRule, query)) return;

    const response = await ctx.service.users.getUser(query);

    ctx.sendSuccessResponse(response);
  }
}
