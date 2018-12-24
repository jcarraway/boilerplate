import { Resolver, Mutation, Ctx } from 'type-graphql';

import { CustomContext } from './../../../types/Context';
import { removeAllUsersSessions } from './../../../utils/removeAllUsersSessions';

@Resolver()
export class LogoutResolver {
  constructor() {}

  @Mutation(() => Boolean)
  async logout(@Ctx() { redis, req, res }: CustomContext): Promise<boolean> {
    const { session } = req;

    console.log('logout resolver session', session);

    if (session && session.userId) {
      await removeAllUsersSessions(session.userId, redis);

      await new Promise(res =>
        session.destroy(err => {
          if (!err) {
            res();
          } else {
            console.log(err);
          }
        })
      );

      res.clearCookie('xid');
      return true;
    }

    return false;
  }
}
