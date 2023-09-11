import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../api/axios";

const SetCompleteOrder = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [order, setOrder] = useState();
    const [fuelConsumed, setFuelConsumed] = useState("");

    useEffect(() => {
        axios.get(`/orders/${id}`).then((res) => {
            setOrder(res.data)
          }).catch(function (err){
            setOrder('empty')
          });
      }, []);

    const handleCompleteOrder = async (e) => {
        e.preventDefault();
        try{
            const orderObject = {
                id: id,
                vehicle: order.vehicle,
                administrator: order.administrator,
                reviewer: order.reviewer,
                driverName: order.driverName,
                rentalDate: order.rentalDate,
                returnDate: order.returnDate,
                approvedOn: order.approvedOn,
                fuelConsumed: fuelConsumed,
                orderStatus: "Completed",
            }
            //console.log(orderObject);
            const res = axios.patch(`/orders`, orderObject);
            console.log(res);
            setFuelConsumed("0")
            navigate("/dash/ordersHistory")
        }catch (err) {
            console.log(err);
        }
    }

    const onFuelConsumedChanged = (e) => setFuelConsumed(e.target.value);
    const goBack = (e) => navigate("/dash/ongoingOrders");

    return (
        <>
        <div className="p-3 rounded bg-white d-flex flex-column shadow-sm align-items-center">

        <div className="card my-3">
            
            <form
            className="form card-body"
            onSubmit={handleCompleteOrder}
            >
                 <div className="card text-bg-light d-flex flex-row gap-2 p-3 text-secondary">
                    <i className="bi bi-info-circle text-secondary"></i>
                    Enter the amount of fuel consumed (in liters) during the rental period to complete the order.
                </div>
            <label className="form-label mt-3 text-secondary" htmlFor="fuelConsumed">
                Fuel consumed
            </label>
            <input
                className="form-control"
                id="fuelConsumed"
                name="fuelConsumed"
                type="number"
                min="1"
                autoComplete="off"
                value={fuelConsumed}
                onChange={onFuelConsumedChanged}
                required
            />
            <div className="d-flex mt-3 gap-2">
            <button className="btn btn-outline-primary" onClick={goBack}>
            <i className="bi bi-arrow-left"></i> Back
            </button> 
            <button className="btn btn-success px-5" title="Save">
            Confirm
            </button> 
           
            </div>
            </form>
        </div>
        </div>
       
       
        </>
    );
};

export default SetCompleteOrder;
