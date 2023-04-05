import React, { useRef, useState } from "react";
import bird from "../../../../assets/Subtract.svg";
import OtpInput from "react18-input-otp";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { createSearchParams, useSearchParams } from "react-router-dom";
import Loader from "../../../Loader/Loader";
import { sendOtp, verifyEmail } from "../../../../store/actions/authAction";

function EnterOtp() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const adminEmail = searchParams.get("adminEmail");
  const isForgotPassword = searchParams.get("isForgotPassword");
  const [errorMsg, setErrorMsg] = useState("");
  const isLoading = useRef(false);
  const handleChange = (enteredOtp) => {
    setOtp(enteredOtp);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    isLoading.current = true;
    if (isForgotPassword === "true") {
      dispatch(
        verifyEmail({ adminEmail: adminEmail, otp: otp })
      ).then((response) => {
        if (response.data.status === false) {
          setErrorMsg(response.data.message);
          isLoading.current = false;
        } else {
          isLoading.current = false;
          navigate({
            pathname: "/resetPassword",
            search: createSearchParams({
              adminEmail: adminEmail,
              authKey: response.data.authkey,
            }).toString(),
          });
        }
      }).catch(error => {
        isLoading.current = false;
      });
    }
  };
  const handleResendEmail = () => {
    isLoading.current = true;
    dispatch(sendOtp({ adminEmail: adminEmail })).then(
      (response) => {
        if (response.data.status === false) {
          setErrorMsg(response.data.message);
          isLoading.current = false;
        } else {
          isLoading.current = false;
          navigate({
            pathname:"/resentEmail", 
            search: createSearchParams({adminEmail:adminEmail, isForgotPassword: isForgotPassword}).toString()
        });
        }
      }
    ).catch(error => {
      isLoading.current = false;
    });
  };
  return (
    <div>
      {isLoading.current ? <Loader /> : ""}
      <div className="cursor-pointer" onClick={() => navigate("/")}>
        <img src={bird} alt="" />
      </div>
      <div className="flex justify-center items-center mb-24">
        <div className="border border-[#C4C4C4] p-10 rounded-lg text-center">
          <div className="font-medium text-[#212B27] text-[50px] mb-[30px]">
            Verify OTP
          </div>
          <div className="font-normal text-[#000000] text-2xl ">
            Enter OTP sent to your registered email address
          </div>
          <div className="flex justify-center my-[84px]">
            <form>
              <div className="otp-group">
                <OtpInput
                  isInputNum={true}
                  value={otp}
                  onChange={handleChange}
                  numInputs={6}
                  autoComplete="one-time-code"
                  separator={<span></span>}
                  className="border-[1.5px] border-[#6DB935] mx-2 w-[64px] h-[60px] rounded-lg"
                  inputStyle="min-w-full h-full rounded-lg"
                />
              </div>
              {errorMsg ? (
                <div className="text-left ml-3" style={{ color: "red" }}>
                  {errorMsg}
                </div>
              ) : null}
              <div className="mt-[166px]">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-b from-[#6DB935] to-[#4DAA09] py-2 rounded-lg font-bold text-[#FFFFFF] text-[22px]"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div
            className="underline font-medium text-[#FFC145] text-2xl mt-12 cursor-pointer"
            onClick={handleResendEmail}
          >
            Resend Email
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnterOtp;
