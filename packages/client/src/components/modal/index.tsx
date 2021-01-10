import React from "react";
import { IModalProps } from "../../interfaces/components";

const Modal: React.FC<IModalProps> = (props): React.ReactElement => {
  return (
    <>
      {props.isOpen ? (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
              onClick={() => props.handleClose()}
            >
              &#8203;
            </span>
            <div
              className="inline-block align-bottom bg-brown-light rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="text-center mt-6 text-brown-lighter font-black">
                <p className="text-xl">Join now and start using embdr</p>
              </div>
              <div className="flex justify-center bg-brown-DEFAULT px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-center place-items-center h-full w-full m-auto">
                  <div></div>
                </div>
              </div>
              <div className="text-center">
                <span
                  onClick={() => props.handleClose()}
                  className="font-black text-sm underline cursor-pointer text-brown-lighter"
                >
                  close
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
