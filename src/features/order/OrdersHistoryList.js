import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "../../api/axios";
import OrdersHistoryRows from "./OrdersHistoryRows";
import { CSVLink } from "react-csv";
import { all } from "axios";

const OrdersHistoryList = () => {
  const [allOrders, setAllOrders] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios
      .get(`/orders`)
      .then((res) => {
        const data = res.data.filter(
          (order) =>
            order.orderStatus === "Completed"
        )
        setAllOrders(data)
      })
      .catch(function (err) {
        setAllOrders([null])
      })
  }, [])

  const AllOrdersTableContent = allOrders?.length
    ? allOrders.map((order) => (
        <OrdersHistoryRows key={order._id} order={order} />
      ))
    : null;


  const exportButton = allOrders?.length > 0 ? (
    <CSVLink className="ms-auto btn btn-sm btn-primary" data={allOrders} filename={"orderHistory.csv"}>
    Download as CSV
    </CSVLink>
  ) : null

  return (
    <div className="p-3 rounded bg-white shadow-sm">
      <div className="d-flex flex-column mt-4">
        <div className="d-flex flex-row mb-2">
          <h4 className="mono-text">List of Completed Orders</h4>
          {/* <button className="ms-auto btn btn-sm btn-primary">
          <i className="bi bi-filetype-csv"></i> Export to CSV
          </button> */}
          {exportButton}
        </div>
        
        <div className="card text-bg-light d-flex flex-row gap-2 p-3 text-secondary">
          <i className="bi bi-info-circle text-secondary"></i>
          This is a list of all orders that have been completed. To view the orders pending approval and approved orders, please navigate to the Ongoing-Orders tab in the nav bar
        </div>
      </div>

      <table className="table table-sm table-bordered table-hover table-fixed mt-3">
        <thead className="table-thead">
          <tr>
            <th scope="col" className="table-th">
              Identification Code
            </th>
            <th scope="col" className="table-th">
              Vehicle
            </th>
            <th scope="col" className="table-th">
              Ordered By (Admin)
            </th>
            <th scope="col" className="table-th">
              Approved By (Reviewer)
            </th>
            <th scope="col" className="table-th">
              Approved On
            </th>
            <th scope="col" className="table-th">
              Driver Name
            </th>
            <th scope="col" className="table-th">
              Rental Date
            </th>
            <th scope="col" className="table-th">
              Return Date
            </th>
            <th scope="col" className="table-th">
              Fuel Consumed
            </th>
            <th scope="col" className="table-th">
              Order Status
            </th>
          </tr>
        </thead>
        <tbody>{AllOrdersTableContent}</tbody>
      </table>
    </div>
  );
};

export default OrdersHistoryList;
