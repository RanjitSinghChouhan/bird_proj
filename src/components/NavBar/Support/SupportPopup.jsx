import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import SuccessfulPopUp from "../../SuccessfulPopup/SuccessfulPopUp";
import cancel from "../../../assets/squareCancel.svg";
import { createSupportComplaint } from "../../../store/actions/leaderBoardAction";

const types = ["Support", "Complaint"];

function SupportPopup({ visible, onClose, siteId }) {
  const [isSuccessful, setIsSuccessful] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      type: "",
      description: "",
    },
    onSubmit: (values, { props, setSubmitting, setValues }) => {
      setSubmitting(true);
      values = { ...values, requesterId: siteId, requesterRole: "siteAdmin" };
      dispatch(createSupportComplaint(values))
        .then((response) => {
          setIsSuccessful(true);
          setTimeout(() => {
            setIsSuccessful(false);
            setValues(formik.initialValues);
            onClose();
          }, 500);
        })
        .catch((error) => {
          setSubmitting(false);
        });
    },
    validate: (values) => {
      let error = {};
      if (!values.type) {
        error.type = "Required";
      }
      if (!values.description) {
        error.description = "Required";
      }
    },
  });

  const onCloseSucessfulPopup = () => {
    setIsSuccessful(false);
  };

  const handleClose = (e) => {
    if (e.target.id === "edit-about-container") onClose();
  };
  if (!visible) return null;
  return (
    <div
      id="edit-about-container"
      onClick={handleClose}
      className="fixed inset-0 bg-black bg-opacity-40 z-20 flex justify-center items-center"
    >
      <div className="bg-white w-3/6 rounded-2xl shadow-2xl p-4 relative">
        <div
          onClick={onClose}
          className="absolute top-2 right-2 cursor-pointer"
        >
          <img className="w-7 h-7" src={cancel} alt="" />
        </div>
        <div className="font-semibold text-[#000000] text-[25px] ml-2 mb-6">
          Support / Complaint
        </div>
        <form onSubmit={formik.handleSubmit}>
          <label
            htmlFor="choose-type"
            className="flex font-semibold text-xl text-[#404040] mb-2"
          >
            Choose Type{" "}
            {formik.touched.type && formik.errors.type ? (
              <div className="text-red-500 ml-1 text-xs mt-2">
                {formik.errors.type}
              </div>
            ) : null}
          </label>
          <div className="mr-3">
            <select
              id="choose-type"
              className="shadow-lg rounded-lg py-2 px-4 w-72 text-xl font-medium mt-4"
              name="type"
              {...formik.getFieldProps("type")}
            >
              <option value="" disabled selected hidden>
                Select Type
              </option>
              {types.map((type, index) => {
                return (
                  <option key={index} value={type}>
                    {type}
                  </option>
                );
              })}
            </select>
          </div>
          <label
            htmlFor="describe"
            className="flex font-semibold text-xl text-[#404040] my-6"
          >
            Description
          </label>
          <div className="border-solid border-2 border-gray-400 rounded-xl w-full relative">
            <div className="px-3 py-2">
              <textarea
                className="w-full h-full bg-gray-100 outline-none rounded-lg px-2 py-1 font-normal text-[#000000] resize-none"
                name="description"
                {...formik.getFieldProps("description")}
                placeholder="Description about your request/complaint"
                rows="10"
                col="70"
                maxlength="1000"
              ></textarea>
            </div>
            <div className="absolute right-4 bottom-4">
              <span>
                {(formik.values &&
                  formik.values.description &&
                  formik.values.description.length) ||
                  0}
              </span>
              <span>/ 1000</span>
            </div>
          </div>
          <div className="inset-x-14 bottom-5 mt-6">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className=" rounded-lg py-1 w-full shadow-xl bg-gradient-to-b from-[#6DB935] to-[#4DAA09] font-semibold text-[30px] text-white"
            >
              Send Request
            </button>
          </div>
        </form>
      </div>
      <SuccessfulPopUp
        visible={isSuccessful}
        onClose={onCloseSucessfulPopup}
        message="updated"
      />
    </div>
  );
}

export default SupportPopup;
