import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// export const GetUser = createParamDecorator(
//   (data: string | undefined, ctx: ExecutionContext) => {
//     const request: Express.Request = ctx.switchToHttp().getRequest();
//     if (data) {
//       return request.user[data];
//     }
//     return request.user;
//   },
// );

// nestjs tutorial code

// export const GetUser = createParamDecorator(
//   (data: unknown, ctx: ExecutionContext) => {
//     const request = ctx.switchToHttp().getRequest();
//     return request.user;
//   },
// );

export const GetUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    if (user) {
      return user.id;
    }
    return null;
  },
);
