import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    // <section className='col-lg-8 mx-auto p-5 py-md-5 text-center'>
    <div className="d-flex vh-100 flex-column justify-content-center align align-items-center my-auto" style={{backgroundColor:'#343a40'}}>
      <div className="text-center text-light">
        <div style={{width: '400px'}}>
          <h5 className="mb-1 mono-text">Welcome to Rental App</h5>
          <p className="">
            Log in with your account to continue.
          </p>

          <div className="d-flex gap-3 justify-content-center">
            <div className="card p-3 gap-3 w-50 bg-light">
              <h6>Already have an account?</h6>
              <Link className="btn btn-success" to="/login">
                Log in
              </Link>
            </div>
            <div className="card p-3 gap-3 w-50 bg-light">
              <h6>Register a new account</h6>
              <Link className="btn btn-success" to="/adminRegister">
                As an admin
              </Link>
              <Link className="btn btn-success" to="/reviewerRegister">
                As a reviewer
              </Link>
            </div>
          </div>

          <ul className="justify-content-center d-flex gap-2">
            <li className="d-flex align-items-start"></li>
            <li className="d-flex align-items-start"></li>
          </ul>
        </div>
      </div>
    </div>
  );
  return content;
};

export default Public;
