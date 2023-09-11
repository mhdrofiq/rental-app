import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const ApprovedOrdersRows = ({ order }) => {
    const navigate = useNavigate();
    const { auth } = useAuth();

    const formattedRentalDate = new Date(order.rentalDate).toLocaleString("en-GB", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
    });

    const formattedReturnDate = new Date(order.returnDate).toLocaleString("en-GB", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
    });

    const formattedApprovalDate = new Date(order.approvedOn).toLocaleString("en-GB", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
    });

    const handleCompleteOrder = () => {
        navigate(`/dash/ongoingOrders/SetCompleteOrder/${order._id}/`)
    }

    return (
        <>
        
        <tr>
            <td>{order._id}</td>
            <td>{order.vehicleName}</td>
            <td>{order.adminName}</td>
            <td>{order.reviewerName}</td>
            <td>{formattedApprovalDate}</td>
            <td>{order.driverName}</td>
            <td>{formattedRentalDate}</td>
            <td>{formattedReturnDate}</td>
            <td>{order.orderStatus}</td>
            <td>
            {
                auth?.role === "Administrator" 
                ? 
                <button 
                className="btn btn-sm btn-outline-success" onClick={handleCompleteOrder}>
                <i className="bi bi-check2-square"></i> Set Completed
                </button>
                : 
                <button className="btn btn-sm btn-outline-success" disabled>
                <i className="bi bi-check2-square"></i> Set Completed</button>
            }
            </td>
        </tr>
        </>
    );
};

export default ApprovedOrdersRows;
