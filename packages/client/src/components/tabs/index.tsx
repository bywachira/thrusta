/* eslint-disable */

import React, { useState } from "react";

export function Tabs({ children }: any): React.ReactElement {
  const [activeTab, setActiveTab] = useState(0);

  function selectTab(tabIndex: number) {
    setActiveTab(tabIndex);
  }

  return (
    <div className="">
      <div className="tabs flex flex-col sm:flex-row mt-2 mb-2 rounded">
        {React.Children.map(children, ({ props: { label } }, index) => (
          <button
            role="tab"
            // selected={activeTab === index}
            aria-selected={activeTab === index ? "true" : "false"}
            onClick={() => selectTab(index)}
            className={`tab text-sm ${
              activeTab === index ? "active" : ""
            } ${activeTab === index ? "text-white" : "text-white"} py-4 px-6 block hover:${
              activeTab === index
                ? "text-white font-extrabold"
                : "text-gray-300 font-extrabold"
            } focus:outline-none font-medium ${
              activeTab === index ? "border-white border-b-4" : ""
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className={`tab-content active overflow-y-scroll no-scrollbar`}>
        {React.Children.map(children, (comp, index) =>
          activeTab === index ? comp : undefined
        )}
      </div>
    </div>
  );
}

export default Tabs;
