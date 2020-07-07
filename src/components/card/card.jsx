import PropTypes from "prop-types";
import React from "react";
import {getRatingPercentage} from "../../utils";

const Card = (props) => {
  const {
    className,
    offer,
    onCardTitleClick,
    onCardHover
  } = props;

  const {pictures, title, type, price, isPremium, rating} = offer;

  return (
    <article
      className={className + ` place-card`}
      onMouseOver={() => {
        onCardHover(offer);
      }}
    >
      {isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div> : ``}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={pictures[0]} width="260" height="200" alt={title} />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
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
        <h2
          className="place-card__name"
          onClick={() => {
            onCardTitleClick(offer);
          }}
        >
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{type.charAt(0).toUpperCase() + type.slice(1)}</p>
      </div>
    </article>
  );
};

Card.propTypes = {
  className: PropTypes.string.isRequired,
  offer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    coords: PropTypes.arrayOf(PropTypes.number.isRequired),
    pictures: PropTypes.arrayOf(PropTypes.string.isRequired),
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf([`apartment`, `room`, `house`, `hotel`]).isRequired,
    price: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    description: PropTypes.string,
    bedrooms: PropTypes.number.isRequired,
    guests: PropTypes.number.isRequired,
    features: PropTypes.array.isRequired,
    owner: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      isSuper: PropTypes.bool.isRequired,
    }),
  })
  .isRequired,
  onCardTitleClick: PropTypes.func,
  onCardHover: PropTypes.func,
};

export default Card;
