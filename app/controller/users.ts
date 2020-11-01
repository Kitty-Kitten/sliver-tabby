import { AES } from 'crypto-js';
import { Controller } from 'egg';
import { IBasePaging } from '../../model/base';
import { BASE_HTTP_CODE, EXCEPTION_MAP } from '../../model/code';
import { IUserListQuery } from '../../model/user';
import { processQuery, transformPagingInfo } from '../utils';
import { createUserRule, userBaseRule } from '../utils/validation/user';
import { passwordSalt } from '../../settings';

export default class HomeController extends Controller {
  private async hasDuplicateName(name: string) {
    const findName = await this.ctx.service.users.getUserByCondition({
      name,
    });

    return Boolean(findName.length);
  }

  private encryptPassword(password: string) {
    return AES.encrypt(password, passwordSalt).toString();
  }

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

    if (await this.hasDuplicateName(body.name)) {
      ctx.sendErrorResponse(
        EXCEPTION_MAP.DUPLICATE_VALUE,
        BASE_HTTP_CODE.PARAM_ERROR,
      );
      return;
    }

    const response = await ctx.service.users.createUser({
      ...body,
      password: this.encryptPassword(body.password),
    });

    ctx.sendSuccessResponse(response);
  }

  public async getUser() {
    const {
      ctx,
      ctx: { query },
    } = this;

    if (!ctx.helper.validateRequest(userBaseRule, query)) return;

    const response = await ctx.service.users.getUser(query);

    ctx.sendSuccessResponse(response);
  }

  public async editUser() {
    const { ctx } = this;
    const { body } = ctx.request;

    if (!ctx.helper.validateRequest(userBaseRule, body)) return;

    if (await this.hasDuplicateName(body.name)) {
      ctx.sendErrorResponse(
        EXCEPTION_MAP.DUPLICATE_VALUE,
        BASE_HTTP_CODE.PARAM_ERROR,
      );
      return;
    }

    const response = await ctx.service.users.editUser({
      ...body,
      ...(body.password
        ? { password: this.encryptPassword(body.password) }
        : {}),
    });

    ctx.sendSuccessResponse(response);
  }
}
