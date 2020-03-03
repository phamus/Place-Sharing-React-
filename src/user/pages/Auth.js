import React, { useState, useContext } from "react";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MIN,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "../../shared/util/validator";
import { useForm } from "../../shared/hooks/form-hook";
import Button from "../../shared/components/FormElements/Button";

import "./Auth.css";
import Card from "../../shared/components/UIElement/Card";

import { AuthContext } from "../../shared/context/auth-context";

const Auth = () => {
  const auth = useContext(AuthContext);
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
    } else {
      try {
        const response = await fetch("http://localhost:8000/api/user/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          })
        });

        const responseData = await response.json();
        console.log(responseData);
      } catch (error) {
        console.log(error);
      }
    }
    auth.login();
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
        { ...formState.inputs, name: { value: "", isValid: false } },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  return (
    <Card className="authentication">
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
  );
};

export default Auth;
