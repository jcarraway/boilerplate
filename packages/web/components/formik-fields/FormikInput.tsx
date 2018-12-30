import * as React from 'react';
import { Input } from '@hwyd/ui';
import { FieldProps } from 'formik';

export const FormikInput = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}: FieldProps<any>) => {
  const errorText = touched[field.name] && errors[field.name];

  return (
    <div>
      <Input errorText={errorText} {...field} {...props} />
      {errorText && <div>{errors[field.name]}</div>}
    </div>
  );
};
