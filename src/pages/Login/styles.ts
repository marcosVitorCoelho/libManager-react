import { Stack } from "@mui/material";
import styled from "styled-components";

export const FormContainer = styled(Stack)`
  gap: 10px;
  width: 500px;
  height: max-content;
  align-items: center;
  justify-content: center;
  padding: 16px;

  background: rgba(213, 212, 212, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4.5px);
  -webkit-backdrop-filter: blur(4.5px);
  border-radius: 10px;

  h1 {
    font-size: 1.5rem;
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme["gray-500"]};

    &:hover {
      color: ${(props) => props.theme["gray-300"]};
    }
  }
`;

export const FormInputContainer = styled(Stack)`
  gap: 10px;
`;
