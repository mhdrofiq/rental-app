import { useNavigate } from "react-router-dom";

const VehiclesListRows = ({ vehicle }) => {

    const formattedServiceDate = new Date(vehicle.nextServiceDate).toLocaleString("en-GB", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
    });

    return (
        <tr>
        <td>{vehicle._id}</td>
        <td>{vehicle.vehicleName}</td>
        <td>{vehicle.vehicleType}</td>
        <td>{vehicle.fuelMaxCapacity}</td>
        <td>{formattedServiceDate}</td>
        </tr>
    );
};

export default VehiclesListRows;
