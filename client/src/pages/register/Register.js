import React, { useState } from "react";
import "./Register.scss";
import { Link, useHistory, Redirect } from "react-router-dom";
import { register } from "../../redux/user/actions";
import { useDispatch, useSelector } from "react-redux";
import { makeSelect_isAuthenticated } from "../../redux/user/selectors";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const authStatusSelector = useSelector(makeSelect_isAuthenticated);
  const history = useHistory();

  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password === password2) {
      dispatch(register(email, password));
    } else {
      alert("Passwords do not match.");
    }
  };

  if (authStatusSelector.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="register-page">
      <div className="main with-navbar">
        <div className="container register-container">
          <div className="register-wrapper">
            <h4>Register</h4>
            <form action="" onSubmit={onSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="email">Password</label>
                <input
                  type="password"
                  className="form-control"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="email">Repeat Password</label>
                <input
                  type="password"
                  className="form-control"
                  autoComplete="off"
                  value={password2}
                  onChange={(e) => {
                    setPassword2(e.target.value);
                  }}
                />
              </div>
              <div className="form-group submit-div">
                <button className="btn btn-success btn-block" type="submit">
                  Register
                </button>
              </div>
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
