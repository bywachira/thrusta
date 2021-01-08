/* eslint-disable */
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import InputComponent from "../../components/input";
import { FitContainer, TerminalContainer } from "./styles";

const CommandHistory: React.FC<{}> = (props): React.ReactElement => {
  const [history, setHistory] = useState<any[]>([]);
  const [currentKey, setCurrentKey] = useState<string>("");
  const [clear, setClear] = useState<boolean>(false);
  const [enterKey, setEnterKey] = useState<boolean>(false);

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
      const command = [currentKey];
      setHistory([...history, ...command]);
      setClear(true);
      setEnterKey(false);
      command_history.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [enterKey]);

  useEffect(() => {
    if (clear) {
      setCurrentKey("");
      setClear(false);
    }
  }, [clear]);

  return (
    <TerminalContainer>
      <div></div>
      <FitContainer>
        <div ref={command_history}>
          {history.reverse().map((command: string, idx: number) => {
            return (
              <p className="break-words text-green-400 mb-2" key={idx}>
                {command}
              </p>
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

export default CommandHistory;
