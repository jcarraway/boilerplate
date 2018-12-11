import * as yup from 'yup';

export const emailTooShort: string = 'email must be at least 3 characters';
export const invalidEmail: string = 'email must be a valid email';
export const passwordTooShort: string =
  'password must be at least 5 characters';
export const nameTooShort: string = 'name must be at least 2 characters';
export const usernameNotValid = 'username can only contain letters and numbers';

export const passwordValidation = yup
  .string()
  .min(5, passwordTooShort)
  .max(255)
  .required();

export const emailValidation = yup
  .string()
  .min(3, emailTooShort)
  .max(255)
  .email(invalidEmail)
  .required();

export const usernameValidation = yup
  .string()
  .matches(/^[a-zA-Z0-9]*$/, usernameNotValid)
  .min(2, nameTooShort)
  .max(255)
  .required();

export const registerSchema = yup.object().shape({
  username: usernameValidation,
  email: emailValidation,
  password: passwordValidation,
});

const invalidLogin = 'invalid login';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, invalidLogin)
    .max(255, invalidLogin)
    .email(invalidLogin)
    .required(),
  password: yup
    .string()
    .min(5, invalidLogin)
    .max(255, invalidLogin)
    .required(),
});

export const changePasswordSchema = yup.object().shape({
  newPassword: passwordValidation,
});
