import { ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from '@nestjs/passport'
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  getRequest(context: ExecutionContext) {
    // the context here is a nest js context for REST server
    // create a new context for GraphQL server
    const ctx = GqlExecutionContext.create(context);

    // return the GraphQL context
    return ctx.getContext().req;
  }
}