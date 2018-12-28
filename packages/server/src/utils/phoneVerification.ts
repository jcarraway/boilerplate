// @ts-ignore: no declaration file
import { Client } from 'authy-client';

const authyClient = new Client({ key: process.env.TWILIO_VERIFY_API_KEY });

/**
 * Sends an SMS containing a confirmation code to the provided phone number
 * @param phone_number
 * @param country_code
 * @param delivery_method
 */
export const startPhoneVerification = async (
  phone_number: string,
  country_code: string,
  delivery_method: string
) => {
  const response = await authyClient.startPhoneVerification({
    countryCode: country_code,
    phone: phone_number,
    via: delivery_method,
  });
  console.log('startPhoneVerification response: ', response);
  return response;
};

/**
 * Checks to make sure the code is not expired and matches the provided
 * phone number
 * @param phone_number
 * @param country_code
 * @param verification_code
 */
export const checkPhoneVerification = async (
  phone_number: string,
  country_code: string,
  verification_code: string
) => {
  const response = await authyClient.verifyPhone({
    countryCode: country_code,
    phone: phone_number,
    token: verification_code,
  });
  console.log('checkPhoneVerification', response);
  if (response.success === true) {
    console.log('we here');
    return true;
  } else if (response.success === false) {
    console.log('we also here');
    return false;
  } else {
    return false;
  }
};
