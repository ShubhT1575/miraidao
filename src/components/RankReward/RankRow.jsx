import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../Config";
import { useSelector } from "react-redux";
import "../../style/dashboard.css";


function RankRow() {
  const { wallet } = useSelector((state) => state.bitgold);
  const { walletAddress, isConnected } = wallet;
  const address = walletAddress;
  const [GlobalIncome, setGlobalIncome] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [directUser, setDirectUser] = useState([]);
  

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const getGlobalIncome = async () => {
    try {
      const response = await axios.get(apiUrl + "/getRankBonus", {
        params: {
          address: address,
          page: currentPage,
        },
      });
      if (response?.data?.status === 200) {
        setGlobalIncome(response?.data?.data);
      } else {
        setGlobalIncome([]);
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };
  console;
  useEffect(() => {
    if (address) getGlobalIncome();
  }, [address, currentPage]);
  return (
    <div className="row">
      <div className="col-xl-6">
        <div className="card custom-card overflow-hidden new-card">
          <div className="card-header justify-content-between color-dark">
            <div className="card-title">Withdrawl Data <strong>$5</strong></div>
          </div>

          <div className="card-body active-tab">
            <div className="table-responsive">
              <table className="table table-bordered text-nowrap mb-0">
                <thead>
                  <tr>
                    <th scope="col" style={{color: "black"}}>S.NO</th>
                    <th scope="col" style={{color: "black"}}>User ID</th>
                    {/* <th scope="col">Sender</th> */}
                    <th scope="col" style={{color: "black"}}>Transaction Hash</th>
                    <th sscope="col" style={{color: "black"}}>Amount</th>
                    {/* <th scope="col">Level</th> */}
                    <th scope="col" style={{color: "black"}}>Time Stamp</th>
                    <th scope="col" style={{color: "black"}}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {directUser?.map((item, index) => {
                    return (
                      <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td className="text-warning">
                          {item?.user.slice(0, 5)}...{item?.user.slice(-5)}
                        </td>
                        <td>
                          <a
                            href={`https://opbnb-testnet.bscscan.com/tx/${item?.txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "rgb(0, 119, 181)" }}
                          >
                            {item?.txHash.slice(0, 6)}...
                            {item?.txHash.slice(-6)}
                          </a>
                        </td>
                        <td>$ {item.reward}</td>
                        {/* <td>{item.level}</td> */}
                        <td>{new Date(item.timestamp).toLocaleString()}</td>
                        <td>
                          <span className="badge bg-success-transparent">
                            success
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {directUser?.length === 0 && (
                <div className=" w-100">
                  <div className="w-100 text-center p-3 color-dark">No Data Found.</div>
                </div>
              )}
            </div>
          </div>

          <div className="card-footer pagination-body">
            <div className="d-flex align-items-center justify-content-between color-dark">
              <div>
                Showing {directUser?.length || 0} Withdrawl Data
                <i className="bi bi-arrow-right ms-2 fw-semibold"></i>
              </div>
              <div>
                <nav
                  aria-label="Page navigation"
                  className="pagination-style-4"
                >
                  <ul className="pagination mb-0">
                    <button
                      className="btn btn-warning page-item btn-pagination"
                      style={{ marginRight: "10px" }}
                      disabled={currentPage === 1}
                      onClick={handlePreviousPage}
                    >
                      Prev
                    </button>

                    <button
                      className="btn btn-warning-gradient page-item btn-pagination"
                      disabled={currentPage === totalPages}
                      onClick={handleNextPage}
                    >
                      Next
                    </button>
                  </ul>
                </nav>
              </div>
              <div>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-6">
        <div className="card custom-card overflow-hidden new-card" style={{color: "black"}}>
          <div className="card-header justify-content-between color-dark">
          <div className="card-title">Withdrawl Data <strong>$25</strong></div>
          </div>

          <div className="card-body active-tab">
            <div className="table-responsive">
              <table className="table table-bordered text-nowrap mb-0">
                <thead>
                  <tr>
                    <th scope="col" style={{color: "black"}}>S.NO</th>
                    <th scope="col" style={{color: "black"}}>User ID</th>
                    {/* <th scope="col">Sender</th> */}
                    <th scope="col" style={{color: "black"}}>Transaction Hash</th>
                    <th scope="col" style={{color: "black"}}>Amount</th>
                    {/* <th scope="col">Level</th> */}
                    <th scope="col" style={{color: "black"}}>Time Stamp</th>
                    <th scope="col" style={{color: "black"}}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {directUser?.map((item, index) => {
                    return (
                      <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td className="text-warning">
                          {item?.user.slice(0, 5)}...{item?.user.slice(-5)}
                        </td>
                        <td>
                          <a
                            href={`https://opbnb-testnet.bscscan.com/tx/${item?.txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "rgb(0, 119, 181)" }}
                          >
                            {item?.txHash.slice(0, 6)}...
                            {item?.txHash.slice(-6)}
                          </a>
                        </td>
                        <td>$ {item.reward}</td>
                        {/* <td>{item.level}</td> */}
                        <td>{new Date(item.timestamp).toLocaleString()}</td>
                        <td>
                          <span className="badge bg-success-transparent">
                            success
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {directUser?.length === 0 && (
                <div className=" w-100">
                  <div className="w-100 text-center p-3 color-dark">No Data Found.</div>
                </div>
              )}
            </div>
          </div>

          <div className="card-footer pagination-body">
            <div className="d-flex align-items-center justify-content-between color-dark">
              <div>
                Showing {directUser?.length || 0} Withdrawl Data
                <i className="bi bi-arrow-right ms-2 fw-semibold"></i>
              </div>
              <div>
                <nav
                  aria-label="Page navigation"
                  className="pagination-style-4"
                >
                  <ul className="pagination mb-0">
                    <button
                      className="btn btn-primary page-item btn-pagination"
                      style={{ marginRight: "10px" }}
                      disabled={currentPage === 1}
                      onClick={handlePreviousPage}
                    >
                      Prev
                    </button>

                    <button
                      className="btn btn-success page-item btn-pagination"
                      disabled={currentPage === totalPages}
                      onClick={handleNextPage}
                    >
                      Next
                    </button>
                  </ul>
                </nav>
              </div>
              <div>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RankRow;
