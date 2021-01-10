import React from "react";

type CalloutProps = {
  emoji: string;
  message: string;
  color?: string;
  header: string;
  renderContent: () => React.ReactElement;
};

function Callout(props: CalloutProps): React.ReactElement {
  return (
    <div className="relative flex flex-wrap sm:flex-no-wrap justify-between bg-white rounded-xl overflow-hidden p-2 space-x-0 sm:space-x-2">
      <div className="absolute inset-0 border-l-4 border-white"></div>
      <div className="flex flex-1 sm:flex-initial justify-center items-baseline py-4 sm:py-0">
        <span className="bg-red-300 bg-opacity-50 rounded-full p-1 text-lg">
          <p className="w-8 h-8 flex justify-center">{props.emoji}</p>
        </span>
      </div>
      <div className="flex flex-col flex-grow text-center sm:text-left">
        <h1 className="font-medium leading-relaxed sm:leading-normal">
          {props.header}
        </h1>
        <p className="leading-tight text-xs md:text-sm">{props.message}</p>
      </div>
      <div className="flex">{props.renderContent()}</div>
    </div>
  );
}

export default Callout;
