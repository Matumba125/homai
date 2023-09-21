import React from "react";
import { CommonModal } from "../../../shared/ui/common-modal";
import style from "./login-styles.module.scss";
import { Form, Formik } from "formik";
import { FormInputField } from "shared/ui/form-input-field";
import * as yup from "yup";
import { Auth } from "../../../app/api/api";
import { useDispatch } from "react-redux";
import { fakeAuthUser, getUser } from "../../user/bll/userReducer";
import { AppDispatch } from "../../../app/store/store";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FormSubmitButton } from "../../../shared/ui/form-submit-button";

export interface SignInFormValues {
  username: "";
  password: "";
}

const initialValues: SignInFormValues = {
  username: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { t } = useTranslation(["login"]);

  const schema = yup.object().shape({
    email: yup.string().required(t("please-enter-to-continue")),
    password: yup.string().required(t("please-enter-to-continue")),
  });

  const onSubmit = async (values: SignInFormValues, actions: any) => {
    actions.setSubmitting(true);
    try {
      const res = await Auth.login(values);
      dispatch(getUser(res.data.id));
      navigate("/");
    } catch (e) {
      dispatch(fakeAuthUser());
      actions.setSubmitting(false);
      navigate("/");
    }
  };

  return (
    <CommonModal open={true} unClosable={true} handleClose={() => {}}>
      <div className={style.loginWrapper}>
        <h2 className={style.loginHeader}>{t("header")}</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={schema}
        >
          <Form className={style.loginForm}>
            <FormInputField
              autoComplete={"username"}
              name="email"
              label={t("username-input-label")}
              required
            />
            <FormInputField
              name="password"
              label={t("password-input-label")}
              type="password"
              autoComplete="password"
              isPassword
              required
            />
            <FormSubmitButton text={t("submit")} />
          </Form>
        </Formik>
      </div>
    </CommonModal>
  );
};

export default Login;
