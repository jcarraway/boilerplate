import { Resolver, Mutation, Ctx } from 'type-graphql';

import { CustomContext } from './../../../types/Context';
import { removeAllUsersSessions } from './../../../utils/removeAllUsersSessions';

@Resolver()
export class LogoutResolver {
  constructor() {}

  @Mutation(() => Boolean)
  async logout(@Ctx() { redis, req, res }: CustomContext): Promise<boolean> {
    const { session } = req;

    if (session && session.userId) {
      await removeAllUsersSessions(session.userId, redis);

      await new Promise((res, rej) =>
        session.destroy(err => {
          if (!err) {
            res();
          } else {
            rej(err);
          }
        })
      );

      res.clearCookie('xid');
      return true;
    }

    return false;
  }
}
