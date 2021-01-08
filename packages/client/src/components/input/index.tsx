import React from "react";
import { useEffect } from "react";
import { CommandHistory } from "../../interfaces/zen";
import { Input, InputContainer } from "./styles";

type InputProps = {
  handleChange: (...args: any) => void;
  value: string;
  history: CommandHistory[];
  clear: boolean;
};

const InputComponent: React.FC<InputProps> = (props): React.ReactElement => {
  useEffect(() => {
    if (props.clear) {
      // console.log(clear);
    }
  }, [props.clear]);

  return (
    <InputContainer>
      <div className="flex">
        <p className="text-white mr-2">thrusta&gt;~ </p>
        <Input
          autoFocus={true}
          type="text"
          value={props.value}
          onChange={props.handleChange}
        />
      </div>
    </InputContainer>
  );
};

export default InputComponent;
