import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import axios from '../../api/axios';

const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const ReviewerRegister = () => {;
  const errRef = useRef();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    //checks regex everytime password is modified
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    //checks regex everytime password is modified
    setValidMatch(password === matchPwd);
  }, [password, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [password, matchPwd]);

  const onFullNameChanged = (e) => setFullName(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onMatchPwdChanged = (e) => setMatchPwd(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const userObject = {
        fullName,
        password,
        email,
        role: "Reviewer"
      }
      const res = await axios.post("/auth/reviewerRegister", userObject,
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })
      console.log(JSON.stringify(res?.data));
      setSuccess(true);
      setFullName("");
      setEmail("");
      setPassword("");
      setMatchPwd("");
    } catch(err){
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('This username is already taken.');
      } else {
        setErrMsg('Registration Failed')
      }
    }
  };

  let errorMessage;
  if (errMsg) {
    errorMessage = (
      <div
        ref={errRef}
        className={errMsg ? "card mt-4" : "offscreen"}
        aria-live="assertive"
        style={{ backgroundColor: "#ffccd5" }}
      >
        <span className="card-body text-danger"><i class="bi bi-exclamation-triangle"></i> {errMsg}</span>
      </div>
    );
  } else {
    errorMessage = null;
  }

  const content = (
    <>
      <div className="d-flex align-items-center bg-light d-flex flex-column min-vh-100">
        <div className="p-4 card my-4" style={{ width: "500px" }}>
          <h2 className="mono-text ms-3">Create your reviewer account</h2>
          <div className="card-body">

            {success ? (

              <div
                className={success ? "card my-3" : "offscreen"}
                aria-live="assertive"
                style={{ backgroundColor: "#c1fba4" }}
              >
                <div className="card-body">
                  <span className="text-success">
                    Your account was successfully created. Click here to go to the
                    Sign in page
                  </span>
                  <div className="mt-3">
                    <Link to="/login" className="btn btn-outline-success">Sign in</Link>
                  </div>
                </div>
              </div>

            ) : (

              <form onSubmit={handleSubmit}>

                <div className="form-floating mt-1">
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    placeholder="some-name"
                    autoComplete="off"
                    value={fullName}
                    onChange={onFullNameChanged}
                    required
                  />
                  <label
                    className="form-label text-secondary"
                    htmlFor="floatingInput"
                  >
                    Full Name
                  </label>
                </div>

                <div className="form-floating mt-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="some-email"
                    autoComplete="off"
                    value={email}
                    onChange={onEmailChanged}
                    required
                  />
                  <label
                    className="form-label text-secondary"
                    htmlFor="floatingInput"
                  >
                    Email
                  </label>
                </div>

                <div className="rounded text-bg-light d-flex flex-row gap-2 px-3 py-2 text-secondary mt-4">
                  <i className="bi bi-info-circle text-secondary"></i>
                  Only letters, numbers, or symbols allowed, must have 4-12
                  characters, and contain no spaces.
                </div>
                <div className="form-floating mt-1">
                  <input
                    type="password"
                    className={
                      validPassword ? "form-control" : "form-control is-invalid"
                    }
                    id="password"
                    placeholder="some-password"
                    autoComplete="off"
                    onChange={onPasswordChanged}
                    required
                  />
                  <label
                    className="form-label text-secondary"
                    htmlFor="password"
                  >
                    Password
                  </label>
                </div>

                <div className="form-floating mt-3">
                  <input
                    type="password"
                    className={
                      validMatch ? "form-control" : "form-control is-invalid"
                    }
                    id="matchPassword"
                    placeholder="some-password"
                    autoComplete="off"
                    onChange={onMatchPwdChanged}
                    required
                  />
                  <label
                    className="form-label text-secondary"
                    htmlFor="matchPassword"
                  >
                    Confirm Password
                  </label>
                </div>

                {errorMessage}

                <button
                  className="w-100 btn btn-lg btn-success mt-5"
                  type="submit"
                >
                  Sign up
                </button>

                <div className="text-center my-3">
                  <span className="text-secondary">
                    Already have an account? <Link to="/login">Sign in</Link>
                  </span>
                </div>
              </form>

            )}

          </div>
        </div>
      </div>
    </>
  );

  return content;
};

export default ReviewerRegister;
