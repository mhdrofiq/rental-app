import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
// import useAxiosPrivate from "../../hooks/useAxiosPrivate";
// import useRefreshToken from "../../hooks/useRefreshToken";
import axios from "../../api/axios";
import VehiclesListRows from "./VehiclesListRows";

const VehiclesList = () => {
    const [vehicles, setVehicles] = useState();
    const navigate = useNavigate();
    const location = useLocation();

  useEffect(() => {
    axios.get(`/vehicles`).then((res) => {
        setVehicles(res.data);
      }).catch(function (err){
        setVehicles(['empty'])
      });
  }, []);

  const VehiclesTableContent = vehicles?.length
  ? vehicles.map(vehicle => <VehiclesListRows key={vehicle._id} vehicle={vehicle} />)
  : null

  return (
    <div className="p-3 rounded bg-white shadow-sm">

    <div className="d-flex flex-column mt-4">
      <h4 className="mono-text">List of Registered Vehicles</h4>
      <div className="card text-bg-light d-flex flex-row gap-2 p-3 text-secondary">
        <i className="bi bi-info-circle text-secondary"></i>
        This is a list of all company vehicles registered in the system.
      </div>
    </div>
      
        <table className="table table-sm table-bordered table-hover table-fixed mt-3">
          <thead className="table-thead">
            <tr>
              <th scope="col" className="table-th">
                Identificaion Code
              </th>
              <th scope="col" className="table-th">
                Vehicle Name
              </th>
              <th scope="col" className="table-th">
                Vehicle Type
              </th>
              <th scope="col" className="table-th">
                Maximum Fuel Capacity
              </th>
              <th scope="col" className="table-th">
                Next Service Date
              </th>
            </tr>
          </thead>
          <tbody>
            {VehiclesTableContent}
          </tbody>
        </table>

  </div>
  );
};

export default VehiclesList;
