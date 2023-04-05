import { useFormik } from "formik";
import moment from "moment-timezone";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  companyPlantations,
  companyInfo,
  updatePlantation,
} from "../../store/actions/companyAction";
import { getReports, updateRequestedReports } from "../../utils/service";
import Loader from "../Loader/Loader";
import UserElement from "../NavBar/UserElement";
import ReportTable from "../Reports/ReportTable";
import SuccessfulPopUp from "../SuccessfulPopup/SuccessfulPopUp";
import InfiniteScroll from "react-infinite-scroll-component";

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function getMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);
  return date.toLocaleString("en-US", { month: "short" });
}

// base page 7
function PlantationDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { companyName } = useParams();
  const [popUp, setPopUp] = useState(false);
  const [active, setActive] = useState("plantation");
  const [edit, setEdit] = useState(null);
  const [companyData, setCompanyData] = useState();
  const [plantList, setPlantationList] = useState([]);
  const [newPlantationList, setNewPlantationList] = useState([]);
  const [previousPlantationList, setPreviousPlantationList] = useState([]);
  const adminInfo = useSelector((state) => state.auth.userInfo);

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [countPlantation, setCountPlantation] = useState(0);
  const [hasMoreReports, setHasMoreReports] = useState(true);
  const [countReports, setCountReports] = useState(0);

  const fetchReports = async (offset) => {
    let res = await getReports({companyName: companyName, offset: offset});
    if (res.status && res.data){
      setCountReports(countReports + 10); 
      setReports([...reports, ...res.data])
    };
    if(res.data.length <10) setHasMoreReports(false);
  };

  useEffect(() => {
    if (adminInfo?.siteName) fetchReports(countReports);
  }, [adminInfo?.siteName]);

  const sendReport = async (id) => {
    let res = await updateRequestedReports({ id });
    if (res.status) fetchReports(countReports);
  };

  const closeEdit = () => {
    setEdit(null);
    setPopUp(false);
  };

  const fetchCompany = () => {
    dispatch(companyInfo(companyName, adminInfo?.siteName)).then((response) => {
      setCompanyData(response.data.data);
    });
  };

  const fetchPlantations = (data) => {
    dispatch(companyPlantations(data)).then((response) => {
      let list = Array.isArray(response.data.data) ? response.data.data : [];
      setCountPlantation(countPlantation + 10);
      if (list.length) {
        let newPlantations = [];
        let previousPlantations = [];
        for (let item of list) {
          if (Number(item.totalPlantRequested) == Number(item.monthlyPlanted)) {
            previousPlantations.push(item);
          } else {
            newPlantations.push(item);
          }
        }
        setNewPlantationList(newPlantations);
        setPreviousPlantationList(previousPlantations);
        if (active == "completed") {
          setPlantationList(previousPlantations);
        } else {
          setPlantationList(newPlantations);
        }
      }
      if(list.length < 10) {
          setHasMore(false);
      }
      setLoading(false);
    });
  };

  const refetch = (companyId) => {
    fetchCompany();
    fetchPlantations({companyId: companyId, offset: countPlantation});
  };

  useEffect(() => {
    if (adminInfo?.siteName) fetchCompany();
  }, [dispatch, adminInfo?.siteName]);

  useEffect(() => {
    if (companyData?.id) {
      fetchPlantations({companyId: companyData?.id, offset: countPlantation});
    }
  }, [companyData]);

  const handleActive = (type) => {
    if (type == "plantation") {
      setPlantationList(newPlantationList);
    } else if (type == "completed") {
      setPlantationList(previousPlantationList);
    } else if (type == "report") {
    }
    setActive(type);
  };

  const fetchMoreData = () => {
      setTimeout(() => {
        fetchPlantations({companyId: companyData?.id, offset: countPlantation})
      }, 300);
  };

  const fetchMoreReportData = () => {
      setTimeout(() => {
        fetchReports(countReports)
      }, 300);
  };


  if (loading) return <Loader />;

  return (
    <>
      <UserElement
        children={
          <div className="flex items-center gap-2  py-1 text-3xl GreenGradient font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-7 h-7 text-gray-700 hover:text-gray-900 cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
            <h1 className="text-3xl GreenGradient font-medium">
              {companyName}
            </h1>
          </div>
        }
      />

      <section className="p-6 pb-2">
        <div className="flex flex-wrap gap-x-12 gap-y-6 items-center justify-between max-w-5xl">
          <div className="text-xl xl:text-2xl font-medium flex items-center gap-4 justify-between w-full max-w-[250px] xl:max-w-[300px]">
            <h1>Plants requested in site</h1>
            <h1 className="GreenGradient">
              {companyData?.totalRequestedPlant || "0"}
            </h1>
          </div>
          <div className="text-xl xl:text-2xl font-medium flex items-center gap-4 justify-between w-full max-w-[250px] xl:max-w-[300px]">
            <h1>Total planted</h1>
            <h1 className="GreenGradient">
              {companyData?.totalPlanted || "0"}
            </h1>
          </div>
          <div className="text-xl xl:text-2xl font-medium flex items-center gap-4 justify-between w-full max-w-[250px] xl:max-w-[300px]">
            <h1>
              Success rate {"("}tree{")"}
            </h1>
            <h1 className="GreenGradient">
              {Math.floor(
                (Number(companyData?.totalPlanted || 0) /
                  companyData?.totalRequestedPlant || 0) * 100
              )}
              %
            </h1>
          </div>
          <div className="text-xl xl:text-2xl font-medium flex items-center gap-4 justify-between w-full max-w-[250px] xl:max-w-[300px]">
            <h1>Algae requested in site</h1>
            <h1 className="GreenGradient">
              {companyData?.totalRequestedAlgae || "0"}
            </h1>
          </div>
          <div className="text-xl xl:text-2xl font-medium flex items-center gap-4 justify-between w-full max-w-[250px] xl:max-w-[300px]">
            <h1>Total spawned</h1>
            <h1 className="GreenGradient">{companyData?.totalAlgae || "0"}</h1>
          </div>
          <div className="text-xl xl:text-2xl font-medium flex items-center gap-4 justify-between w-full max-w-[250px] xl:max-w-[300px]">
            <h1>
              Success rate {"("}algae{")"}
            </h1>
            <h1 className="GreenGradient">
              {Math.floor(
                (Number(companyData?.totalAlgae || 0) /
                  companyData?.totalRequestedAlgae || 0) * 100
              )}
              %
            </h1>
          </div>
        </div>

        <div className="py-8 flex flex-col gap-6">
          <div className="flex items-center gap-6">
            <button
              className={`outline-none select-none py-2 px-4 rounded-lg text-lg font-medium shadow-md min-w-[120px] ${
                active == "plantation"
                  ? "bg-green-gradient text-white"
                  : "bg-white text-gray-500"
              }`}
              onClick={() => handleActive("plantation")}
            >
              Plantations
            </button>
            <button
              className={`outline-none select-none py-2 px-4 rounded-lg text-lg font-medium shadow-md min-w-[120px] ${
                active == "completed"
                  ? "bg-green-gradient text-white"
                  : "bg-white text-gray-500"
              }`}
              onClick={() => handleActive("completed")}
            >
              Completed
            </button>
            <button
              className={`outline-none select-none py-2 px-4 rounded-lg text-lg font-medium shadow-md min-w-[120px] ${
                active == "report"
                  ? "bg-green-gradient text-white"
                  : "bg-white text-gray-500"
              }`}
              onClick={() => handleActive("report")}
            >
              Reports
            </button>
          </div>

          <div className="p-4 rounded-xl shadow-xl flex-grow">
            <h1 className="text-2xl GreenGradient font-medium pb-1 max-w-max">
              Plantations
            </h1>
            <div id="scrollDiv" className="h-[350px] min-h-[360px] max-h-[400px] overflow-y-auto relative">
              {active == "report" ? (
                <InfiniteScroll
                dataLength={reports?.length}
                next={fetchMoreReportData}
                hasMore={hasMoreReports}
                loader={<h4>Loading...</h4>}
                scrollableTarget={"scrollDiv"}
              >
                <ReportTable
                  search=""
                  reports={reports}
                  sendReport={sendReport}
                />
                </InfiniteScroll>
              ) : (
                <InfiniteScroll
                  dataLength={plantList?.length}
                  next={fetchMoreData}
                  hasMore={hasMore}
                  loader={<h4>Loading...</h4>}
                  scrollableTarget={"scrollDiv"}
                >
                  <table className="w-full text-center">
                    <thead className="sticky top-0">
                      <tr className="font-normal text-[#AEAEAE] text-lg bg-white shadow">
                        <td className="p-2">SL No.</td>
                        <td className="p-2">Echo Eco</td>
                        <td className="p-2">Month</td>
                        <td className="p-2">Total Quantity</td>
                        <td className="p-2">Planted</td>
                        <td className="p-2">Type</td>
                        <td className="p-2">Purpose</td>
                        {active == "completed" ? (
                          <td className="p-2">Rate</td>
                        ) : (
                          <></>
                        )}
                        <td className="p-2"></td>
                      </tr>
                    </thead>
                    <tbody>
                      {plantList?.length ? (
                        <>
                          {plantList.map((item, i) => (
                            <tr
                              key={item.id}
                              className="border-b-2 border-gray-100 last:border-none"
                            >
                              <td className="p-2 font-normal text-[#000000]">
                                {i + 1}
                              </td>
                              <td className="p-2 font-normal text-[#000000]">
                                {item.apiName}
                              </td>
                              <td className="p-2 font-normal text-[#000000]">
                                {getMonthName(item.month)}
                              </td>
                              <td className="p-2 font-normal text-[#000000]">
                                {item.totalPlantRequested || "0"}
                              </td>
                              <td className="p-2 font-normal text-[#000000]">
                                {item.monthlyPlanted || "0"}
                              </td>
                              <td className="p-2 font-normal GreenGradient">
                                {item.ecoType}
                              </td>
                              <td className="p-2 font-normal GreenGradient">
                                {item.ecoPurpose}
                              </td>
                              {active == "completed" ? (
                                <td className="p-2 font-normal text-[#000000]">
                                  {Math.floor(
                                    (Number(item.monthlyPlantAlive || "0") /
                                      Number(item.totalPlantRequested || "0")) *
                                      100
                                  )}
                                  %
                                </td>
                              ) : (
                                <></>
                              )}
                              <td
                                className="p-2 cursor-pointer"
                                onClick={() => {
                                  setEdit(item);
                                  setPopUp(true);
                                }}
                              >
                                <svg
                                  width="17"
                                  height="16"
                                  viewBox="0 0 17 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M9.8833 15.1842H15.6249"
                                    stroke="url(#paint0_linear_2287_1902)"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M9.11751 2.00421C9.73156 1.27033 10.8354 1.16272 11.5845 1.76429C11.6259 1.79693 12.9567 2.83071 12.9567 2.83071C13.7796 3.32819 14.0353 4.38579 13.5266 5.19288C13.4996 5.2361 5.97612 14.6469 5.97612 14.6469C5.72582 14.9591 5.34587 15.1435 4.9398 15.1479L2.05863 15.1841L1.40946 12.4364C1.31852 12.0501 1.40946 11.6443 1.65976 11.3321L9.11751 2.00421Z"
                                    stroke="url(#paint1_linear_2287_1902)"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M7.72461 3.75098L12.041 7.06578"
                                    stroke="url(#paint2_linear_2287_1902)"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <defs>
                                    <linearGradient
                                      id="paint0_linear_2287_1902"
                                      x1="12.7541"
                                      y1="14.7432"
                                      x2="12.7541"
                                      y2="15.6252"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#6DB935" />
                                      <stop
                                        offset="0.0001"
                                        stopColor="#6AB831"
                                      />
                                      <stop offset="1" stopColor="#4DAA09" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint1_linear_2287_1902"
                                      x1="7.58164"
                                      y1="1.375"
                                      x2="7.58164"
                                      y2="15.1841"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#6DB935" />
                                      <stop
                                        offset="0.0001"
                                        stopColor="#6AB831"
                                      />
                                      <stop offset="1" stopColor="#4DAA09" />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint2_linear_2287_1902"
                                      x1="9.88279"
                                      y1="3.75098"
                                      x2="9.88279"
                                      y2="7.06578"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#6DB935" />
                                      <stop
                                        offset="0.0001"
                                        stopColor="#6AB831"
                                      />
                                      <stop offset="1" stopColor="#4DAA09" />
                                    </linearGradient>
                                  </defs>
                                </svg>
                              </td>
                            </tr>
                          ))}
                        </>
                      ) : (
                        <>
                          <tr className="text-4xl font-medium text-gray-400 absolute w-full text-center top-28 flex items-center justify-center">
                            <td className="w-full">No Plantation Available</td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </InfiniteScroll>
              )}
            </div>
          </div>

          {/* <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-md grid place-items-center bg-gray-300 hover-bg-green-gradient cursor-pointer text-gray-700 hover:text-white">
              <span>
                <svg
                  width="9"
                  height="14"
                  viewBox="0 0 9 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 1L2 7L8 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </div>

            <div className="w-10 h-10 rounded-md grid place-items-center bg-gray-300 hover-bg-green-gradient cursor-pointer text-gray-700 hover:text-white">
              <span>
                <svg
                  width="9"
                  height="14"
                  viewBox="0 0 9 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L7 7L1 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </div>
          </div> */}
        </div>
      </section>
      {popUp && edit ? (
        <EditPlant edit={edit} closeEdit={closeEdit} refetch={refetch} />
      ) : (
        <></>
      )}
    </>
  );
}

export default PlantationDashboard;

const EditPlant = ({ edit, closeEdit, refetch }) => {
  const dispatch = useDispatch();
  const [isSuccessfulPopup, setIsSuccessfulPopup] = useState(false);

  const onCloseSucessfulPopup = () => {
    closeEdit();
    setIsSuccessfulPopup(false);
  };

  const formik = useFormik({
    initialValues: {
      companyId: edit?.companyId || "",
      docId: edit?.id || "",
      apiKey: edit?.apiKey || "",
      monthlyId: edit?.monthlyId || "",
      planted: "",
      plantAlive: "",
    },
    onSubmit: (values, { props, setSubmitting }) => {
      setSubmitting(true);
      dispatch(updatePlantation(values))
        .then((response) => {
          setIsSuccessfulPopup(true);
          if (response.data.data) refetch(response.data.data);
          setTimeout(() => {
            setIsSuccessfulPopup(false);
            setSubmitting(false);
            closeEdit();
          }, 500);
        })
        .catch((error) => {
          setSubmitting(false);
        });
    },
    validate: (values) => {
      let error = {};
      if (values.planted > edit?.totalPlantRequested) {
        error.planted =
          edit.ecoType === "Tree"
            ? "Planted can not exceed total plant requested"
            : "Spawned can not exceed total algae requested";
      }
      if (values.plantAlive > edit?.totalPlantRequested) {
        error.plantAlive =
          edit.ecoType === "Tree"
            ? "Plant alive can not exceed total plant requested"
            : "Algae alive can not exceed total algae requested";
      }
      if (values.plantAlive > values.planted) {
        error.plantAlive =
          edit.ecoType === "Tree"
            ? "Plant alive can not exceed plants planted"
            : "Algae alive can not exceed algae spawned";
      }
      return error;
    },
  });

  return (
    <>
      <div className="fixed inset-0 w-full min-h-screen overflow-hidden bg-black bg-opacity-40 grid place-items-center">
        <div
          onClick={closeEdit}
          className="fixed inset-0 w-full full cursor-pointer"
        ></div>
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white rounded-xl p-6 2xl:px-10 w-full max-w-2xl z-10 shadow-xl relative flex flex-col"
        >
          <svg
            onClick={closeEdit}
            className="absolute top-5 right-7 cursor-pointer"
            width="18"
            height="18"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask id="path-1-inside-1_2247_5917" fill="white">
              <path d="M9.46647 7.66439L14.9555 2.18809C15.1959 1.94771 15.331 1.62169 15.331 1.28175C15.331 0.94181 15.1959 0.615791 14.9555 0.375416C14.7152 0.135041 14.3891 0 14.0492 0C13.7093 0 13.3832 0.135041 13.1429 0.375416L7.66657 5.86449L2.19026 0.375416C1.94989 0.135041 1.62387 -2.53276e-09 1.28393 0C0.943988 2.53276e-09 0.617969 0.135041 0.377595 0.375416C0.13722 0.615791 0.00217852 0.94181 0.00217852 1.28175C0.00217852 1.62169 0.13722 1.94771 0.377595 2.18809L5.86666 7.66439L0.377595 13.1407C0.257948 13.2594 0.162982 13.4006 0.0981741 13.5561C0.0333665 13.7117 0 13.8785 0 14.047C0 14.2156 0.0333665 14.3824 0.0981741 14.538C0.162982 14.6935 0.257948 14.8347 0.377595 14.9534C0.496264 15.073 0.63745 15.168 0.793006 15.2328C0.948563 15.2976 1.11541 15.331 1.28393 15.331C1.45245 15.331 1.6193 15.2976 1.77485 15.2328C1.93041 15.168 2.07159 15.073 2.19026 14.9534L7.66657 9.4643L13.1429 14.9534C13.2615 15.073 13.4027 15.168 13.5583 15.2328C13.7138 15.2976 13.8807 15.331 14.0492 15.331C14.2177 15.331 14.3846 15.2976 14.5401 15.2328C14.6957 15.168 14.8369 15.073 14.9555 14.9534C15.0752 14.8347 15.1702 14.6935 15.235 14.538C15.2998 14.3824 15.3331 14.2156 15.3331 14.047C15.3331 13.8785 15.2998 13.7117 15.235 13.5561C15.1702 13.4006 15.0752 13.2594 14.9555 13.1407L9.46647 7.66439Z" />
            </mask>
            <path
              d="M9.46647 7.66439L7.49936 5.6927L5.52308 7.66439L7.49936 9.63608L9.46647 7.66439ZM14.9555 2.18809L16.9226 4.15978L16.9249 4.15749L14.9555 2.18809ZM15.331 1.28175H18.1161H15.331ZM14.0492 0V2.78515V0ZM13.1429 0.375416L11.1735 -1.59398L11.1712 -1.59169L13.1429 0.375416ZM7.66657 5.86449L5.69487 7.83159L7.66657 9.80788L9.63826 7.83159L7.66657 5.86449ZM2.19026 0.375416L4.16196 -1.59169L4.15966 -1.59398L2.19026 0.375416ZM1.28393 0V-2.78515V0ZM0.00217852 1.28175H-2.78297H0.00217852ZM0.377595 2.18809L-1.59181 4.15749L-1.58951 4.15978L0.377595 2.18809ZM5.86666 7.66439L7.83377 9.63608L9.81005 7.66439L7.83377 5.6927L5.86666 7.66439ZM0.377595 13.1407L2.33891 15.1182L2.3447 15.1124L0.377595 13.1407ZM0.377595 14.9534L2.35505 12.9921L2.34701 12.984L2.3389 12.9759L0.377595 14.9534ZM2.19026 14.9534L0.218564 12.9863L0.212805 12.9921L2.19026 14.9534ZM7.66657 9.4643L9.63826 7.49719L7.66657 5.5209L5.69487 7.49719L7.66657 9.4643ZM13.1429 14.9534L15.1203 12.9921L15.1146 12.9863L13.1429 14.9534ZM14.9555 14.9534L12.9942 12.9759L12.9861 12.984L12.9781 12.9921L14.9555 14.9534ZM14.9555 13.1407L12.9884 15.1124L12.9942 15.1182L14.9555 13.1407ZM11.4336 9.63608L16.9226 4.15978L12.9884 0.216396L7.49936 5.6927L11.4336 9.63608ZM16.9249 4.15749C17.6876 3.39479 18.1161 2.36036 18.1161 1.28175H12.5458C12.5458 0.883024 12.7042 0.500629 12.9861 0.218688L16.9249 4.15749ZM18.1161 1.28175C18.1161 0.203141 17.6876 -0.831291 16.9249 -1.59398L12.9861 2.34482C12.7042 2.06287 12.5458 1.68048 12.5458 1.28175H18.1161ZM16.9249 -1.59398C16.1622 -2.35667 15.1278 -2.78515 14.0492 -2.78515V2.78515C13.6505 2.78515 13.2681 2.62676 12.9861 2.34482L16.9249 -1.59398ZM14.0492 -2.78515C12.9706 -2.78515 11.9362 -2.35667 11.1735 -1.59398L15.1123 2.34482C14.8303 2.62676 14.4479 2.78515 14.0492 2.78515V-2.78515ZM11.1712 -1.59169L5.69487 3.89738L9.63826 7.83159L15.1146 2.34252L11.1712 -1.59169ZM9.63826 3.89738L4.16196 -1.59169L0.218572 2.34252L5.69487 7.83159L9.63826 3.89738ZM4.15966 -1.59398C3.39697 -2.35667 2.36254 -2.78515 1.28393 -2.78515L1.28393 2.78515C0.885201 2.78515 0.502805 2.62676 0.220863 2.34482L4.15966 -1.59398ZM1.28393 -2.78515C0.205319 -2.78515 -0.829114 -2.35668 -1.59181 -1.59398L2.347 2.34482C2.06505 2.62676 1.68266 2.78515 1.28393 2.78515L1.28393 -2.78515ZM-1.59181 -1.59398C-2.3545 -0.83129 -2.78297 0.203142 -2.78297 1.28175L2.78733 1.28175C2.78733 1.68048 2.62894 2.06287 2.347 2.34482L-1.59181 -1.59398ZM-2.78297 1.28175C-2.78297 2.36036 -2.3545 3.39479 -1.59181 4.15749L2.347 0.218688C2.62894 0.50063 2.78733 0.883025 2.78733 1.28175L-2.78297 1.28175ZM-1.58951 4.15978L3.89956 9.63608L7.83377 5.6927L2.3447 0.216396L-1.58951 4.15978ZM3.89956 5.6927L-1.58951 11.169L2.3447 15.1124L7.83377 9.63608L3.89956 5.6927ZM-1.58371 11.1632C-1.96441 11.5408 -2.26657 11.9901 -2.47278 12.485L2.66913 14.6272C2.59254 14.8111 2.4803 14.9779 2.3389 15.1182L-1.58371 11.1632ZM-2.47278 12.485C-2.67899 12.98 -2.78515 13.5108 -2.78515 14.047H2.78515C2.78515 14.2462 2.74572 14.4434 2.66913 14.6272L-2.47278 12.485ZM-2.78515 14.047C-2.78515 14.5832 -2.67899 15.1141 -2.47278 15.6091L2.66913 13.4669C2.74572 13.6507 2.78515 13.8479 2.78515 14.047H-2.78515ZM-2.47278 15.6091C-2.26657 16.104 -1.9644 16.5532 -1.58371 16.9308L2.3389 12.9759C2.4803 13.1161 2.59253 13.283 2.66913 13.4669L-2.47278 15.6091ZM-1.59986 16.9147C-1.2223 17.2954 -0.773075 17.5975 -0.278099 17.8037L1.86411 12.6618C2.04797 12.7384 2.21482 12.8507 2.35505 12.9921L-1.59986 16.9147ZM-0.278099 17.8037C0.21686 18.01 0.747744 18.1161 1.28393 18.1161V12.5458C1.48308 12.5458 1.68027 12.5852 1.86411 12.6618L-0.278099 17.8037ZM1.28393 18.1161C1.82011 18.1161 2.351 18.01 2.84596 17.8037L0.703747 12.6618C0.887592 12.5852 1.08478 12.5458 1.28393 12.5458V18.1161ZM2.84596 17.8037C3.34093 17.5975 3.79015 17.2954 4.16772 16.9147L0.212805 12.9921C0.353033 12.8507 0.519883 12.7384 0.703747 12.6618L2.84596 17.8037ZM4.16196 16.9205L9.63826 11.4314L5.69487 7.49719L0.218572 12.9863L4.16196 16.9205ZM5.69487 11.4314L11.1712 16.9205L15.1146 12.9863L9.63826 7.49719L5.69487 11.4314ZM11.1654 16.9147C11.543 17.2954 11.9922 17.5975 12.4872 17.8037L14.6294 12.6618C14.8133 12.7384 14.9801 12.8507 15.1203 12.9921L11.1654 16.9147ZM12.4872 17.8037C12.9821 18.01 13.513 18.1161 14.0492 18.1161V12.5458C14.2484 12.5458 14.4455 12.5852 14.6294 12.6618L12.4872 17.8037ZM14.0492 18.1161C14.5854 18.1161 15.1163 18.01 15.6112 17.8037L13.469 12.6618C13.6529 12.5852 13.8501 12.5458 14.0492 12.5458V18.1161ZM15.6112 17.8037C16.1062 17.5975 16.5554 17.2954 16.933 16.9147L12.9781 12.9921C13.1183 12.8507 13.2852 12.7384 13.469 12.6618L15.6112 17.8037ZM16.9168 16.9308C17.2975 16.5533 17.5997 16.104 17.8059 15.6091L12.664 13.4669C12.7406 13.283 12.8528 13.1161 12.9942 12.9759L16.9168 16.9308ZM17.8059 15.6091C18.0121 15.1141 18.1183 14.5832 18.1183 14.047H12.548C12.548 13.8479 12.5874 13.6507 12.664 13.4669L17.8059 15.6091ZM18.1183 14.047C18.1183 13.5109 18.0121 12.98 17.8059 12.485L12.664 14.6272C12.5874 14.4434 12.548 14.2462 12.548 14.047H18.1183ZM17.8059 12.485C17.5997 11.99 17.2975 11.5408 16.9168 11.1632L12.9942 15.1182C12.8528 14.9779 12.7406 14.8111 12.664 14.6272L17.8059 12.485ZM16.9226 11.169L11.4336 5.6927L7.49936 9.63608L12.9884 15.1124L16.9226 11.169Z"
              fill="black"
              mask="url(#path-1-inside-1_2247_5917)"
            />
          </svg>

          <h1 className="text-xl GreenGradient font-semibold tracking-wider">
            {edit.apiName} - {moment().format("DD/MM/YYYY")}
          </h1>

          <div className="py-8 flex-grow flex flex-col justify-center">
            <h1 className="text-2xl font-medium relative">
              {edit?.ecoType === "Tree"
                ? "Enter Number of Plants planted"
                : "Enter Number of Algae spawned"}{" "}
              {formik.touched.planted && formik.errors.planted ? (
                <div
                  style={{ color: "red" }}
                  className="text-left text-xs absolute"
                >
                  {formik.errors.planted}
                </div>
              ) : null}
            </h1>

            <div className="flex items-center gap-4 py-6">
              <input
                type="number"
                name="planted"
                {...formik.getFieldProps("planted")}
                className="py-2 px-4 w-full max-w-[200px] bg-transparent rounded-xl shadow-md focus:shadow-lg text-xl outline-none"
                placeholder="Enter amount"
              />
              <span className="text-xl font-semibold">
                / {edit.totalPlantRequested - formik.values.planted} (
                {edit.totalPlantRequested}{" "}
                {edit?.ecoType === "Tree"
                  ? "total plantation"
                  : "total spawned"}
                )
              </span>
            </div>

            <h1 className="text-2xl font-medium mt-4 relative">
              {edit?.ecoType === "Tree"
                ? "Enter Number of Plants alive"
                : "Enter Number of Algae alive"}
              {formik.touched.plantAlive && formik.errors.plantAlive ? (
                <div
                  style={{ color: "red" }}
                  className="text-left text-xs absolute"
                >
                  {formik.errors.plantAlive}
                </div>
              ) : null}
            </h1>

            <div className="flex items-center gap-4 py-6">
              <input
                type="number"
                name="plantAlive"
                {...formik.getFieldProps("plantAlive")}
                className="py-2 px-4 w-full max-w-[200px] bg-transparent rounded-xl shadow-md focus:shadow-lg text-xl outline-none"
                placeholder="Enter amount"
              />
              <span className="text-xl font-semibold">
                / {edit.totalPlantRequested - formik.values.plantAlive} (
                {edit.totalPlantRequested}{" "}
                {edit?.ecoType === "Tree"
                  ? "total plantation"
                  : "total spawned"}
                )
              </span>
            </div>
          </div>

          {/* <div className='py-6 flex-grow flex flex-col justify-center'>
                    </div> */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="text-3xl font-medium uppercase py-2 px-5 w-full bg-green-gradient rounded-xl text-white tracking-wider"
          >
            Submit
          </button>
        </form>
      </div>
      <SuccessfulPopUp
        visible={isSuccessfulPopup}
        onClose={onCloseSucessfulPopup}
        message="Updated"
      />
    </>
  );
};
