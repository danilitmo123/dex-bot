import React from "react";
import useBackendAuth from "hooks/useBackendAuth";

import logo from '../assets/images/logo-d.svg'
import '../assets/styles/pages/_auth.scss'

export default function LoginPage() {
  const {auth, login, password, setLogin, setPassword} = useBackendAuth();

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
              <span>Welcome!</span>
              Login to your account
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                auth();
              }}
              className="form"
            >
              <div className="form__line">
                <label
                  htmlFor="login"
                  className="form__label"
                >
                  Login
                </label>
                <input
                  id="login"
                  className="form__input"
                  type="text"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                />
              </div>
              <div className="form__line">
                <label
                  htmlFor="password"
                  className="form__label"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="form__input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form__bot">
                {/*<Link to="/recover" className="form__link">*/}
                {/*  Forgot password?*/}
                {/*</Link>*/}
                <button
                  type="submit"
                  className="btn-green"
                  disabled={!login || !password}
                >
                  Login now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
