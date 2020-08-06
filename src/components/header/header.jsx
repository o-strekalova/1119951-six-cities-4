import PropTypes from "prop-types";
import React from "react";
import {Link} from "react-router-dom";
import {AppRoute, AuthorizationStatus} from "../../utils";
import history from "../../history";

const Header = (props) => {
  const {
    authInfo,
    authorizationStatus,
    onUserNameClick,
  } = props;

  const isAuthorized = authorizationStatus === AuthorizationStatus.AUTH;
  const logoLinkClass = isAuthorized ? `header__logo-link--active` : ``;

  const headerUserName = isAuthorized ?
    <Link
      className="header__user-name user__name"
      onClick={onUserNameClick}
      to={AppRoute.FAVORITES}
    >
      {authInfo.email}
    </Link> :
    <Link
      className="header__login"
      to={AppRoute.LOGIN}
    >
        Sign in
    </Link>;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a
              className={`header__logo-link` + logoLinkClass}
              onClick={() => history.push(AppRoute.MAIN)}
            >
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </a>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <span className="header__nav-link header__nav-link--profile">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  {headerUserName}
                </span>
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
  authInfo: PropTypes.shape({
    avatar: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.number,
    isSuper: PropTypes.bool,
    name: PropTypes.string,
  }),
  onUserNameClick: PropTypes.func,
};

export default React.memo(Header);
