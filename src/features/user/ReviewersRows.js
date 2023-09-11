import { useNavigate } from "react-router-dom";

const ReviewersListRows = ({ reviewer }) => {

    return (
        <tr>
        <td>{reviewer._id}</td>
        <td>{reviewer.fullName}</td>
        <td>{reviewer.email}</td>
        <td>{reviewer.role}</td>
        </tr>
    );
};

export default ReviewersListRows;
