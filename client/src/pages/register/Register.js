import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./Register.scss";
import { Link, useHistory } from "react-router-dom";
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
    if (password == password2) {
      dispatch(register(email, password));
    }
  };

  if (authStatusSelector.isAuthenticated) {
    history.goBack();
  }

  return (
    <>
      <Navbar />
      <div className="main with-navbar">
        <div className="container">
          <h4>Register</h4>
          <form action="" onSubmit={onSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              type="password"
              value={password2}
              onChange={(e) => {
                setPassword2(e.target.value);
              }}
            />
            <button type="submit">Register</button>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
