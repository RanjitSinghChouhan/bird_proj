import React from "react";
import { useNavigate } from "react-router";
import bird from "../../../../assets/Subtract.svg";
import successIcon from "../../../../assets/successIcon.svg";

function ResetSuccessful() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="cursor-pointer" onClick={() => navigate("/")}>
        <img src={bird} alt="" />
      </div>
      <div className="flex justify-center items-center mb-24">
        <div className="border border-[#C4C4C4] p-20 rounded-lg text-center">
          <div className="font-medium text-[#212B27] text-[50px] mb-5">
            Reset Password
          </div>
          <div className="font-normal text-[#000000] text-2xl ">
            Password reset is successfully done.
          </div>
          <div className="flex justify-center my-10">
            <img src={successIcon} alt="" />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-b from-[#6DB935] to-[#4DAA09] py-2 rounded-lg font-bold text-[#FFFFFF] text-[22px] mb-20"
              onClick={() => navigate("/login")}
            >
              Go back to login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetSuccessful;
