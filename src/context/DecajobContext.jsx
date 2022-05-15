import { createContext } from "react";
import { css } from "@emotion/react";
import BounceLoader from "react-spinners/BounceLoader";
import BarLoader from "react-spinners/BarLoader";

const DecajobContext = createContext();

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function BounceLoading({ status }) {
  return (
    <BounceLoader
      color={"#11b719"}
      loading={status}
      css={override}
      size={100}
    />
  );
}

function BarLoading({ status }) {
  return (
    <BarLoader color={"#11b719"} loading={status} css={override} size={100} />
  );
}

export const DecajobProvider = ({ children }) => {
  return (
    <DecajobContext.Provider value={{ BounceLoading, BarLoading }}>
      {children}
    </DecajobContext.Provider>
  );
};

export default DecajobContext;
