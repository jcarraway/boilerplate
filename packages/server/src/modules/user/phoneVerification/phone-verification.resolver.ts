import { checkPhoneVerification } from './../../../utils/phoneVerification';
import { User } from './../../../entities/User';
import { CustomContext } from './../../../types/Context';
import { startPhoneVerification } from '../../../utils/phoneVerification';
import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';

@Resolver()
export class SendPhoneVerificationResolver {
  constructor() {}

  @Mutation(() => Boolean)
  async sendPhoneVerification(@Arg('phoneNumber') phoneNumber: string) {
    // hard code for now (only support US and SMS verifications)
    const country_code = '1';
    const via = 'sms';

    const response = await startPhoneVerification(
      phoneNumber,
      country_code,
      via
    );

    console.log('sendPhoneVerification:::', response);

    return true;
  }

  @Mutation(() => Boolean)
  async checkPhoneVerification(
    @Arg('code') code: string,
    @Ctx() { req }: CustomContext
  ) {
    // hard code for now (only support US and SMS verifications)
    const country_code = '1';

    const userId = req.session!.userId;

    const user = await User.findOne({
      select: ['phoneNumber'],
      where: { id: userId },
    });

    const phoneNumber = user!.phoneNumber;

    if (user && phoneNumber) {
      console.log('hello');
      const response = await checkPhoneVerification(
        phoneNumber,
        country_code,
        code
      );
      console.log('checkPhoneVerification:::', response);
      return response;
    }

    return false;
  }
}
