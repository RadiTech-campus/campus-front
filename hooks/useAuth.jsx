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
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((result) => {
        setUsername(result.username);
        setUseremail(result.attributes.email);
        setIsAuthenticated(true);
        setIsLoading(false);
      })
      .catch(() => {
        setUsername("");
        setUseremail("");
        setIsAuthenticated(false);
        setIsLoading(false);
      });
  }, []);

  const signUp = async (username, password, email) => {
    try {
      const result = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },

        autoSignIn: {
          enabled: true,
        },
      });
      return result;
    } catch (error) {
      // console.log("회원가입 에러", error);
      alert("인증 메일 발송을 실패 했습니다.", error);
      return error;
    }
  };

  const confirmSignUp = async (username, code) => {
    try {
      const result = await Auth.confirmSignUp(username, code);
      return result;
    } catch (error) {
      // console.log("메일 인증 컨펌 에러", error);
      alert("회원가입을 실패 했습니다.", error);
      return error;
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
      // console.log("로그인 에러", error);
      alert("로그인을 실패 했습니다.", error);
      return error;
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

  return {
    isLoading,
    isAuthenticated,
    username,
    useremail,
    signUp,
    confirmSignUp,
    signIn,
    signOut,
  };
};
