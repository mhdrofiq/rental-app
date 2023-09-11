import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
// import useAxiosPrivate from "../../hooks/useAxiosPrivate";
// import useRefreshToken from "../../hooks/useRefreshToken";
import axios from "../../api/axios";
import AdminsListRows from "./AdminsRows";

const AdminsList = () => {
    const [admins, setAdmins] = useState();
    const navigate = useNavigate();
    const location = useLocation();

  useEffect(() => {
    axios.get(`/users`).then((res) => {
      setAdmins(
          res.data.filter((user) => user.role === "Administrator")
        );
      }).catch(function (err){
        setAdmins(['empty'])
      });
  }, []);

  const AdminsTableContent = admins?.length
  ? admins.map(admin => <AdminsListRows key={admin._id} admin={admin} />)
  : null

  return (
    <div className="p-3 rounded bg-white shadow-sm">

    <div className="d-flex flex-column mt-4">
      <h4 className="mono-text">List of Registered Administrators</h4>
      <div className="card text-bg-light d-flex flex-row gap-2 p-3 text-secondary">
        <i className="bi bi-info-circle text-secondary"></i>
        Administrators are responsible for making orders at the request of employees looking to rent a company vehicle.
      </div>
    </div>
      
        <table className="table table-sm table-bordered table-hover table-fixed mt-3">
          <thead className="table-thead">
            <tr>
              <th scope="col" className="table-th">
                Identification Code
              </th>
              <th scope="col" className="table-th">
                Full Name
              </th>
              <th scope="col" className="table-th">
                Email Address
              </th>
              <th scope="col" className="table-th">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {AdminsTableContent}
          </tbody>
        </table>

  </div>
  );
};

export default AdminsList;
