// @ts-ignore: no declaration file
import { Client } from 'authy-client';

const authyClient = new Client({ key: process.env.TWILIO_VERIFY_API_KEY });

interface Response {
  errors?: { path: string; message: string }[];
  success?: boolean;
}

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
  let myres: Response = {};
  await authyClient
    .startPhoneVerification({
      countryCode: country_code,
      phone: phone_number,
      via: delivery_method,
    })
    .then((response: any) => {
      console.log(response);
      myres = { success: true };
      return myres;
    })
    .catch((error: any) => {
      console.log('error message: ', error.message);
      myres = {
        success: false,
        errors: [
          {
            path: 'phoneNumber',
            message: error.message,
          },
        ],
      };
    });
  return myres;
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
  let myres: Response = {};
  await authyClient
    .verifyPhone({
      countryCode: country_code,
      phone: phone_number,
      token: verification_code,
    })
    .then((response: any) => {
      console.log(response);
      myres = { success: true };
      return myres;
    })
    .catch((error: any) => {
      console.log('error message', error.message);
      const res = {
        success: false,
        errors: [
          {
            path: 'code',
            message: 'Code is expired or incorrect. Please try again.',
          },
        ],
      };
      myres = res;
      return myres;
    });

  return myres;
};
