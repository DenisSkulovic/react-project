import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { Link, useHistory } from "react-router-dom";
import "./Login.scss";
import { login } from "../../redux/user/actions";
import { useDispatch, useSelector } from "react-redux";
import { makeSelect_isAuthenticated } from "../../redux/user/selectors";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authStatusSelector = useSelector(makeSelect_isAuthenticated);
  const history = useHistory();

  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  if (authStatusSelector.isAuthenticated) {
    history.goBack();
  }

  return (
    <>
      <Navbar />
      <div className="main with-navbar">
        <div className="container">
          <h4>Login</h4>
          <form action="" onSubmit={onSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                console.log("e.target.value", e.target.value);
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => {
                console.log("e.target.value", e.target.value);
                setPassword(e.target.value);
              }}
            />
            <button type="submit">Login</button>
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
