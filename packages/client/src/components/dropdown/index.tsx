/* eslint-disable */

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { IDropdown } from "../../interfaces/components";

function Dropdown(props: IDropdown): React.ReactElement {
  const [activeItem, setActiveItem] = useState<{
    label: string;
    id: React.ReactText;
  }>({
    label: "",
    id: "",
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (activeItem.label) {
      props.onSelectItem(activeItem);
      setIsOpen(false);
    }
  }, [activeItem]);

  return (
    <>
      <button
        className={`bg-white ${
          props.width || "w-56"
        } justify-between p-2 rounded text-grey-700 shadow-inner flex place-items-center`}
        tabIndex={1}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="font-medium text-gray-800 truncate text-center md:text-left">
          {activeItem.label ? activeItem.label : props.label}
        </div>

        <div className="ml-2">
          <svg
            viewBox="0 0 20 20"
            fill="rgb(75, 85, 99)"
            style={{ width: "20px", height: "20px" }}
          >
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
      </button>
      {isOpen ? (
        <div
          className={`rounded shadow-md absolute pin-t pin-l ${
            props.width || "w-56"
          } rounded bg-white`}
        >
          <ul
            className="list-reset no-scrollbar overflow-y-scroll"
            style={{ maxHeight: "340px" }}
          >
            {props.items.map(
              (
                item: {
                  label: string;
                  id: number | string;
                },
                idx: number
              ) => {
                return (
                  <li
                    key={idx}
                    onClick={() => setActiveItem(item)}
                    className="relative  w-full p-2 focus:outline-none  focus:bg-blue-100 hover:bg-gray-100 cursor-pointer inline-block"
                  >
                    <div className="truncate">
                      <div className="font-medium text-gray-800 truncate text-center md:text-left">
                        {item.label}
                      </div>
                    </div>
                  </li>
                );
              }
            )}
            <li
              onClick={() => {
                setIsOpen(false);
                setActiveItem({
                  label: "",
                  id: "",
                });
              }}
              className="relative w-full p-2 focus:outline-none focus:bg-blue-100 hover:bg-gray-100 cursor-pointer inline-block"
            >
              <div className="truncate">
                <div className="font-medium text-gray-800 truncate text-center md:text-left">
                  {props.label}
                </div>
              </div>
            </li>
          </ul>
        </div>
      ) : null}
    </>
  );
}

export default Dropdown;
