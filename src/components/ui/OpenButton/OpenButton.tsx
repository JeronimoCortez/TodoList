import { FC } from "react";

interface IPropsOpenButton {
  onClick: () => void;
}

const OpenButton: FC<IPropsOpenButton> = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <img src="./check.svg" alt="" />
    </button>
  );
};

export default OpenButton;
