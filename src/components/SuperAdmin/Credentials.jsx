import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserElement from "../NavBar/UserElement";
import Loader from "../Loader/Loader";
import copyIcon from "../../assets/copyIcon.svg";
import {
  getSites,
  updateSite,
  sitesInfo,
} from "../../store/actions/superAdminAction";
import useDebounce from "../../hooks/useDebounce";
import { useClickOutside } from "../../hooks/useClickOutside";
import SimpleCrypto from "simple-crypto-js";
import openEye from "../../assets/openEye.svg";
import crossEye from "../../assets/crossEye.svg";
import InfiniteScroll from "react-infinite-scroll-component";

const passwordKey = process.env.PASSWORD_ENCRYPTION_KEY || "zxcvbnmasdfghjkl";
const simpleCrypto = new SimpleCrypto(passwordKey);

function SiteCredentials() {
  const dispatch = useDispatch();
  const adminInfo = useSelector((state) => state.auth.userInfo);
  const sites = useSelector((state) => state.superAdmin.sites);
  const [search, setSearch] = useState("");
  const isLoading = useRef(false);
  const [isSort, setIsSort] = useState(false);
  const sortRef = useRef();
  const [filteredSites, setFilteredSites] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  let countSites = 0

  useClickOutside(() => setIsSort(false), sortRef);

  useEffect(() => {
    if (sites.length) setFilteredSites(sites);
  }, [sites]);

  useEffect(() => {
    if (adminInfo?.isAdmin) dispatch(getSites({offset: countSites}));
  }, [dispatch, adminInfo?.isAdmin]);

  const debounced = useDebounce(search, 500);
  useEffect(() => {
    if (sites) {
      let data = sites.filter(
        (item) =>
          item.siteName.toLowerCase().includes(debounced?.toLowerCase()) ||
          item.location.toLowerCase().includes(debounced.toLowerCase())
      );
      setFilteredSites(data);
    }
  }, [debounced]);

  const sortByName = () => {
    let arr = [...filteredSites];
    let sorted = arr.sort((a, b) => a.siteName.localeCompare(b.siteName));
    // dispatch(sitesInfo(sorted));
    setFilteredSites(sorted)
    setIsSort(false);
  };
  const sortByCreated = () => {
    let arr = [...filteredSites];
    let sorted = arr.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
    // dispatch(sitesInfo(sorted));
    setFilteredSites(sorted)
    setIsSort(false);
  };
  const sortByLocation = () => {
    let arr = [...filteredSites];
    let sorted = arr.sort((a, b) => a.location.localeCompare(b.location));
    // dispatch(sitesInfo(sorted));
    setFilteredSites(sorted)
    setIsSort(false);
  };

  const fetchMoreData = () => {
    countSites = countSites + 15;
      setTimeout(() => {
       dispatch(getSites({offset:countSites})).then(res => {
          console.log(res.data, "res Cred")
          if (res.data.length < 15) {
            setHasMore(false);
          }
        });
      }, 300);
  };

  if (isLoading.current || !adminInfo?.isAdmin) return <Loader />;

  return (
    <>
      <UserElement
        children={
          <h1 className="text-3xl text-black font-medium">Site Credentials</h1>
        }
      />

      <section className="p-6">
        <div className="flex items-center gap-4 justify-between pr-6">
          <div className="flex items-center px-4 bg-gray-50 rounded-3xl border border-gray-100 focus-within:border-green-200 focus-within:shadow-md w-full max-w-xl">
            <svg
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.0771 12.0774C9.60712 14.5461 5.588 14.5467 3.11801 12.0774C0.648656 9.60738 0.648656 5.58826 3.11801 3.11827C5.588 0.649548 9.60712 0.649548 12.0771 3.11827C14.5465 5.58826 14.5465 9.60738 12.0771 12.0774ZM18.8145 17.9186L13.3976 12.5023C15.9234 9.51872 15.7847 5.03537 12.9727 2.22275C10.0087 -0.740601 5.1865 -0.741234 2.22252 2.22275C-0.740839 5.18674 -0.740839 10.0096 2.22252 12.9729C5.0193 15.7697 9.49442 15.9445 12.5021 13.3979L17.9183 18.8148C18.166 19.0618 18.5669 19.0618 18.8145 18.8148C19.0615 18.5671 19.0615 18.1662 18.8145 17.9186Z"
                fill="#393939"
              />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full flex-grow p-2 outline-none border-none bg-transparent placeholder-gray-400"
              placeholder="Search for Byrds Sites"
            />
          </div>

          <div className="flex items-center gap-6">
            <div ref={sortRef} className="relative">
              <svg
                className="cursor-pointer relative"
                onClick={() => setIsSort(!isSort)}
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.33001 13.593H1.0293"
                  stroke="#130F26"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.1406 3.90066H16.4413"
                  stroke="#130F26"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.72629 3.84625C5.72629 2.5506 4.66813 1.5 3.36314 1.5C2.05816 1.5 1 2.5506 1 3.84625C1 5.14191 2.05816 6.19251 3.36314 6.19251C4.66813 6.19251 5.72629 5.14191 5.72629 3.84625Z"
                  stroke="#130F26"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.0002 13.5533C17.0002 12.2576 15.9429 11.207 14.6379 11.207C13.3321 11.207 12.2739 12.2576 12.2739 13.5533C12.2739 14.8489 13.3321 15.8995 14.6379 15.8995C15.9429 15.8995 17.0002 14.8489 17.0002 13.5533Z"
                  stroke="#130F26"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {isSort && (
                <div className="absolute top-6 right-0 p-3 rounded-lg shadow-lg z-30 bg-white">
                  <h1
                    className="min-w-max font-medium cursor-pointer py-1 border-b"
                    onClick={() => sortByName()}
                  >
                    Site Name
                  </h1>
                  <h1
                    className="min-w-max font-medium cursor-pointer py-1 border-b"
                    onClick={() => sortByCreated()}
                  >
                    Created Time
                  </h1>
                  <h1
                    className="min-w-max font-medium cursor-pointer py-1"
                    onClick={() => sortByLocation()}
                  >
                    Location
                  </h1>
                </div>
              )}
            </div>
            {/* <div>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M2.56517 1C1.70108 1 1 1.71286 1 2.5904V3.52644C1 4.17647 1.24719 4.80158 1.68936 5.27177L6.5351 10.4243L6.53723 10.4211C7.47271 11.3788 7.99905 12.6734 7.99905 14.0233V18.5952C7.99905 18.9007 8.31869 19.0957 8.58399 18.9516L11.3436 17.4479C11.7602 17.2204 12.0201 16.7784 12.0201 16.2984V14.0114C12.0201 12.6691 12.539 11.3799 13.466 10.4243L18.3117 5.27177C18.7528 4.80158 19 4.17647 19 3.52644V2.5904C19 1.71286 18.3 1 17.4359 1H2.56517Z" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div> */}
          </div>
        </div>

        <div id="scrollDiv" className="mt-4 rounded-xl shadow-xl min-h-[400px] max-h-[75vh] overflow-y-auto relative">
        <InfiniteScroll
            dataLength={filteredSites?.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            scrollableTarget={"scrollDiv"}
          >
          <table
            className="w-full text-center relative p-1"
            style={{ borderSpacing: "4px", borderCollapse: "separate" }}
          >
            <thead className="sticky top-0 bg-white z-10">
              <tr className="font-normal text-[#AEAEAE] text-lg">
                <td>SL No.</td>
                <td>Site Name</td>
                <td>Location</td>
                <td>Email</td>
                <td>Password</td>
              </tr>
            </thead>
            <tbody>
              {filteredSites.length ? (
                <>
                  {filteredSites.map((item, i) => (
                    <CredentialRow
                      key={i}
                      i={i}
                      item={item}
                      dispatch={dispatch}
                      countSites={countSites}
                    />
                  ))}
                </>
              ) : (
                <>
                  <tr className="text-4xl font-medium text-gray-400 absolute w-full text-center top-28 flex items-center justify-center">
                    <td className="w-full">No Site Admin Added</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
          </InfiniteScroll>
        </div>
      </section>
    </>
  );
}

export default SiteCredentials;

function genPassword() {
  var chars =
    "0123456789abcdefghijklmnopqrstuvwxyz-@#$&ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var passwordLength = 12;
  var password = "";
  for (var i = 0; i <= passwordLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }
  return password;
}

const CredentialRow = ({ item, i, dispatch }) => {
  const [isEmailCopied, setIsEmailCopied] = useState(false);
  const [isPasswordCopied, setIsPasswordCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [password, setPassword] = useState(item.adminPassword);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPassword(item.adminPassword);
  }, [item.adminPassword]);

  const handleRefresh = (email, id) => {
    setLoading(true);
    let newPassword = genPassword();
    let encPassword = simpleCrypto.encrypt(newPassword);
    setPassword(newPassword);
    dispatch(
      updateSite({ adminEmail: email, docId: id, newPassword: encPassword })
    )
      .then((res) => {
        if (res.status) {
          dispatch(getSites());
          setPassword(res.data.adminPassword);
        }
        setLoading(false);
      })
      .catch((e) => setLoading(false));
  };

  const handleEmailCopy = (item) => {
    navigator.clipboard.writeText(item);
    setIsEmailCopied(true);
    setTimeout(() => {
      setIsEmailCopied(false);
    }, 800);
  };
  const handlePasswordCopy = (item) => {
    navigator.clipboard.writeText(item);
    setIsPasswordCopied(true);
    setTimeout(() => {
      setIsPasswordCopied(false);
    }, 800);
  };

  const handleShowPassword = () => {
    showPassword ? setShowPassword(false) : setShowPassword(true);
  };

  return (
    <>
      <tr key={item.id}>
        <td className="py-1 font-normal text-lg text-[#000000]">{i + 1}</td>
        <td className="py-1 font-normal text-lg text-[#000000] cursor-pointer hover:text-[#6DB935]">
          {item.siteName}
        </td>
        <td className="py-1 font-normal text-lg text-[#000000]">
          {item.location}
        </td>
        <td className="py-1 font-normal text-lg text-[#000000]">
          <div className="flex items-center gap-3 w-full justify-center relative">
            {isEmailCopied ? (
              <div className="absolute right-1/2 transform translate-x-1/2 -top-2 GreenGradient text-xs">
                Copied!!!
              </div>
            ) : (
              <></>
            )}
            <span>{item.adminEmail}</span>
            <span>
              <img
                onClick={() => handleEmailCopy(item.adminEmail)}
                src={copyIcon}
                className="w-4 absolute right-0 top-1 cursor-pointer"
                alt=""
              />
            </span>
          </div>
        </td>
        <td className="py-1 px-4 font-normal text-lg text-[#000000] ">
          <div className="flex items-center gap-4 w-full justify-center relative">
            {isPasswordCopied ? (
              <div className="absolute right-1/2 transform translate-x-1/2 -top-2 GreenGradient text-xs">
                Copied!!!
              </div>
            ) : (
              ""
            )}
            <span>{!showPassword ? "*************" : password}</span>
            <div className="w-20">{""}</div>
            <div className="absolute right-0 flex gap-4">
              {!showPassword ? (
                <img
                  onClick={handleShowPassword}
                  src={openEye}
                  alt="crossEye"
                  className="cursor-pointer right-1 top-2.5 bg-[#6DB935] bg-opacity-0 pl-2"
                />
              ) : (
                <img
                  onClick={handleShowPassword}
                  src={crossEye}
                  alt="crossEye"
                  className="cursor-pointer right-1 top-2.5 bg-[#6DB935] bg-opacity-0 pl-2"
                />
              )}
              <span>
                <img
                  onClick={() => handlePasswordCopy(password)}
                  src={copyIcon}
                  className="w-4 cursor-pointer"
                  alt=""
                />
              </span>
              <span
                className="cursor-pointer"
                onClick={() =>
                  !loading && handleRefresh(item.adminEmail, item.uuid)
                }
              >
                <svg
                  className={`${loading ? "animate-spin" : ""}`}
                  width="20"
                  height="19"
                  viewBox="0 0 20 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.0229 6.34843H19.0149L15.8339 3.16543C14.8098 2.1413 13.5341 1.40482 12.1351 1.03003C10.7361 0.655246 9.26309 0.655355 7.86416 1.03035C6.46522 1.40535 5.18965 2.14202 4.16569 3.1663C3.14172 4.19058 2.40545 5.46637 2.03089 6.86543M0.984887 16.6444V11.6524M0.984887 11.6524H5.97689M0.984887 11.6524L4.16489 14.8354C5.189 15.8596 6.46468 16.596 7.86368 16.9708C9.26267 17.3456 10.7357 17.3455 12.1346 16.9705C13.5336 16.5955 14.8091 15.8588 15.8331 14.8346C16.8571 13.8103 17.5933 12.5345 17.9679 11.1354M19.0149 1.35643V6.34643"
                    stroke={loading ? "#999" : "#FEB700"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};
