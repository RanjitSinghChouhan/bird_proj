import React, { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";

function SupportTable({ search, reports, closeRequest }) {
  const [filteredReports, setFilteredReports] = useState(reports);

  const debounced = useDebounce(search, 500);

  useEffect(() => {
    let data = reports.filter((item) =>
      item.type?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredReports(data);
  }, [debounced, reports, search]);

  return (
    <table
      className="w-full relative"
      style={{ borderSpacing: "0 4px", borderCollapse: "separate" }}
    >
      <thead>
        <tr className="text-left font-normal text-[#AEAEAE] text-lg">
          <td>SL No.</td>
          {/* <td>Requester Id</td>
                <td>Requester Role</td> */}
          <td>Type</td>
          <td>Description</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {filteredReports?.length ? (
          <>
            {filteredReports.map((item, i) => (
              <tr key={item.id}>
                <td className="py-1 font-normal text-lg text-[#000000]">
                  {i + 1}
                </td>
                {/* <td className="py-1 font-normal text-lg text-[#000000]">
                        {item.requesterId}
                      </td>
                      <td className="py-1 font-normal text-lg text-[#000000]">
                        {item.requesterRole}
                      </td> */}
                <td className="py-1 font-normal text-lg text-[#000000]">
                  {item.type}
                </td>
                <td className="py-1 font-normal text-lg text-[#000000]">
                  {item.description}
                </td>
                <td>
                  <button
                    className={`text-sm text-white ${
                      !item.isOpen
                        ? "bg-gray-400 px-5"
                        : "bg-gradient-to-b from-[#6DB935] to-[#4DAA09] px-6 cursor-pointer"
                    } py-1 text-white rounded-lg`}
                    onClick={() => closeRequest(item.id)}
                  >
                    {item.isOpen ? "Open" : "Closed"}
                  </button>
                </td>
              </tr>
            ))}
          </>
        ) : (
          <>
            <tr className="text-4xl font-medium text-gray-400 absolute w-full text-center top-28 flex items-center justify-center">
              <td className="w-full">No Request Raised</td>
            </tr>
          </>
        )}
      </tbody>
    </table>
  );
}

export default SupportTable;
