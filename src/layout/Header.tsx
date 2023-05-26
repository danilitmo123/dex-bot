import React, {FC} from "react";
import {Link, useLocation} from "react-router-dom";

import logo from "../assets/images/logo-d.svg";

import "../assets/styles/components/_header.scss";
import "../assets/styles/components/_forms.scss";

const PageHeader: FC = () => {
  const location = useLocation();
  const [menu, setMenu] = React.useState(false);

  const toggleMenu = () => {
    setMenu(!menu)
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrap between">
          <Link to="/" className="header__logo">
            <img src={logo} alt="img"/>
          </Link>
          <div className="header__right">
            <div className={`r-wrap ${menu ? 'open' : ''}`}>
              <span className="header__email">mmpro@mail.com</span>
              <div className="lng-switcher">
                <div className="lng-switcher__btn">
                  ENG
                  <i className="icon-drop-arrow"></i>
                </div>
              </div>
              <button type="button" className="gray-btn">
                <i className="icon-user"></i>
                <span>Bot Profiles</span>
              </button>
              <button className="btn-border">
                <i className="icon-link"></i>
                <span>Log Out</span>
              </button>
            </div>
            <div className="mob">
              <div
                className={`mob-btn ${menu ? 'open' : ''}`}
                onClick={toggleMenu}
              >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
          {/*<nav className="navbar navbar-expand-lg bg-light">*/}
          {/*  <div className="container">*/}
          {/*    <button*/}
          {/*      className="navbar-toggler"*/}
          {/*      type="button"*/}
          {/*      onClick={() => setMenu(!menu)}*/}
          {/*    >*/}
          {/*      <span className="navbar-toggler-icon"></span>*/}
          {/*    </button>*/}
          {/*    <div*/}
          {/*      className={*/}
          {/*        menu*/}
          {/*          ? "collapse navbar-collapse show"*/}
          {/*          : "collapse navbar-collapse"*/}
          {/*      }*/}
          {/*      id="navbarSupportedContent"*/}
          {/*    >*/}
          {/*      <ul className="navbar-nav me-auto mb-lg-0 mb-2">*/}
          {/*        <li className="nav-item">*/}
          {/*          <Link*/}
          {/*            to="/"*/}
          {/*            className={*/}
          {/*              location.pathname === "/" ? "nav-link active" : "nav-link"*/}
          {/*            }*/}
          {/*          >*/}
          {/*            Main*/}
          {/*          </Link>*/}
          {/*        </li>*/}
          {/*        <li className="nav-item">*/}
          {/*          <Link*/}
          {/*            to="/profiles"*/}
          {/*            className={*/}
          {/*              location.pathname === "/profiles"*/}
          {/*                ? "nav-link active"*/}
          {/*                : "nav-link"*/}
          {/*            }*/}
          {/*          >*/}
          {/*            Profiles*/}
          {/*          </Link>*/}
          {/*        </li>*/}
          {/*      </ul>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</nav>*/}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
