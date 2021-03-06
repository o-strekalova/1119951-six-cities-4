import * as React from "react";
import {Link} from "react-router-dom";
import {AppRoute, AuthorizationStatus} from "../../utils";
import {AuthInfo} from "../../types";

interface Props {
  authInfo?: AuthInfo | null,
  authorizationStatus: string,
  onUserNameClick?: () => void,
}

const Header: React.FC<Props> = (props: Props) => {
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
    <header className="header" id="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              className={`header__logo-link` + logoLinkClass}
              to={AppRoute.MAIN}
            >
              <img className="header__logo" src={`../../img/logo.svg`} alt="6 cities logo" width="81" height="41" />
            </Link>
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

export default React.memo(Header);
