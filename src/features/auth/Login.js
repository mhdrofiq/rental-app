import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios"

const Login = () => {

  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const userRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus(); //puts focus on the username field
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]); //clear error message state when username and password state changes

  const handleEmailInput = (e) => setEmail(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth", JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(res?.data))
      //console.log(username, password);
      const accessToken = res?.data?.accessToken
      const role = res?.data?.role
      const userId = res?.data?.userId
      const fullName = res?.data?.fullName
      setAuth({ 
        email,
        fullName,
        userId, 
        role, 
        accessToken 
      })
      console.log("Login Success")
      setEmail("")
      setPassword("")
      navigate("/dash")
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password")
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthroized or incorrect credentials, please try again")
      } else {
        setErrMsg("Login Failed due to unexpected error")
      }
      //errRef.current.focus();
    }
  };

  let errorMessage;
  if (errMsg) {
    errorMessage = (
      <div
        className={errMsg ? "card mt-4" : "offscreen"}
        aria-live="assertive"
        style={{ backgroundColor: "#ffccd5" }}
      >
        <span className="card-body text-danger">{errMsg}</span>
      </div>
    );
  } else {
    errorMessage = null;
  }

  const content = (
    <>
      <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
        <div className="p-4 card" style={{ width: "400px" }}>
          <form className="card-body" onSubmit={handleSubmit}>
            <h2 className="mono-text mt-4">Login</h2>

            {errorMessage}

            <div className="form-floating mt-4">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                ref={userRef}
                value={email}
                placeholder="some-email"
                onChange={handleEmailInput}
                autoComplete="off"
                required
              />
              <label
                className="form-label text-secondary"
                htmlFor="floatingInput"
              >
                Email Address
              </label>
            </div>

            <div className="form-floating mt-3">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="some-password"
                value={password}
                onChange={handlePwdInput}
                autoComplete="off"
                required
              />
              <label
                className="form-label text-secondary"
                htmlFor="floatingPassword"
              >
                Password
              </label>
            </div>

            <button className="w-100 btn btn-lg btn-success mt-3" type="submit">
              Sign in
            </button>

          </form>
        </div>
      </div>
    </>
  );
  return content;
};

export default Login;
