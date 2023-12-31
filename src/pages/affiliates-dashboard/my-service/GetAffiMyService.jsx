import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
 import Aos from "aos";
import TableBodyLoading from "../../../components/loader/TableBodyLoading";
import Pagination from "../../../components/breadcrumbs/Pagination";
import CommonBreadCrumbs from "../../../components/breadcrumbs/CommonBreadCrumbs";
import {
  NoDataFound,
  TableStatus,
} from "../../../components/table/TableComponents";
import { Link } from "react-router-dom";
import { GetAffiAllService } from "../../../api/admin/affiliatesAPI";
import { http } from "../../../components/action/axiosInstance";
import tost from "../../../components/action/tost";
import { time } from "../../../components/action/actions";

const GetAffiMyService = () => {
  const [page, setPage] = useState(null);
  const { serviceAllData, isLoading, refetch } = GetAffiAllService(page);

 
  // order progress
  const handleProgress = async (e) => {
    
    const data = await http.post("/service/status", e);
     if (data?.data?.data === "success") {
      tost(data?.data?.message);
      refetch();
    } else if (data?.data?.message === "Validation errors") {
      tost(data?.data?.data?.status[0]);
    }
  };

  // loading animation
  useEffect(() => {
    Aos.init({ delay: 300, offset: 50, duration: 300 });
  }, []);

  return (
    <div className="ec-content-wrapper">
      <Helmet>
        <title>Service Orders-SOS</title>
      </Helmet>
      <div className="content">
        <CommonBreadCrumbs heading="Service Order" />
        <div data-aos="fade" className="row">
          <div className="col-12">
            <div className="ec-vendor-list card card-default">
              <div className="card-body">
                <div className="table-responsive">
                  <table
                    id="responsive-data-table"
                    className="table"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th>SL</th>
                        <th>Amount</th>
                        <th>Commision Amount</th>
                        <th>Commision Type</th>
                        <th>Status</th>
                        <th>Details</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    {isLoading ? (
                      <TableBodyLoading />
                    ) : (
                      <tbody style={{ verticalAlign: "middle" }}>
                        {serviceAllData?.data?.length > 0 ? (
                          serviceAllData?.data?.map((data, i) => (
                            <tr key={data?.id}>
                              <td>{i + 1}</td>
                              <td>{parseInt(data?.amount)} TK</td>
                              <td>{parseInt(data?.commission_amount)} TK</td>
                              <td>{data?.commission_type}</td>
                              <td>
                                <TableStatus
                                  status={data?.status}
                                  text={data?.status}
                                />
                              </td>
                              <td>
                                {data?.details?.length > 70 ? (
                                  <>{data?.details?.slice(0, 70) + "..."}</>
                                ) : (
                                  <>{data?.details}</>
                                )}
                              </td>
                              <td>
                                <span className={"time"}>
                                  <span>{time(data?.updated_at).date}</span>
                                  <span className={"showTime"}>
                                    {time(data?.updated_at).time}
                                  </span>
                                </span>
                              </td>
                              <td>
                                <div className="btn-group">
                                  <Link
                                    to={`/affiliates-dashboard/my-service/${data?.id}`}
                                    style={{ padding: "3px 10px" }}
                                    className="btn btn-outline-success"
                                  >
                                    View
                                  </Link>
                                  <button
                                    type="button"
                                    className="btn btn-outline-success dropdown-toggle dropdown-toggle-split"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    data-display="static"
                                  >
                                    <span className="sr-only">Info</span>
                                  </button>
                                  <div className="dropdown-menu">
                                    {data?.status === "pending" && (
                                      <button
                                        onClick={() =>
                                          handleProgress({
                                            service_order_id: data?.id,
                                            status: "progress",
                                          })
                                        }
                                        className="dropdown-item"
                                      >
                                        Progress
                                      </button>
                                    )}
                                    {data?.status === "progress" && (
                                      <Link
                                        to={`/affiliates-dashboard/my-service/delivery/${data?.id}`}
                                      >
                                        <button className="dropdown-item">
                                          Delivery
                                        </button>
                                      </Link>
                                    )}
                                    {data?.status === "revision" && (
                                      <Link
                                        to={`/affiliates-dashboard/my-service/delivery/${data?.id}`}
                                      >
                                        <button className="dropdown-item">
                                          Delivery
                                        </button>
                                      </Link>
                                    )}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <NoDataFound />
                        )}
                      </tbody>
                    )}
                  </table>
                  <Pagination
                    page={page}
                    setPage={setPage}
                    isLoading={isLoading}
                    getPaginationData={serviceAllData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetAffiMyService;
