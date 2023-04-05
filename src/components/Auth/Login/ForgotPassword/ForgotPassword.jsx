import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { createSearchParams } from "react-router-dom";
import bird from "../../../../assets/Subtract.svg";
import { sendOtp } from "../../../../store/actions/authAction";
import Loader from "../../../Loader/Loader";

const initialValues = {
  adminEmail: "",
};

const validate = (values) => {
  let error = {};
  if (!values.adminEmail) {
    error.adminEmail = "Required";
  } else if (!/^[a-z0-9+_.-]+@[a-z0-9.-]+$/i.test(values.adminEmail)) {
    error.adminEmail = "Incorrect email address";
  }
  return error;
};

function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState("");
  const isLoading = useRef(false);
  const formik = useFormik({
    initialValues,
    onSubmit: (values, { props, setSubmitting }) => {
      setSubmitting(true);
      isLoading.current = true;
      dispatch(sendOtp(values))
        .then((response) => {
          if (response.status === false) {
            setErrorMsg(response.data.message);
            setSubmitting(false);
            isLoading.current = false;
          } else {
            setSubmitting(false);
            isLoading.current = false;
            navigate({
              pathname: "/enterOtp",
              search: createSearchParams({
                adminEmail: values.adminEmail,
                isForgotPassword: true,
              }).toString(),
            });
          }
        })
        .catch((error) => {
          setSubmitting(false);
          isLoading.current = false;
        });
    },
    validate,
  });
  return (
    <div>
      {isLoading.current ? <Loader /> : ""}
      <div className="cursor-pointer" onClick={() => navigate("/")}>
        <img src={bird} alt="" />
      </div>
      <div className="flex justify-center items-center mb-24">
        <div className="border border-[#C4C4C4] p-10 rounded-lg text-center">
          <div className="font-medium text-[#212B27] text-[50px] mb-5">
            Forgot Password
          </div>
          <div className="font-normal text-[#000000] text-2xl mb-20">
            Enter your email to get the OTP.
          </div>
          <div>
            <form onSubmit={formik.handleSubmit}>
              <div>
                {formik.touched.adminEmail &&
                formik.errors.adminEmail ? (
                  <div className="text-left" style={{ color: "red" }}>
                    {formik.errors.adminEmail}
                  </div>
                ) : null}
                <input
                  type="email"
                  name="adminEmail"
                  placeholder="Enter Email"
                  {...formik.getFieldProps("adminEmail")}
                  className="py-2 px-4 w-full border border-[#000000] rounded-sm "
                />
              </div>
              {errorMsg ? (
                <div className="text-left" style={{ color: "red" }}>
                  {errorMsg}
                </div>
              ) : null}
              <div className="mt-16">
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="w-full bg-gradient-to-b from-[#6DB935] to-[#4DAA09] font-bold text-[22px] text-white py-[14px] rounded-lg"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div
            className="hover:underline font-medium text-[#FFC145] text-2xl mt-12 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login Here
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
