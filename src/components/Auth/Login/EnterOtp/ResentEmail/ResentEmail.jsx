import React from "react";
import bird from "../../../../../assets/Subtract.svg";
import eggBucket from "../../../../../assets/eggBucket.svg";
import { useNavigate } from "react-router";
import { createSearchParams, useSearchParams } from "react-router-dom";

function ResentEmail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const adminEmail = searchParams.get("adminEmail");
  const isForgotPassword = searchParams.get("isForgotPassword");
  return (
    <div>
      <div className="cursor-pointer" onClick={() => navigate("/")}>
        <img src={bird} alt="" />
      </div>
      <div className="flex justify-center items-center mb-24">
        <div className="border border-[#C4C4C4] p-10 rounded-lg text-center">
          <div className="font-medium text-[#212B27] text-[50px] mb-5">
            Email has been sent again.
          </div>
          <div className="font-normal text-[#000000] text-2xl ">
            Please check your email. <br /> If not recieved yet, please check in
            spam folder.
          </div>
          <div className="flex justify-center my-5">
            <img src={eggBucket} alt="" />
          </div>
          <div>
            <button
              type="submit"
              className="w-3/4 bg-gradient-to-b from-[#6DB935] to-[#4DAA09] py-2 rounded-lg font-bold text-[#FFFFFF] text-[22px]"
              onClick={() =>
                navigate({
                  pathname: "/enterOtp",
                  search: createSearchParams({
                    adminEmail: adminEmail,
                    isForgotPassword: isForgotPassword,
                  }).toString(),
                })
              }
            >
              Enter OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResentEmail;
