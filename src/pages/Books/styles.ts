import { Stack } from "@mui/material";
import styled from "styled-components";

export const FormContainer = styled(Stack)`
  gap: 10px;
  width: auto;
  height: 350px;
  align-items: center;
  justify-content: center;
  padding: 64px;

  background: rgba(213, 212, 212, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4.5px);
  -webkit-backdrop-filter: blur(4.5px);
  border-radius: 10px;

  h1 {
    font-size: 1.5rem;
  }
`;

export const FormInputContainer = styled(Stack)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const NamePhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
`;
