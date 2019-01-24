/** @jsx jsx */
import { css, jsx, keyframes } from "@emotion/core";

const skbounce = keyframes`
  0% {  
    -webkit-transform: scale(0);
    transform: scale(0);
  } 100% {
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
    opacity: 0;
  }
`;

const style = css`
  width: 40px;
  height: 40px;
  margin: 10px auto;
  background-color: #fff;
  border-radius: 100%;
  animation: ${skbounce} 1s infinite ease-in-out;
`;

export const Spinner = () => {
  return <div css={[style]} />;
};
