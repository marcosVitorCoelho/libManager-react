import { Stack } from "@mui/material";
import styled from "styled-components";

export const TableContainer = styled(Stack)`
  gap: 10px;
  width: 60vw;
  height: fit-content;
  overflow: auto;
  align-items: center;
  justify-content: center;
  padding: 16px;

  background: rgba(213, 212, 212, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4.5px);
  -webkit-backdrop-filter: blur(4.5px);
  border-radius: 10px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
