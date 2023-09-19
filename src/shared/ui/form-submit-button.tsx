import React, { FC } from "react";
import { useFormikContext } from "formik";
import { Button, CircularProgress } from "@mui/material";

export interface FormSubmitButtonProps {
  text?: string;
}

export const FormSubmitButton: FC<FormSubmitButtonProps> = ({ text }) => {
  const { isSubmitting } = useFormikContext();

  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      style={{ width: "100%" }}
      disabled={isSubmitting}
      startIcon={isSubmitting && <CircularProgress size={20} color="inherit" />}
    >
      {text}
    </Button>
  );
};
