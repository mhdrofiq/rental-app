import { useNavigate } from "react-router-dom";

const OrdersHistoryRows = ({ order }) => {

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

    return (
        <tr>
        <td>{order._id}</td>
        <td>{order.vehicleName}</td>
        <td>{order.adminName}</td>
        <td>{order.reviewerName}</td>
        <td>{formattedApprovalDate}</td>
        <td>{order.driverName}</td>
        <td>{formattedRentalDate}</td>
        <td>{formattedReturnDate}</td>
        <td>{order.fuelConsumed} Liters</td>
        <td>{order.orderStatus}</td>
        </tr>
    );
};

export default OrdersHistoryRows;
