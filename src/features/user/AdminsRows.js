import { useNavigate } from "react-router-dom";

const AdminsListRows = ({ admin }) => {

    return (
        <tr>
        <td>{admin._id}</td>
        <td>{admin.fullName}</td>
        <td>{admin.email}</td>
        <td>{admin.role}</td>
        </tr>
    );
};

export default AdminsListRows;
