import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import { Link, useHistory } from "react-router-dom";
import "./Login.scss";
import { login } from "../../redux/user/actions";
import { useDispatch, useSelector } from "react-redux";
import { makeSelect_isAuthenticated } from '../../redux/user/selectors'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const history = useHistory()

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("submit")
    dispatch(login(email, password));
  };

  const authSelector = useSelector(makeSelect_isAuthenticated)
  useEffect(() => {
    if (authSelector.isAuthenticated) {
      history.goBack()
    }
  }, [authSelector.isAuthenticated])

  return (
    <div className="login-page">
      <Navbar />
      <div className="main with-navbar">
        <div className="container login-container">
          <div className="login-wrapper">
            <h4>Login</h4>
            <form action="" onSubmit={onSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  autoComplete="username"
                  value={email}
                  name="email"
                  className="form-control"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  autoComplete="password"
                  value={password}
                  name="password"
                  className="form-control"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="form-group mb-3 submit-div">
                <button className="btn btn-success btn-block" type="submit">Login</button>
              </div>
              <p>
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
