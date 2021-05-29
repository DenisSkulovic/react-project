import React, { useState, useEffect } from "react";
import "./ChangePassword.scss";
import Navbar from "../../../components/navbar/Navbar";
import { Link, useHistory } from "react-router-dom";
import { change_password } from "../../../redux/user/actions";
import { useDispatch, useSelector } from "react-redux";

export default function ChangePassword() {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const history = useHistory();

  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(change_password(email, oldPassword, newPassword));
  };

  useEffect(() => {
    if (window.sessionStorage.getItem("password_change_success") === "true") {
      window.sessionStorage.removeItem("password_change_success");
      history.goBack();
    }
  }, []);

  return (
    <div className="change-password-page">
      <Navbar />
      <div className="main with-navbar">
        <div className="container change-password-container">
          <div className="change-password-wrapper">
            <h4>Change Password</h4>
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
                <label htmlFor="email">Old Password</label>
                <input
                  type="password"
                  className="form-control"
                  autoComplete="off"
                  value={oldPassword}
                  onChange={(e) => {
                    setOldPassword(e.target.value);
                  }}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="email">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  autoComplete="off"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
              </div>
              <div className="form-group submit-div">
                <button className="btn btn-success btn-block" type="submit">
                  Change Password
                </button>
              </div>
              <p>
                Create a new account instead?{" "}
                <Link to="/register">Register</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
