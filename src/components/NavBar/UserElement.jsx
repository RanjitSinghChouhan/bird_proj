import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import profileIcon from "../../assets/profileIcon.svg";
import { useClickOutside } from "../../hooks/useClickOutside";
import {
  getNotificationFlag,
  getNotifications,
} from "../../store/actions/leaderBoardAction";
import SupportPopup from "./Support/SupportPopup";

function UserElement({ children }) {
  const [isHover, setIsHover] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [notifications, setNotification] = useState([]);
  const [isRequest, setIsRequest] = useState(false);
  const adminInfo = useSelector((state) => state.auth.userInfo);
  const [notificationFlag, setNotificationFlag] = useState();
  const notificationRef = useRef();
  const dispatch = useDispatch();

  useClickOutside(() => setIsNotification(false), notificationRef);

  const handleNotificationClick = async () => {
    if (notifications.length === 0) {
      await dispatch(getNotifications()).then((response) => {
        setNotification(response.data.notifications);
      });
    }
    setIsNotification(true);
    if (notificationFlag) {
      handleNotificationFlag();
    }
  };

  const handleNotificationFlag = useCallback(() => {
    dispatch(getNotificationFlag()).then((response) => {
      setNotificationFlag(response.data.flag);
    });
  }, [dispatch]);

  const onCloseSupportPopup = () => {
    setIsRequest(false);
  };

  useEffect(() => {
    handleNotificationFlag();
  }, [handleNotificationFlag]);

  return (
    <>
      <div className="flex items-center gap-6 py-4 px-6 mr-7">
        <div className="flex-grow">{children}</div>
        <div className="flex items-center gap-4 relative">
          <div
            className="cursor-pointer"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={handleNotificationClick}
          >
            {isHover ? (
              <svg
                width="18"
                height="23"
                viewBox="0 0 18 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 8C15 6.4087 14.3679 4.88258 13.2426 3.75736C12.1174 2.63214 10.5913 2 9 2C7.4087 2 5.88258 2.63214 4.75736 3.75736C3.63214 4.88258 3 6.4087 3 8C3 15 0 17 0 17H18C18 17 15 15 15 8Z"
                  fill="#454545"
                />
                <path
                  d="M10.73 21C10.5542 21.3031 10.3019 21.5547 9.99825 21.7295C9.69463 21.9044 9.3504 21.9965 9.00002 21.9965C8.64964 21.9965 8.30541 21.9044 8.00179 21.7295C7.69818 21.5547 7.44583 21.3031 7.27002 21"
                  fill="#454545"
                />
                <path
                  d="M10.73 21C10.5542 21.3031 10.3019 21.5547 9.99825 21.7295C9.69463 21.9044 9.3504 21.9965 9.00002 21.9965C8.64964 21.9965 8.30541 21.9044 8.00179 21.7295C7.69818 21.5547 7.44583 21.3031 7.27002 21"
                  stroke="#454545"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                {notificationFlag ? (
                  <circle cx="13.972" cy="3.97196" r="3.97196" fill="#BB4430" />
                ) : (
                  <></>
                )}
              </svg>
            ) : (
              <svg
                width="18"
                height="23"
                viewBox="0 0 18 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 8C15 6.4087 14.3679 4.88258 13.2426 3.75736C12.1174 2.63214 10.5913 2 9 2C7.4087 2 5.88258 2.63214 4.75736 3.75736C3.63214 4.88258 3 6.4087 3 8C3 15 0 17 0 17H18C18 17 15 15 15 8Z"
                  fill="#E3E3E3"
                />
                <path
                  d="M10.73 21C10.5542 21.3031 10.3019 21.5547 9.99825 21.7295C9.69463 21.9044 9.3504 21.9965 9.00002 21.9965C8.64964 21.9965 8.30541 21.9044 8.00179 21.7295C7.69818 21.5547 7.44583 21.3031 7.27002 21"
                  fill="#E3E3E3"
                />
                <path
                  d="M10.73 21C10.5542 21.3031 10.3019 21.5547 9.99825 21.7295C9.69463 21.9044 9.3504 21.9965 9.00002 21.9965C8.64964 21.9965 8.30541 21.9044 8.00179 21.7295C7.69818 21.5547 7.44583 21.3031 7.27002 21"
                  stroke="#E3E3E3"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                {notificationFlag ? (
                  <circle cx="13.972" cy="3.97196" r="3.97196" fill="#BB4430" />
                ) : (
                  <></>
                )}
              </svg>
            )}
            {isNotification ? (
              <div
                ref={notificationRef}
                className="absolute right-10 outline-none border-none rounded-lg shadow-xl block w-full max-w-lg mx-7 z-20"
              >
                <div
                  className="bg-[#f9fafa] px-2 rounded-lg h-60 overflow-y-auto"
                  id="style-1"
                >
                  <ul>
                  {notifications?.length ? notifications.map(
                      (item) =>
                        item?.title ? (
                          <li
                            key={item.id}
                            className="py-2 flex justify-between cursor-pointer"
                          >
                            {item.title}
                          </li>
                        ) : item?.amount ? (
                          <li
                            key={item.id}
                            className="py-2 flex justify-between cursor-pointer"
                          >
                            {adminInfo?.isAdmin ? `Transaction of $${item.amount} is successfully done with ${item.paymentId} payment id`: ""}
                          </li>
                        ) : item?.type ? (
                          <li
                            key={item.id}
                            className="py-2 flex justify-between cursor-pointer"
                          >
                            {adminInfo?.isAdmin ? `One request for ${item.type} is raised` : `Your request for ${item.type} is successfully sent`}
                          </li>
                        ) : <></>
                    ): <li className="text-center">No Latest Notification available</li>}
                  </ul>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="cursor-pointer flex items-center gap-2">
            <div className="">
              <img className="w-12 h-12" src={profileIcon} alt="" />
            </div>
            <div>
              <div className="text-sm font-semibold min-w-max">
                {adminInfo?.isAdmin
                  ? adminInfo?.adminName
                  : adminInfo?.siteName}
              </div>
              <div className="text-sm min-w-max">
                {adminInfo?.isAdmin ? "Super Admin" : "Site Admin"}
              </div>
            </div>
            {adminInfo?.isAdmin ? (
              <></>
            ) : (
              <button
                type="submit"
                onClick={() => setIsRequest(true)}
                className="bg-gradient-to-b from-[#6DB935] to-[#4DAA09] text-white py-1 px-3 w-fit rounded-lg font-semibold text-base"
              >
                Raise Request
              </button>
            )}
          </div>
        </div>
      </div>
      <SupportPopup visible={isRequest} onClose={onCloseSupportPopup} siteId={adminInfo?.uuid}/>
    </>
  );
}

export default UserElement;
