import React from "react";
import birdImg from "../../assets/Subtract.svg";
import pageNotFound from "../../assets/pageNotFound.svg";
import { useNavigate } from "react-router";

function PageNotFound() {
    const navigate = useNavigate();
  return (
    <div>
      <div>
        <img src={birdImg} alt="" />
      </div>
      <div className="w-3/4 mb-10 mx-auto flex items-center justify-center relative">
        <img src={pageNotFound} alt="" />
        <div className="absolute font-medium text-[#ffffff] text-[50px] top-10">
          Lost in the Wilderness!
        </div>
        <button
          onClick={() => navigate("/")}
          className="absolute bottom-10 bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-white font-medium text-[35px] py-2 px-20 rounded-2xl"
        >
          Go back Home
        </button>
      </div>
    </div>
  );
}

export default PageNotFound;