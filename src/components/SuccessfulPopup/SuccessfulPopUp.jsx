import React from "react";
import successIcon from "../../assets/successIcon.svg"
import risingSun from "../../assets/risingSun.svg";

function SuccessfulPopUp({ visible, onClose, message }) {
  const handleClose = (e) => {
    if (e.target.id === "successful-container") onClose();
  };
  if (!visible) return null;
  return (
    <div
      id="successful-container"
      onClick={handleClose}
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center"
    >
      <div className="bg-white w-full max-w-xl flex flex-col items-center justify-center gap-6 rounded-2xl shadow-2xl p-10 relative">
        {message === "Request Raised" ? (
          <>
            <div>
              <img src={risingSun} alt="" />
            </div>
            <div className="text-center text-[#404040] font-semibold text-[30px]">
              {message} Successfully
            </div>
          </>
        ) : (
          <>
            <div>
              <img src={successIcon} alt="" />
            </div>
            <div className="text-center text-[#404040] font-semibold text-[30px]">
              Successfully {message}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SuccessfulPopUp;
