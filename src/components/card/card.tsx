import * as React from "react";
import {HashLink as Link} from "react-router-hash-link";
import {getRatingPercentage, FavoriteStatus, AppRoute, AuthorizationStatus} from "../../utils";
import history from "../../history";
import {Offer, CardClass} from "../../types";

interface Props {
  authorizationStatus: string,
  cardClass: CardClass,
  isToggleChecked: boolean,
  offer: Offer,
  onCardTitleClick: (offer: Offer) => void,
  onCardHover: (offer: Offer) => void,
  onFavoriteButtonClick: (newStatus: string, id: string) => void,
  onToggleClick: () => void,
}

const Card: React.FC<Props> = (props: Props) => {
  const {
    authorizationStatus,
    cardClass,
    isToggleChecked,
    offer,
    onCardTitleClick,
    onCardHover,
    onFavoriteButtonClick,
    onToggleClick,
  } = props;

  const {
    id,
    preview,
    title,
    type,
    price,
    isFavorite,
    isPremium,
    rating
  } = offer;

  const {
    articleClass,
    imageClass,
    infoClass,
    imageWidth,
    imageHeight,
  } = cardClass;

  const toggleClass = isToggleChecked ? ` place-card__bookmark-button--active` : ``;
  const newStatus = isFavorite ? FavoriteStatus.NOT_FAVORITE : FavoriteStatus.FAVORITE;

  return (
    <article
      className={articleClass + ` place-card`}
      onMouseOver={() => onCardHover(offer)}
    >
      {isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div> : ``}
      <div className={imageClass + `__image-wrapper place-card__image-wrapper`}>
        <a href="#">
          <img className="place-card__image" src={preview} width={imageWidth} height={imageHeight} alt={title} />
        </a>
      </div>
      <div className={infoClass + `place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button` + toggleClass}
            type="button"
            onClick={() => {
              if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
                history.push(AppRoute.LOGIN);
              } else {
                onFavoriteButtonClick(newStatus, id);
                onToggleClick();
                offer.isFavorite = !offer.isFavorite;
              }
            }}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: getRatingPercentage(rating) + `%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link
            onClick={() => onCardTitleClick(offer)}
            to={`../../offer/${id}/#header`}
          >
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type.charAt(0).toUpperCase() + type.slice(1)}</p>
      </div>
    </article>
  );
};

export default React.memo(Card);
