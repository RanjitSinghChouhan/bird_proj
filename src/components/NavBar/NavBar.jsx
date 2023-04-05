import React, { useState } from "react";
import { useSelector } from "react-redux";
import profileIcon from "../../assets/profileIcon.svg";
import blackBell from "../../assets/blackBell.svg";
import bell from "../../assets/bell.svg";
import { useNavigate } from "react-router";

function NavBar({ children }) {
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();
  const getUserInfo = useSelector((state) => state.auth.userInfo[0]);

  return (
    <div className="flex items-center justify-between w-full gap-6 px-8 py-4">
      <div className="flex-grow">
        {children}
      </div>

      <div className="flex items-center gap-4">
        <div
          className="cursor-pointer"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          {isHover ? (
            <img className="w-6 h-6" src={blackBell} alt="" />
          ) : (
            <img className="w-6 h-6" src={bell} alt="" />
          )}
        </div>
        <div onClick={() => navigate("/profile")} className="cursor-pointer flex items-center gap-2">
          <div className="">
            <img className="w-12 h-12" src={profileIcon} alt="" />
          </div>
          <div>
            <div className="text-sm font-semibold min-w-max">
              {getUserInfo && getUserInfo.companyAdminName}
            </div>
            <div className="text-sm min-w-max">Admin Account</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
