import Amplify, { Auth } from "aws-amplify";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AwsConfigAuth } from "../config/auth";

Amplify.configure({ Auth: AwsConfigAuth });

const authContext = createContext({});

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userName, setUserName] = useState("");
  useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: true })
      .then((result) => {
        setUsername(result.username);
        setUseremail(result.attributes.email);
        setUserPhone(result.attributes["custom:phone"]);
        setUserName(result.attributes["custom:userName"]);
        setIsAuthenticated(true);
        setIsLoading(false);
      })
      .catch(() => {
        setUsername("");
        setUseremail("");
        setUserPhone("");
        setUserName("");
        setIsAuthenticated(false);
        setIsLoading(false);
      });
  }, [Auth]);
  const signUp = async (username, password, email, phone, userName) => {
    try {
      const result = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          "custom:phone": phone,
          "custom:userName": userName,
        },
        autoSignIn: {
          enabled: true,
        },
      });
      return result;
    } catch (error) {
      console.log("signUp error", error.message);
      // alert("인증 메일 발송을 실패 했습니다.in useAuth", error);
      return error.message;
    }
  };

  const confirmSignUp = async (username, code) => {
    try {
      const result = await Auth.confirmSignUp(username, code);
      return result;
    } catch (error) {
      console.log("confirmSignUp error", error);
      // alert("회원가입을 실패 했습니다.", error);
      return error.message;
    }
  };

  const signIn = async (username, password) => {
    try {
      const result = await Auth.signIn(username, password);
      setUsername(result.username);
      setUseremail(result.attributes.email);
      setIsAuthenticated(true);
      return result;
    } catch (error) {
      // alert("아이디와 비밀번호를 확인해 주세요.", error);
      return error.message;
    }
  };

  const signOut = async () => {
    try {
      const result = await Auth.signOut();
      setUsername("");
      setUseremail("");
      setIsAuthenticated(false);
      return result;
    } catch (error) {
      alert("로그아웃을 실패 했습니다.", error);
      return error;
    }
  };

  const forgotPassword = async (userId) => {
    try {
      const result = await Auth.forgotPassword(userId);
      return result;
    } catch (error) {
      return error.message;
    }
  };

  const confirmForgotPassword = async (userId, code, new_password) => {
    try {
      const result = await Auth.forgotPasswordSubmit(
        userId,
        code,
        new_password,
      );
      return result;
    } catch (error) {
      return error.message;
    }
  };

  return {
    isLoading,
    isAuthenticated,
    username,
    useremail,
    userPhone,
    userName,
    signUp,
    confirmSignUp,
    signIn,
    signOut,
    forgotPassword,
    confirmForgotPassword,
  };
};
