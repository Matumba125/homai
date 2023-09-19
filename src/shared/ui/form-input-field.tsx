import React from "react";
import { Field } from "formik";
import { TextField, TextFieldProps } from "@mui/material";

export type FormInputFieldProps = TextFieldProps & {
  name: string;
  isPassword?: boolean;
  showPassword?: boolean;
  label: string;
  helperText?: string;
};

export const FormInputField = React.memo(function FormInputField({
  name,
  label,
  isPassword,
  showPassword,
  helperText,
  ...props
}: FormInputFieldProps) {
  return (
    <Field name={name}>
      {({ field, meta: { error, touched } }: any) => (
        <TextField
          {...field}
          label={label}
          helperText={(touched && error) || helperText}
          error={touched && Boolean(error)}
          margin="dense"
          variant="outlined"
          fullWidth
          type={isPassword ? "password" : undefined}
          {...props}
        />
      )}
    </Field>
  );
});
