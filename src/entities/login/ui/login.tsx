import React from "react";
import { CommonModal } from "../../../shared/ui/common-modal";
import style from "./login-styles.module.scss";
import { Form, Formik } from "formik";
import { FormInputField } from "shared/ui/form-input-field";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { authUser } from "../../user/bll/userReducer";
import { AppDispatch } from "../../../app/store/store";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FormSubmitButton } from "../../../shared/ui/form-submit-button";
import { path } from "../../../app/path";

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

  let [searchParams] = useSearchParams();
  const location = useLocation();
  const state = location.state;

  console.log(state);

  if (searchParams.size === 0) {
    navigate(`${path.login}?redirectTo=/`);
    return <></>;
  }

  const redirectTo = searchParams.get("redirectTo") || state.redirectTo;

  const schema = yup.object().shape({
    email: yup.string().required(t("please-enter-to-continue")),
    password: yup.string().required(t("please-enter-to-continue")),
  });

  const onSubmit = async (values: SignInFormValues, actions: any) => {
    actions.setSubmitting(true);
    dispatch(authUser(values));
    navigate(redirectTo || "/");
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
