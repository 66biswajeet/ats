import { SignUp } from "@clerk/clerk-react";
import React from "react";
import styled from "styled-components";

const Login = () => {
  const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 100px auto;
  `;
  return (
    <Div>
      <SignUp />
    </Div>
  );
};

export default Login;
