import React from "react";
import logo from "../assets/images/logo-d.svg";
import {Link} from "react-router-dom";

export default function RecoverPassword() {
  return (
    <div className="auth">
      <div className="container">
        <div className="auth__wrap">
          <div className="auth__top">
            <figure className="auth__logo">
              <img src={logo} alt="logo"/>
            </figure>
          </div>
          <div className="auth__content">
            <div className="auth__title">
              Recover Password
              <span
                className="gray">Enter the email address you used to register and <br/> we’ll send you the instruction.</span>
            </div>
            <form
              className="form"
            >
              <div className="form__line">
                <label
                  htmlFor="email"
                  className="form__label"
                >
                  Email
                </label>
                <input
                  id="email"
                  className="form__input"
                  type="email"
                />
              </div>
              <div className="form__bot">
                <button
                  type="submit"
                  className="btn-green"
                >
                  Reset password
                </button>
                <Link to="/login" className="green-link">
                  <i className="icon-arrow-left"></i>
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
