import styled, { keyframes } from "styled-components";

const spinnerAnimation = keyframes`
from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

export const Spinner = styled.div`
  height: ${(p) => (p.height ? p.height : "2.5rem")};
  width: ${(p) => (p.width ? p.width : "2.5rem")};
  border: ${(p) => (p.borderWidth ? p.borderWidth : "4px")} solid #d1d5db;
  border-top-color: ${(p) => (p.borderColor ? p.borderColor : "#3b82f6")};
  border-radius: 50%;
  animation: ${spinnerAnimation}
    ${(p) => (p.duration ? `${p.duration}ms` : "800ms")} linear infinite;
`;
