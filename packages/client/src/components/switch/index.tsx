import React from "react";

type SwitchProps = {
  label: string;
  handleChange: (identifier: string, status: boolean) => any;
  value: boolean;
  identifier: string;
};

const Switch: React.FC<SwitchProps> = (props): React.ReactElement => {
  return (
    <div className="" key={props.identifier}>
      <label htmlFor="toogleA" className="flex items-center cursor-pointer">
        {props.label && (
          <div className="mr-2 text-xs font-extrabold text-white">{props.label}</div>
        )}
        <div className="relative">
          <input
            id="toogleA"
            type="checkbox"
            className="hidden"
            onChange={() => props.handleChange(props.identifier, !props.value)}
            checked={props.value}
          />
          <div
            className={`toggle__line w-10 h-4 ${
              props.value ? "bg-green-500" : "bg-white"
            } rounded-full shadow-inner`}
          ></div>
          <div className="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0"></div>
        </div>
      </label>
    </div>
  );
};

export default Switch;
