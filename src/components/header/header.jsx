import PropTypes from "prop-types";
import React from "react";
import {AuthorizationStatus} from "../../reducer/user/user";

const Header = (props) => {
  const {
    login,
    authorizationStatus,
  } = props;

  const isAuthorized = authorizationStatus === AuthorizationStatus.AUTH;
  const logoLinkClass = isAuthorized ? `header__logo-link--active` : ``;

  const headerUserName = isAuthorized ?
    <span
      className="header__user-name user__name">
      {login}
    </span> :
    <span
      className="header__login">
        Sign in
    </span>;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className={`header__logo-link` + logoLinkClass}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </a>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <a className="header__nav-link header__nav-link--profile" href="#">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  {headerUserName}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
};

export default React.memo(Header);
