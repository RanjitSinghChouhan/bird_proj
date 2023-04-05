import moment from 'moment-timezone';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useClickOutside } from '../../hooks/useClickOutside';
import useDebounce from '../../hooks/useDebounce';
import { addAnnouncement, getAnnouncements, updateAnnouncement } from '../../utils/service';
import Loader from '../Loader/Loader';
import UserElement from '../NavBar/UserElement'

function Updates() {
  const adminInfo = useSelector(state => state.auth.userInfo);
  const [search, setSearch] = useState('');
  const [updateList, setUpdateList] = useState([]);
  const [loading, setLoading] = useState(true)
  const [popUp, setPopUp] = useState(false)
  const [isSort, setIsSort] = useState(false)
  const sortRef = useRef();
  const [filteredUpdates, setFilteredUpdates] = useState([])

  useClickOutside(() => setIsSort(false), sortRef)

  const closeEdit = () => {
    setPopUp(false)
  }

  const fetchAnnouncements = async () => {
    let res = await getAnnouncements({ admin: adminInfo?.isAdmin });
    if (res.data) {
      setUpdateList(res.data);
      setFilteredUpdates(res.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (adminInfo) {
      fetchAnnouncements();
    }
  }, [adminInfo])


  const debounced = useDebounce(search, 500)
  useEffect(() => {
    if (updateList.length) {
      let data = updateList.filter(item => item.title
        .toLowerCase()
        .includes(debounced?.toLowerCase())
      )
      setFilteredUpdates(data)
    }
  }, [debounced])

  const sortByTitle = () => {
    let arr = [...filteredUpdates]
    let sorted = arr.sort((a, b) => a.title.localeCompare(b.title));
    setFilteredUpdates(sorted)
    setIsSort(false)
  }
  const sortByCreated = () => {
    let arr = [...filteredUpdates]
    let sorted = arr.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    setFilteredUpdates(sorted)
    setIsSort(false)
  }
  const sortByUpdated = () => {
    let arr = [...filteredUpdates]
    let sorted = arr.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    setFilteredUpdates(sorted)
    setIsSort(false)
  }


  if (loading || !adminInfo) return <Loader />


  return (
    <>
      <UserElement children={<h1 className='text-3xl GreenGradient font-medium py-1'>{adminInfo?.isAdmin ? 'Latest Updates' : 'Updates'}</h1>} />

      <section className='p-6'>

        <div className='flex items-center gap-4 justify-between pr-6'>
          <div className='flex items-center px-4 bg-gray-50 rounded-3xl border border-gray-100 focus-within:border-green-200 focus-within:shadow-md w-full max-w-xl'>
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12.0771 12.0774C9.60712 14.5461 5.588 14.5467 3.11801 12.0774C0.648656 9.60738 0.648656 5.58826 3.11801 3.11827C5.588 0.649548 9.60712 0.649548 12.0771 3.11827C14.5465 5.58826 14.5465 9.60738 12.0771 12.0774ZM18.8145 17.9186L13.3976 12.5023C15.9234 9.51872 15.7847 5.03537 12.9727 2.22275C10.0087 -0.740601 5.1865 -0.741234 2.22252 2.22275C-0.740839 5.18674 -0.740839 10.0096 2.22252 12.9729C5.0193 15.7697 9.49442 15.9445 12.5021 13.3979L17.9183 18.8148C18.166 19.0618 18.5669 19.0618 18.8145 18.8148C19.0615 18.5671 19.0615 18.1662 18.8145 17.9186Z" fill="#393939" />
            </svg>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className='w-full flex-grow p-2 outline-none border-none bg-transparent placeholder-gray-400' placeholder='Search for updates' />
          </div>
          <div className='flex items-center gap-6'>
            <div ref={sortRef} className="relative">
              <svg className='cursor-pointer relative' onClick={() => setIsSort(!isSort)} width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.33001 13.593H1.0293" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10.1406 3.90066H16.4413" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path fillRule="evenodd" clipRule="evenodd" d="M5.72629 3.84625C5.72629 2.5506 4.66813 1.5 3.36314 1.5C2.05816 1.5 1 2.5506 1 3.84625C1 5.14191 2.05816 6.19251 3.36314 6.19251C4.66813 6.19251 5.72629 5.14191 5.72629 3.84625Z" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path fillRule="evenodd" clipRule="evenodd" d="M17.0002 13.5533C17.0002 12.2576 15.9429 11.207 14.6379 11.207C13.3321 11.207 12.2739 12.2576 12.2739 13.5533C12.2739 14.8489 13.3321 15.8995 14.6379 15.8995C15.9429 15.8995 17.0002 14.8489 17.0002 13.5533Z" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {isSort && <div className="absolute top-6 right-0 p-3 rounded-lg shadow-lg z-30 bg-white">
                <h1 className="min-w-max font-medium cursor-pointer py-1 border-b" onClick={() => sortByTitle()}>Title</h1>
                <h1 className="min-w-max font-medium cursor-pointer py-1 border-b" onClick={() => sortByCreated()}>Created Time</h1>
                <h1 className="min-w-max font-medium cursor-pointer py-1" onClick={() => sortByUpdated()}>Updated Time</h1>
              </div>}
            </div>
            {adminInfo?.isAdmin ?
              <button onClick={() => setPopUp(true)} className='bg-green-gradient text-white rounded-lg py-1.5 px-4'>New Announcement</button>
              : <></>}
          </div>
        </div>

        <div className='mt-2 rounded-xl shadow-xl min-h-[400px] max-h-[75vh] overflow-y-auto relative'>
          <table className="w-full text-left pl-2 relative" style={{ borderSpacing: '4px 8px', borderCollapse: 'separate' }}>
            <thead>
              <tr className="font-normal text-[#AEAEAE] text-lg">
                <td>SL No.</td>
                <td>Date</td>
                <td>Title</td>
                <td>Description</td>
                {adminInfo?.isAdmin && <td></td>}
              </tr>
            </thead>
            <tbody>
              {
                filteredUpdates.length
                  ?
                  <>
                    {filteredUpdates.map((item, i) => (
                      <tr key={item.id}>
                        <td className="py-1 font-normal text-lg text-[#000000]">
                          {i + 1}
                        </td>
                        <td className="py-1 font-normal text-lg text-[#000000]">
                          {moment(item.createdAt).format('DD/MM/YYYY')}
                        </td>
                        <td className="py-1 font-normal text-lg text-[#000000]">
                          {item.title}
                        </td>
                        <td className="py-1 font-normal text-lg text-[#000000]" title={item.description}>
                          {item.description.length > 50 ? `${item.description.slice(0, 50)}...` : item.description}
                        </td>

                        <td>
                          {adminInfo?.isAdmin && < div className='cursor-pointer' onClick={() => setPopUp(item)}>
                            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9.8833 15.1842H15.6249" stroke="url(#paint0_linear_2403_2367)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path fillRule="evenodd" clipRule="evenodd" d="M9.11751 2.00421C9.73156 1.27033 10.8354 1.16272 11.5845 1.76429C11.6259 1.79693 12.9567 2.83071 12.9567 2.83071C13.7796 3.32819 14.0353 4.38579 13.5266 5.19288C13.4996 5.2361 5.97612 14.6469 5.97612 14.6469C5.72582 14.9591 5.34587 15.1435 4.9398 15.1479L2.05863 15.1841L1.40946 12.4364C1.31852 12.0501 1.40946 11.6443 1.65976 11.3321L9.11751 2.00421Z" stroke="url(#paint1_linear_2403_2367)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M7.72485 3.75098L12.0412 7.06578" stroke="url(#paint2_linear_2403_2367)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <defs>
                                <linearGradient id="paint0_linear_2403_2367" x1="12.7541" y1="14.7432" x2="12.7541" y2="15.6252" gradientUnits="userSpaceOnUse">
                                  <stop stopColor="#6DB935" />
                                  <stop offset="0.0001" stopColor="#6AB831" />
                                  <stop offset="1" stopColor="#4DAA09" />
                                </linearGradient>
                                <linearGradient id="paint1_linear_2403_2367" x1="7.58164" y1="1.375" x2="7.58164" y2="15.1841" gradientUnits="userSpaceOnUse">
                                  <stop stopColor="#6DB935" />
                                  <stop offset="0.0001" stopColor="#6AB831" />
                                  <stop offset="1" stopColor="#4DAA09" />
                                </linearGradient>
                                <linearGradient id="paint2_linear_2403_2367" x1="9.88303" y1="3.75098" x2="9.88303" y2="7.06578" gradientUnits="userSpaceOnUse">
                                  <stop stopColor="#6DB935" />
                                  <stop offset="0.0001" stopColor="#6AB831" />
                                  <stop offset="1" stopColor="#4DAA09" />
                                </linearGradient>
                              </defs>
                            </svg>
                          </div>}
                        </td>
                      </tr>
                    ))}
                  </>
                  :
                  <>
                    <tr className='text-4xl font-medium text-gray-400 absolute w-full text-center top-28 flex items-center justify-center'><td className='w-full'>No Recent Announcement</td></tr>
                  </>
              }
            </tbody>
          </table>
        </div>

      </section>

      {popUp && <AddUpdate popUp={popUp} closeEdit={closeEdit} fetchAnnouncements={fetchAnnouncements} />}

    </>
  )
}

export default Updates

const AddUpdate = ({ popUp, closeEdit, fetchAnnouncements }) => {

  const [data, setData] = useState({ title: popUp?.title || '', description: popUp?.description || '' });
  const btnRef = useRef();
  const handleChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.id]: e.target.value });
  }
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      btnRef.current.setAttribute("disabled", "disabled")
      if (!data.title || data?.title.length < 3) throw Error("Invalid Title")
      if (!data.description || data?.description.length < 5) throw Error("Invalid Description")
      let res;
      if (popUp.id) {
        res = await updateAnnouncement({ ...popUp, ...data });
      }
      else
        res = await addAnnouncement(data)

      if (res.status && res.data)
        fetchAnnouncements()
      btnRef.current.removeAttribute("disabled")
      closeEdit();
    } catch (error) {

    }
  }
  return (
    <>
      <div className='fixed inset-0 w-full min-h-screen overflow-hidden bg-black bg-opacity-40 grid place-items-center'>
        <div className="fixed inset-0 w-full full cursor-pointer" onClick={() => closeEdit()}></div>
        <form onSubmit={handleSubmit} className='bg-white rounded-xl p-6 2xl:px-10 w-full max-w-2xl z-10 shadow-xl relative flex flex-col'>
          <svg onClick={() => closeEdit()} className='absolute top-5 right-7 cursor-pointer' width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="path-1-inside-1_2247_5917" fill="white">
              <path d="M9.46647 7.66439L14.9555 2.18809C15.1959 1.94771 15.331 1.62169 15.331 1.28175C15.331 0.94181 15.1959 0.615791 14.9555 0.375416C14.7152 0.135041 14.3891 0 14.0492 0C13.7093 0 13.3832 0.135041 13.1429 0.375416L7.66657 5.86449L2.19026 0.375416C1.94989 0.135041 1.62387 -2.53276e-09 1.28393 0C0.943988 2.53276e-09 0.617969 0.135041 0.377595 0.375416C0.13722 0.615791 0.00217852 0.94181 0.00217852 1.28175C0.00217852 1.62169 0.13722 1.94771 0.377595 2.18809L5.86666 7.66439L0.377595 13.1407C0.257948 13.2594 0.162982 13.4006 0.0981741 13.5561C0.0333665 13.7117 0 13.8785 0 14.047C0 14.2156 0.0333665 14.3824 0.0981741 14.538C0.162982 14.6935 0.257948 14.8347 0.377595 14.9534C0.496264 15.073 0.63745 15.168 0.793006 15.2328C0.948563 15.2976 1.11541 15.331 1.28393 15.331C1.45245 15.331 1.6193 15.2976 1.77485 15.2328C1.93041 15.168 2.07159 15.073 2.19026 14.9534L7.66657 9.4643L13.1429 14.9534C13.2615 15.073 13.4027 15.168 13.5583 15.2328C13.7138 15.2976 13.8807 15.331 14.0492 15.331C14.2177 15.331 14.3846 15.2976 14.5401 15.2328C14.6957 15.168 14.8369 15.073 14.9555 14.9534C15.0752 14.8347 15.1702 14.6935 15.235 14.538C15.2998 14.3824 15.3331 14.2156 15.3331 14.047C15.3331 13.8785 15.2998 13.7117 15.235 13.5561C15.1702 13.4006 15.0752 13.2594 14.9555 13.1407L9.46647 7.66439Z" />
            </mask>
            <path d="M9.46647 7.66439L7.49936 5.6927L5.52308 7.66439L7.49936 9.63608L9.46647 7.66439ZM14.9555 2.18809L16.9226 4.15978L16.9249 4.15749L14.9555 2.18809ZM15.331 1.28175H18.1161H15.331ZM14.0492 0V2.78515V0ZM13.1429 0.375416L11.1735 -1.59398L11.1712 -1.59169L13.1429 0.375416ZM7.66657 5.86449L5.69487 7.83159L7.66657 9.80788L9.63826 7.83159L7.66657 5.86449ZM2.19026 0.375416L4.16196 -1.59169L4.15966 -1.59398L2.19026 0.375416ZM1.28393 0V-2.78515V0ZM0.00217852 1.28175H-2.78297H0.00217852ZM0.377595 2.18809L-1.59181 4.15749L-1.58951 4.15978L0.377595 2.18809ZM5.86666 7.66439L7.83377 9.63608L9.81005 7.66439L7.83377 5.6927L5.86666 7.66439ZM0.377595 13.1407L2.33891 15.1182L2.3447 15.1124L0.377595 13.1407ZM0.377595 14.9534L2.35505 12.9921L2.34701 12.984L2.3389 12.9759L0.377595 14.9534ZM2.19026 14.9534L0.218564 12.9863L0.212805 12.9921L2.19026 14.9534ZM7.66657 9.4643L9.63826 7.49719L7.66657 5.5209L5.69487 7.49719L7.66657 9.4643ZM13.1429 14.9534L15.1203 12.9921L15.1146 12.9863L13.1429 14.9534ZM14.9555 14.9534L12.9942 12.9759L12.9861 12.984L12.9781 12.9921L14.9555 14.9534ZM14.9555 13.1407L12.9884 15.1124L12.9942 15.1182L14.9555 13.1407ZM11.4336 9.63608L16.9226 4.15978L12.9884 0.216396L7.49936 5.6927L11.4336 9.63608ZM16.9249 4.15749C17.6876 3.39479 18.1161 2.36036 18.1161 1.28175H12.5458C12.5458 0.883024 12.7042 0.500629 12.9861 0.218688L16.9249 4.15749ZM18.1161 1.28175C18.1161 0.203141 17.6876 -0.831291 16.9249 -1.59398L12.9861 2.34482C12.7042 2.06287 12.5458 1.68048 12.5458 1.28175H18.1161ZM16.9249 -1.59398C16.1622 -2.35667 15.1278 -2.78515 14.0492 -2.78515V2.78515C13.6505 2.78515 13.2681 2.62676 12.9861 2.34482L16.9249 -1.59398ZM14.0492 -2.78515C12.9706 -2.78515 11.9362 -2.35667 11.1735 -1.59398L15.1123 2.34482C14.8303 2.62676 14.4479 2.78515 14.0492 2.78515V-2.78515ZM11.1712 -1.59169L5.69487 3.89738L9.63826 7.83159L15.1146 2.34252L11.1712 -1.59169ZM9.63826 3.89738L4.16196 -1.59169L0.218572 2.34252L5.69487 7.83159L9.63826 3.89738ZM4.15966 -1.59398C3.39697 -2.35667 2.36254 -2.78515 1.28393 -2.78515L1.28393 2.78515C0.885201 2.78515 0.502805 2.62676 0.220863 2.34482L4.15966 -1.59398ZM1.28393 -2.78515C0.205319 -2.78515 -0.829114 -2.35668 -1.59181 -1.59398L2.347 2.34482C2.06505 2.62676 1.68266 2.78515 1.28393 2.78515L1.28393 -2.78515ZM-1.59181 -1.59398C-2.3545 -0.83129 -2.78297 0.203142 -2.78297 1.28175L2.78733 1.28175C2.78733 1.68048 2.62894 2.06287 2.347 2.34482L-1.59181 -1.59398ZM-2.78297 1.28175C-2.78297 2.36036 -2.3545 3.39479 -1.59181 4.15749L2.347 0.218688C2.62894 0.50063 2.78733 0.883025 2.78733 1.28175L-2.78297 1.28175ZM-1.58951 4.15978L3.89956 9.63608L7.83377 5.6927L2.3447 0.216396L-1.58951 4.15978ZM3.89956 5.6927L-1.58951 11.169L2.3447 15.1124L7.83377 9.63608L3.89956 5.6927ZM-1.58371 11.1632C-1.96441 11.5408 -2.26657 11.9901 -2.47278 12.485L2.66913 14.6272C2.59254 14.8111 2.4803 14.9779 2.3389 15.1182L-1.58371 11.1632ZM-2.47278 12.485C-2.67899 12.98 -2.78515 13.5108 -2.78515 14.047H2.78515C2.78515 14.2462 2.74572 14.4434 2.66913 14.6272L-2.47278 12.485ZM-2.78515 14.047C-2.78515 14.5832 -2.67899 15.1141 -2.47278 15.6091L2.66913 13.4669C2.74572 13.6507 2.78515 13.8479 2.78515 14.047H-2.78515ZM-2.47278 15.6091C-2.26657 16.104 -1.9644 16.5532 -1.58371 16.9308L2.3389 12.9759C2.4803 13.1161 2.59253 13.283 2.66913 13.4669L-2.47278 15.6091ZM-1.59986 16.9147C-1.2223 17.2954 -0.773075 17.5975 -0.278099 17.8037L1.86411 12.6618C2.04797 12.7384 2.21482 12.8507 2.35505 12.9921L-1.59986 16.9147ZM-0.278099 17.8037C0.21686 18.01 0.747744 18.1161 1.28393 18.1161V12.5458C1.48308 12.5458 1.68027 12.5852 1.86411 12.6618L-0.278099 17.8037ZM1.28393 18.1161C1.82011 18.1161 2.351 18.01 2.84596 17.8037L0.703747 12.6618C0.887592 12.5852 1.08478 12.5458 1.28393 12.5458V18.1161ZM2.84596 17.8037C3.34093 17.5975 3.79015 17.2954 4.16772 16.9147L0.212805 12.9921C0.353033 12.8507 0.519883 12.7384 0.703747 12.6618L2.84596 17.8037ZM4.16196 16.9205L9.63826 11.4314L5.69487 7.49719L0.218572 12.9863L4.16196 16.9205ZM5.69487 11.4314L11.1712 16.9205L15.1146 12.9863L9.63826 7.49719L5.69487 11.4314ZM11.1654 16.9147C11.543 17.2954 11.9922 17.5975 12.4872 17.8037L14.6294 12.6618C14.8133 12.7384 14.9801 12.8507 15.1203 12.9921L11.1654 16.9147ZM12.4872 17.8037C12.9821 18.01 13.513 18.1161 14.0492 18.1161V12.5458C14.2484 12.5458 14.4455 12.5852 14.6294 12.6618L12.4872 17.8037ZM14.0492 18.1161C14.5854 18.1161 15.1163 18.01 15.6112 17.8037L13.469 12.6618C13.6529 12.5852 13.8501 12.5458 14.0492 12.5458V18.1161ZM15.6112 17.8037C16.1062 17.5975 16.5554 17.2954 16.933 16.9147L12.9781 12.9921C13.1183 12.8507 13.2852 12.7384 13.469 12.6618L15.6112 17.8037ZM16.9168 16.9308C17.2975 16.5533 17.5997 16.104 17.8059 15.6091L12.664 13.4669C12.7406 13.283 12.8528 13.1161 12.9942 12.9759L16.9168 16.9308ZM17.8059 15.6091C18.0121 15.1141 18.1183 14.5832 18.1183 14.047H12.548C12.548 13.8479 12.5874 13.6507 12.664 13.4669L17.8059 15.6091ZM18.1183 14.047C18.1183 13.5109 18.0121 12.98 17.8059 12.485L12.664 14.6272C12.5874 14.4434 12.548 14.2462 12.548 14.047H18.1183ZM17.8059 12.485C17.5997 11.99 17.2975 11.5408 16.9168 11.1632L12.9942 15.1182C12.8528 14.9779 12.7406 14.8111 12.664 14.6272L17.8059 12.485ZM16.9226 11.169L11.4336 5.6927L7.49936 9.63608L12.9884 15.1124L16.9226 11.169Z" fill="black" mask="url(#path-1-inside-1_2247_5917)" />
          </svg>
          <h1 className='GreenGradient text-2xl font-medium'>Latest Announcement</h1>

          <div className='mt-4'>
            <label htmlFor="title" className='text-xl font-semibold block'>Title</label>
            <input type="text" id='title' value={data.title} onChange={handleChange} placeholder='Enter Title' className='border-none outline-none p-2 rounded-lg shadow-xl block w-full my-1' />
          </div>


          <div className='mt-4'>
            <label htmlFor="description" className='text-xl font-semibold block'>Description</label>
            <textarea type="text" id='description' value={data.description} onChange={handleChange} placeholder='Enter Announcement Description' className='border-none outline-none p-2 rounded-lg shadow-xl block w-full my-1 resize-none h-40 pb-6'>
            </textarea>
          </div>

          <div className='pt-6 ml-auto'>
            <button type='submit' ref={btnRef} className='bg-green-gradient text-white py-1.5 px-6 rounded-xl shadow-xl uppercase text-2xl font-medium'>Submit</button>
          </div>

        </form>
      </div>

    </>
  )
}