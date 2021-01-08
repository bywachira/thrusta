/* eslint-disable */
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import InputComponent from "../../components/input";
import { FitContainer, TerminalContainer } from "./styles";
import { commands } from "../../constants/command";
import { CommandHistory } from "../../interfaces/zen";

const Terminal: React.FC<{}> = (props): React.ReactElement => {
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [currentKey, setCurrentKey] = useState<string>("");
  const [clear, setClear] = useState<boolean>(false);
  const [enterKey, setEnterKey] = useState<boolean>(false);
  const [argz, setArguments] = useState<any[]>([]);

  const command_history: any = useRef();

  useEffect(() => {
    document.addEventListener("keydown", addCommand);
  }, []);

  function addCommand(e: any) {
    if (e.code === "Enter") {
      //   let updatedHistory = [...history, currentKey];
      setEnterKey(true);
    }
  }

  useEffect(() => {
    if (enterKey) {
      setHistory([
        ...history,
        {
          command: currentKey,
          output: "",
        },
      ]);
      setClear(true);
      setEnterKey(false);
      command_history.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [enterKey]);

  useEffect(() => {
    if (clear) {
      setCurrentKey("");
      setClear(false);
      createArguments();
    }
  }, [clear]);

  function createArguments() {
    const _args = history[history.length - 1].command.split(" ");

    setArguments(_args);
  }

  useEffect(() => {
    const enteredCommand = argz[0];
    if (commands[enteredCommand]?.exists) {
      console.log("Is there");
    }
  }, [argz]);

  return (
    <TerminalContainer>
      {console.log(argz)}
      <div></div>
      <FitContainer>
        <div ref={command_history}>
          {history.reverse().map((command: CommandHistory, idx: number) => {
            return (
              <div key={idx}>
                <p className="break-words text-green-400 mb-2">
                  {command.command}
                </p>
                <p className="break-words text-green-400 mb-2">
                  {command.output}
                </p>
              </div>
            );
          })}
        </div>
      </FitContainer>
      <InputComponent
        handleChange={(e) => setCurrentKey(e.target.value)}
        clear={clear}
        value={currentKey}
        history={history}
      />
    </TerminalContainer>
  );
};

export default Terminal;
