import React, { useEffect, useState } from "react";
import bird from "../../assets/Subtract.svg";
import lowerImg from "../../assets/Saly-1.svg";
import { useLocation, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function SideBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const adminInfo = useSelector((state) => state.auth.userInfo)
  const totalUsedArea = useSelector((state) => state.superAdmin.totalUsedArea)

  const handleLogout = () => {
    localStorage.setItem("byrdstoken", '');
    navigate("/login");
  };

  return (
    <div className="bg-[#F8F9FE] h-full min-h-screen flex flex-col gap-4">
      <div
        className="w-full my-0.5 p-2 ml-6 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img className="bg-slate-50" src={bird} alt="" />
      </div>
      <div className="flex flex-col items-center gap-6 px-8 py-4 flex-grow">
        <div className="flex flex-col justify-center items-center gap-1">
          <NavLink to="/">
            <div
              className={`flex group hover:shadow-xl justify-center align-middle items-center bg-slate-200 h-7 w-7 xl:w-10 xl:h-10 rounded-lg hover:bg-gradient-to-b from-[#6DB935] to-[#4DAA09] hover:text-white cursor-pointer ${location.pathname === "/"
                ? "bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-white shadow-lg"
                : "text-gray-600"
                } `}
            >
              <svg
                width="23"
                height="23"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Stockholm-icons / Layout / Layout-4-blocks">
                  <rect
                    id="Rectangle 7"
                    x="4.53711"
                    y="4.09088"
                    width="6.42727"
                    height="6.36364"
                    rx="1.5"
                    fill="currentColor"
                  />
                  <path
                    id="Combined Shape"
                    opacity="0.3"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.8007 5.59088C12.8007 4.76245 13.4723 4.09088 14.3007 4.09088H17.728C18.5564 4.09088 19.228 4.76245 19.228 5.59088V8.95452C19.228 9.78294 18.5564 10.4545 17.728 10.4545H14.3007C13.4723 10.4545 12.8007 9.78294 12.8007 8.95452V5.59088ZM4.53711 13.7727C4.53711 12.9443 5.20868 12.2727 6.03711 12.2727H9.46438C10.2928 12.2727 10.9644 12.9443 10.9644 13.7727V17.1363C10.9644 17.9648 10.2928 18.6363 9.46438 18.6363H6.03711C5.20868 18.6363 4.53711 17.9648 4.53711 17.1363V13.7727ZM14.3007 12.2727C13.4723 12.2727 12.8007 12.9443 12.8007 13.7727V17.1363C12.8007 17.9648 13.4723 18.6363 14.3007 18.6363H17.728C18.5564 18.6363 19.228 17.9648 19.228 17.1363V13.7727C19.228 12.9443 18.5564 12.2727 17.728 12.2727H14.3007Z"
                    fill="currentColor"
                  />
                </g>
              </svg>
            </div>
          </NavLink>
          <div className="text-center text-xs">{adminInfo ? 'Byrds Sites' : 'Plantations'}</div>
        </div>

        <div className="flex flex-col justify-center items-center gap-1">
          <NavLink to="/reports">
            <div
              className={`flex group hover:shadow-xl justify-center align-middle items-center bg-slate-200 h-7 w-7 xl:w-10 xl:h-10 rounded-lg hover:bg-gradient-to-b from-[#6DB935] to-[#4DAA09] hover:text-white cursor-pointer ${location.pathname === "/reports"
                ? "bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-white shadow-lg"
                : "text-gray-600"
                } `}
            >
              <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M4.81 0.363281H13.191C16.28 0.363281 18 2.14328 18 5.19328V15.5233C18 18.6233 16.28 20.3633 13.191 20.3633H4.81C1.77 20.3633 0 18.6233 0 15.5233V5.19328C0 2.14328 1.77 0.363281 4.81 0.363281ZM5.08 5.02328V5.01328H8.069C8.5 5.01328 8.85 5.36328 8.85 5.79228C8.85 6.23328 8.5 6.58328 8.069 6.58328H5.08C4.649 6.58328 4.3 6.23328 4.3 5.80328C4.3 5.37328 4.649 5.02328 5.08 5.02328ZM5.08 11.1033H12.92C13.35 11.1033 13.7 10.7533 13.7 10.3233C13.7 9.89328 13.35 9.54228 12.92 9.54228H5.08C4.649 9.54228 4.3 9.89328 4.3 10.3233C4.3 10.7533 4.649 11.1033 5.08 11.1033ZM5.08 15.6733H12.92C13.319 15.6333 13.62 15.2923 13.62 14.8933C13.62 14.4833 13.319 14.1433 12.92 14.1033H5.08C4.78 14.0733 4.49 14.2133 4.33 14.4733C4.17 14.7233 4.17 15.0533 4.33 15.3133C4.49 15.5633 4.78 15.7133 5.08 15.6733Z" />
              </svg>
            </div>
          </NavLink>
          <div className="text-center text-xs">Reports</div>
        </div>

        {adminInfo?.isAdmin ? <div className="flex flex-col justify-center items-center gap-1">
          <NavLink to="/credentials">
            <div
              className={`flex group hover:shadow-xl justify-center align-middle items-center bg-slate-200 h-7 w-7 xl:w-10 xl:h-10 rounded-lg hover:bg-gradient-to-b from-[#6DB935] to-[#4DAA09] hover:text-white cursor-pointer ${location.pathname === "/credentials"
                ? "bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-white shadow-lg"
                : "text-gray-600"
                } `}
            >
              <svg
                width="23"
                height="23"
                viewBox="0 0 25 25"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.0002 15.8437L10.1564 13L13.0002 10.1562L15.8439 13L13.0002 15.8437ZM10.6981 7.88123L8.45016 5.63331L13.0002 1.08331L17.5502 5.63331L15.3022 7.88123L13.0002 5.57915L10.6981 7.88123ZM5.6335 17.55L1.0835 13L5.6335 8.44998L7.88141 10.6979L5.57933 13L7.88141 15.3021L5.6335 17.55ZM20.3668 17.55L18.1189 15.3021L20.421 13L18.1189 10.6979L20.3668 8.44998L24.9168 13L20.3668 17.55ZM13.0002 24.9166L8.45016 20.3666L10.6981 18.1187L13.0002 20.4208L15.3022 18.1187L17.5502 20.3666L13.0002 24.9166Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </NavLink>
          <div className="text-center text-xs">Site cred</div>
        </div> : <></>}

        <div className="flex flex-col justify-center items-center gap-1">
          <NavLink to="/updates">
            <div
              className={`flex group hover:shadow-xl justify-center align-middle items-center bg-slate-200 h-7 w-7 xl:w-10 xl:h-10 rounded-lg hover:bg-gradient-to-b from-[#6DB935] to-[#4DAA09] hover:text-white cursor-pointer ${location.pathname === "/updates"
                ? "bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-white shadow-lg"
                : "text-gray-600"
                } `}
            >
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M9.17476 13.2165H8.82505C6.42166 13.2165 4.47358 11.2928 4.47358 8.92037V4.29708C4.47358 1.92374 6.42166 0 8.82505 0H9.17476C11.1693 0 12.8501 1.32395 13.3645 3.13098C13.4352 3.37874 13.2482 3.62459 12.9886 3.62459H11.8562C11.5142 3.62459 11.2362 3.89818 11.2362 4.23586V4.23682C11.2362 4.57546 11.5142 4.84905 11.8562 4.84905H12.9004C13.2463 4.84905 13.5272 5.12551 13.5272 5.46702C13.5272 5.80853 13.2463 6.08499 12.9004 6.08499H11.8562C11.5142 6.08499 11.2362 6.35953 11.2362 6.69817C11.2362 7.03585 11.5142 7.3104 11.8562 7.3104H12.9004C13.2463 7.3104 13.5272 7.58686 13.5272 7.92933C13.5272 8.26988 13.2463 8.54634 12.9004 8.54634H11.8562C11.5142 8.54634 11.2362 8.82088 11.2362 9.15952C11.2362 9.49721 11.5142 9.7708 11.8562 9.7708H12.9334C13.1988 9.7708 13.3887 10.0272 13.3054 10.2759C12.7309 11.9844 11.0996 13.2165 9.17476 13.2165ZM15.5626 8.78281C15.5626 8.25381 15.9966 7.8262 16.5313 7.8262C17.066 7.8262 17.5 8.25381 17.5 8.78281C17.5 13.0866 14.2006 16.6404 9.9692 17.1177V19.0434C9.9692 19.5714 9.53522 20 9.00048 20C8.46478 20 8.03177 19.5714 8.03177 19.0434V17.1177C3.79945 16.6404 0.5 13.0866 0.5 8.78281C0.5 8.25381 0.933985 7.8262 1.46872 7.8262C2.00345 7.8262 2.43743 8.25381 2.43743 8.78281C2.43743 12.3557 5.38136 15.2629 9.00048 15.2629C12.6186 15.2629 15.5626 12.3557 15.5626 8.78281Z" />
              </svg>
            </div>
          </NavLink>
          <div className="text-center text-xs">Latest Updates</div>
        </div>

        {adminInfo?.isAdmin ? <div className="flex flex-col justify-center items-center gap-1">
          <NavLink to="/support">
            <div
              className={`flex group hover:shadow-xl justify-center align-middle items-center bg-slate-200 h-7 w-7 xl:w-10 xl:h-10 rounded-lg hover:bg-gradient-to-b from-[#6DB935] to-[#4DAA09] hover:text-white cursor-pointer ${location.pathname === "/support"
                ? "bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-white shadow-lg"
                : "text-gray-600"
                } `}
            >
              <svg
                width="23"
                height="23"
                viewBox="0 0 25 25"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.0002 15.8437L10.1564 13L13.0002 10.1562L15.8439 13L13.0002 15.8437ZM10.6981 7.88123L8.45016 5.63331L13.0002 1.08331L17.5502 5.63331L15.3022 7.88123L13.0002 5.57915L10.6981 7.88123ZM5.6335 17.55L1.0835 13L5.6335 8.44998L7.88141 10.6979L5.57933 13L7.88141 15.3021L5.6335 17.55ZM20.3668 17.55L18.1189 15.3021L20.421 13L18.1189 10.6979L20.3668 8.44998L24.9168 13L20.3668 17.55ZM13.0002 24.9166L8.45016 20.3666L10.6981 18.1187L13.0002 20.4208L15.3022 18.1187L17.5502 20.3666L13.0002 24.9166Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </NavLink>
          <div className="text-center text-xs">Support/Complaints</div>
        </div> : <></>}

        <div className="flex flex-col justify-center items-center">
          <div
            className="flex justify-center items-center my-1 h-7 w-7 xl:w-10 xl:h-10 rounded-lg bg-[#D35A45] cursor-pointer"
            onClick={() => handleLogout()}
          >
            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M7.89535 9.23C7.45785 9.23 7.11192 9.57 7.11192 10C7.11192 10.42 7.45785 10.77 7.89535 10.77H14V15.55C14 18 11.9753 20 9.47238 20H4.51744C2.02471 20 0 18.01 0 15.56V4.45C0 1.99 2.03488 0 4.52762 0H9.49273C11.9753 0 14 1.99 14 4.44V9.23H7.89535ZM17.6302 6.5402L20.5502 9.4502C20.7002 9.6002 20.7802 9.7902 20.7802 10.0002C20.7802 10.2002 20.7002 10.4002 20.5502 10.5402L17.6302 13.4502C17.4802 13.6002 17.2802 13.6802 17.0902 13.6802C16.8902 13.6802 16.6902 13.6002 16.5402 13.4502C16.2402 13.1502 16.2402 12.6602 16.5402 12.3602L18.1402 10.7702H14.0002V9.2302H18.1402L16.5402 7.6402C16.2402 7.3402 16.2402 6.8502 16.5402 6.5502C16.8402 6.2402 17.3302 6.2402 17.6302 6.5402Z" fill="white" />
            </svg>

          </div>
          <div className="text-center text-xs">Logout</div>
        </div>
      </div>
      <div className=" mx-auto mt-6 flex flex-col p-2 xlp-3 relative z-0 h-[15rem] 2xl:h-[16rem] w-[180px] 2xl:w-[200px] rounded-xl text-white" style={{ background: `linear-gradient(180deg, #6DB935 0%, #6AB831 0.01%, #4DAA09 100%)` }}>
        <h1 className="text-center text-lg 2xl:text-xl mt-2 font-medium">Greener by the day</h1>
        <div className="text-[3vw] flex-grow flex flex-col items-center justify-center -mt-2">
          <h1 className="font-semibold">{totalUsedArea}<span className="text-xs font-medium ml-1">Sq ft.</span></h1>
          <p className="text-sm text-center font-medium">Made greener by Byrds</p>
        </div>
        <p className="text-base font-medium">Thanks for your<br />contribution!</p>

        <svg className="absolute -bottom-1 right-0" width="49" height="70" viewBox="0 0 49 70" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_1887_5329)">
            <rect x="26" y="14" width="9" height="51" fill="#693F00" />
          </g>
          <g filter="url(#filter1_d_1887_5329)">
            <rect x="10" y="44" width="9" height="22" fill="#693F00" />
          </g>
          <g filter="url(#filter2_d_1887_5329)">
            <ellipse cx="30" cy="25" rx="13" ry="21" fill="#00FF49" />
          </g>
          <g filter="url(#filter3_d_1887_5329)">
            <ellipse cx="14" cy="35" rx="13" ry="21" fill="#00FF49" />
          </g>
          <defs>
            <filter id="filter0_d_1887_5329" x="24" y="10" width="17" height="59" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dx="2" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1887_5329" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1887_5329" result="shape" />
            </filter>
            <filter id="filter1_d_1887_5329" x="9" y="40" width="17" height="30" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dx="3" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1887_5329" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1887_5329" result="shape" />
            </filter>
            <filter id="filter2_d_1887_5329" x="15" y="0" width="34" height="50" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dx="2" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1887_5329" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1887_5329" result="shape" />
            </filter>
            <filter id="filter3_d_1887_5329" x="0" y="10" width="34" height="50" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dx="3" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1887_5329" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1887_5329" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export default SideBar;
