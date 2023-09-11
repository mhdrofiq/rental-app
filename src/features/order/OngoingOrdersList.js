import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "../../api/axios";
import OngoingOrdersListRows from "./OngoingOrdersRows";
import ApprovedOrdersRows from "./ApprovedOrdersRows";
import useAuth from "../../hooks/useAuth";

const OngoingOrdersList = () => {
  const [pendingOrders, setPendingOrders] = useState();
  const [myPendingOrders, setMyPendingOrders] = useState();
  const [approvedOrders, setApprovedOrders] = useState();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios
      .get(`/orders`)
      .then((res) => {
        setPendingOrders(
          res.data.filter(
            (order) =>
              order.orderStatus === "Pending Approval"
          )
        );
        setMyPendingOrders(
          res.data.filter(
            (order) =>
              order.orderStatus === "Pending Approval" && order.reviewerName === auth?.fullName
          )
        );
        setApprovedOrders(
          res.data.filter(
            (order) =>
              order.orderStatus === "Approved"
          )
        );
      })
      .catch(function (err) {
        setPendingOrders(["empty"]);
        setMyPendingOrders(["empty"]);
      });
  }, []);

  let PendingTableContent
  if(auth?.role === "Administrator"){
  PendingTableContent = pendingOrders?.length
    ? pendingOrders.map((order) => (
        <OngoingOrdersListRows key={order._id} order={order} />
      ))
    : null;
  } else {
    PendingTableContent = myPendingOrders?.length
    ? myPendingOrders.map((order) => (
        <OngoingOrdersListRows key={order._id} order={order} />
      ))
    : null;
  }

  const ApprovedTableContent = approvedOrders?.length
    ? approvedOrders.map((order) => (
        <ApprovedOrdersRows key={order._id} order={order} />
      ))
    : null;

  return (
    <div className="d-flex flex-column gap-3">

    <div className="p-3 rounded bg-white shadow-sm">
      <div className="d-flex flex-column mt-4">
        <h4 className="mono-text">List of Pending Orders</h4>
        <div className="card text-bg-light d-flex flex-row gap-2 p-3 text-secondary">
          <i className="bi bi-info-circle text-secondary"></i>
          This is a list of orders that have yet to be approved by a reviewer.
        </div>
      </div>

      <table className="table table-sm table-bordered table-hover table-fixed mt-3">
        <thead className="table-thead">
          <tr>
            <th scope="col" className="table-th">
              Identification code
            </th>
            <th scope="col" className="table-th">
              Vehicle
            </th>
            <th scope="col" className="table-th">
              Ordered by (Admin)
            </th>
            <th scope="col" className="table-th">
              To be approved by (Reviewer)
            </th>
            <th scope="col" className="table-th">
              Driver name
            </th>
            <th scope="col" className="table-th">
              Rental date
            </th>
            <th scope="col" className="table-th">
              Return date
            </th>
            <th scope="col" className="table-th">
              Order status
            </th>
            <th scope="col" className="table-th">
              Controls
            </th>
          </tr>
        </thead>
        <tbody>{PendingTableContent}</tbody>
      </table>
    </div>

    <div className="p-3 rounded bg-white shadow-sm">
      <div className="d-flex flex-column mt-4">
        <h4 className="mono-text">List of Approved Orders</h4>
        <div className="card text-bg-light d-flex flex-row gap-2 p-3 text-secondary">
          <i className="bi bi-info-circle text-secondary"></i>
          This is a list of orders that have yet to be marked as complete, i.e the rented vehicle has not been returned and rental has been approved.
        </div>
      </div>

      <table className="table table-sm table-bordered table-hover table-fixed mt-3">
        <thead className="table-thead">
          <tr>
            <th scope="col" className="table-th">
              Identification code
            </th>
            <th scope="col" className="table-th">
              Vehicle
            </th>
            <th scope="col" className="table-th">
              Ordered by (Admin)
            </th>
            <th scope="col" className="table-th">
              Approved by (Reviewer)
            </th>
            <th scope="col" className="table-th">
              Approved on
            </th>
            <th scope="col" className="table-th">
              Driver name
            </th>
            <th scope="col" className="table-th">
              Rental date
            </th>
            <th scope="col" className="table-th">
              Return date
            </th>
            <th scope="col" className="table-th">
              Order status
            </th>
            <th scope="col" className="table-th">
              Controls
            </th>
          </tr>
        </thead>
        <tbody>{ApprovedTableContent}</tbody>
      </table>
    </div>

    </div>
  );
};

export default OngoingOrdersList;
