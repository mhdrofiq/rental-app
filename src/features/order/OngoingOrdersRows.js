import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const OngoingOrdersListRows = ({ order }) => {
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

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', {dateStyle: 'short'}).format(date)

    const handleApproveOrder = async (e) => {
        if(window.confirm("Are you sure you want to approve this order?")){
            try{
                order.orderStatus = "Approved"
                order.approvedOn = today
                order.id = order._id
                //console.log(order);
                const orderObject = order
                const res = axios.patch(`/orders`, orderObject);
                console.log(res);
                navigate(0)
            }catch (err) {
                console.log(err);
            }
        } else {
            e.preventDefault()
        }
    }

    return (
        <tr>
        <td>{order._id}</td>
        <td>{order.vehicleName}</td>
        <td>{order.adminName}</td>
        <td>{order.reviewerName}</td>
        <td>{order.driverName}</td>
        <td>{formattedRentalDate}</td>
        <td>{formattedReturnDate}</td>
        <td>{order.orderStatus}</td>
        <td>
            {
                auth?.role === "Reviewer" 
                ? 
                <button className="btn btn-sm btn-outline-success" onClick={handleApproveOrder}>
                <i className="bi bi-check2-circle"></i> Approve Order
                </button>
                : 
                <button className="btn btn-sm btn-outline-success" disabled>
                <i className="bi bi-check2-circle"></i> Approve Order</button>
            }
        </td>
        </tr>
    );
};

export default OngoingOrdersListRows;
