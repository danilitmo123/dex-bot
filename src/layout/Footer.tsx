import React, {FC} from "react";

import logo from '../assets/images/logo-m.svg'
import '../assets/styles/components/_footer.scss'

const PageFooter: FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrap between">
          <div className="footer__left">
            <figure className="footer__logo">
              <img src={logo} alt="logo"/>
            </figure>
            <span>Copyright © {new Date().getFullYear()}</span>
          </div>
          <ul className="soc">
            <li className="soc__it">
              <a href="">
                <i className="icon-Facebook"></i>
              </a>
            </li>
            <li className="soc__it">
              <a href="">
                <i className="icon-Twitter"></i>
              </a>
            </li>
            <li className="soc__it">
              <a href="">
                <i className="icon-Instagram"></i>
              </a>
            </li>
            <li className="soc__it">
              <a href="">
                <i className="icon-LinkedIn"></i>
              </a>
            </li>
            <li className="soc__it">
              <a href="">
                <i className="icon-YouTube"></i>
              </a>
            </li>
          </ul>

          <div className="policy">

            <span className="policy__it">
              All Rights Reserved
              <i>|</i>
            </span>
            <a href="" className="policy__link">
              Terms and Conditions
              <i>|</i>
            </a>
            <a href="" className="policy__link">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PageFooter;
