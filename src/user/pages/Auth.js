import React, { useState, useContext, Fragment } from "react";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "../../shared/util/validator";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hooks";

import Button from "../../shared/components/FormElements/Button";

import "./Auth.css";
import Card from "../../shared/components/UIElement/Card";

import { AuthContext } from "../../shared/context/auth-context";

import ErrorModal from "../../shared/components/UIElement/ErrorModal";

import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";

import ImageUpload from "../../shared/components/FormElements/ImageUploads";

const Auth = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false
      },
      password: {
        value: "",
        isValid: false
      }
    },
    false
  );

  const authSubmitHandler = async event => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          "http://localhost:8000/api/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {
            "Content-Type": "application/json"
          }
        );

        auth.login(responseData.user.id, responseData.token);
      } catch (error) {}
    } else {
      try {
        const responseData = await sendRequest(
          "http://localhost:8000/api/users/signUp",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
            name: formState.inputs.name.value
          }),
          {
            "Content-Type": "application/json"
          }
        );

        auth.login(responseData.user.id, responseData.token);
      } catch (error) {}
    }
  };

  const switchModeHandler = event => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: { value: "", isValid: false }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const errorHandler = () => {
    clearError();
  };
  return (
    <Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              label="name"
              id="name"
              type="text"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name"
              onInput={inputHandler}
            />
          )}

          <Input
            id="email"
            type="email"
            label="Email"
            element="input"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email"
            onInput={inputHandler}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            element="input"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password with more than 6 characters"
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "Login" : "SignUp"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          {" "}
          Switch to {isLoginMode ? "SignUp" : "Login"}
        </Button>
      </Card>
    </Fragment>
  );
};

export default Auth;
