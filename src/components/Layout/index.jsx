import React from "react";
// import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";

function index({ children }) {
  return (
    <div className="flex">
      <div className="w-1/6">
        <SideBar />
      </div>
      <div className="w-5/6 min-h-screen pb-4 overflow-y-auto">
        {/* <NavBar /> */}
        {children}
      </div>
    </div>
  );
}

export default index;
