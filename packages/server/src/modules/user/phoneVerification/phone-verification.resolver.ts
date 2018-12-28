import { Resolver, Mutation, Arg, Ctx, Authorized } from 'type-graphql';

import { PhoneVerificationResponse } from './phone-verification.response';
import { User } from './../../../entities/User';
import { CustomContext } from './../../../types/Context';
import {
  checkPhoneVerification,
  startPhoneVerification,
} from './../../../utils/phoneVerification';

@Resolver()
export class PhoneVerificationResolver {
  constructor() {}

  @Authorized()
  @Mutation(() => PhoneVerificationResponse)
  async sendPhoneVerification(
    @Arg('phoneNumber') phoneNumber: string,
    @Ctx() { req }: CustomContext
  ): Promise<PhoneVerificationResponse> {
    // hard code for now
    // (only support US and SMS verifications)
    const country_code = '1';
    const via = 'sms';

    const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');

    const userId = req.session!.userId;

    if (userId) {
      const response = await startPhoneVerification(
        cleanPhoneNumber,
        country_code,
        via
      );
      if (response) {
        console.log('startPhoneVerification:::', response);
        if (response.success === true) {
          await User.update(userId, { phoneNumber: cleanPhoneNumber });
        }
        return response;
      }
    }

    return {
      success: false,
      errors: [
        {
          path: 'phoneNumber',
          message: 'Oops! Something went wrong. Please try again.',
        },
      ],
    };
  }

  @Authorized()
  @Mutation(() => PhoneVerificationResponse)
  async checkPhoneVerification(
    @Arg('code') code: string,
    @Ctx() { req }: CustomContext
  ): Promise<PhoneVerificationResponse> {
    // hard code for now (only support US and SMS verifications)
    const country_code = '1';

    const userId = req.session!.userId;

    const user = await User.findOne({
      select: ['phoneNumber'],
      where: { id: userId },
    });

    const phoneNumber = user!.phoneNumber;

    if (phoneNumber) {
      const response = await checkPhoneVerification(
        phoneNumber,
        country_code,
        code
      );
      console.log('checkPhoneVerification:::', response);
      if (response) {
        if (response.success === true) {
          await User.update(userId, { phoneVerified: true });
        }
        return response;
      }
    }

    return {
      success: false,
      errors: [
        {
          path: 'code',
          message:
            'Oops! Something went wrong during verification. Please try again.',
        },
      ],
    };
  }
}
