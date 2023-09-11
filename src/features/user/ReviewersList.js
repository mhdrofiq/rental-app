import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
// import useAxiosPrivate from "../../hooks/useAxiosPrivate";
// import useRefreshToken from "../../hooks/useRefreshToken";
import axios from "../../api/axios";
import ReviewersListRows from "./ReviewersRows";

const ReviewersList = () => {
    const [reviewers, setReviewers] = useState();
    const navigate = useNavigate();
    const location = useLocation();

  useEffect(() => {
    axios.get(`/users`).then((res) => {
        setReviewers(
          res.data.filter((user) => user.role === "Reviewer")
        );
      }).catch(function (err){
        setReviewers(['empty'])
      });
  }, []);

  const ReviewersTableContent = reviewers?.length
  ? reviewers.map(reviewer => <ReviewersListRows key={reviewer._id} reviewer={reviewer} />)
  : null

  return (
    <div className="p-3 rounded bg-white shadow-sm">

    <div className="d-flex flex-column mt-4">
      <h4 className="mono-text">List of Registered Reviewers</h4>
      <div className="card text-bg-light d-flex flex-row gap-2 p-3 text-secondary">
        <i className="bi bi-info-circle text-secondary"></i>
        Reviewers are responsible for approving orders made by administrators.
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
            {ReviewersTableContent}
          </tbody>
        </table>

  </div>
  );
};

export default ReviewersList;
