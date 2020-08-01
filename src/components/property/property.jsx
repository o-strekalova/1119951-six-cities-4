import PropTypes from "prop-types";
import React from "react";
import CardsList from "../cards-list/cards-list.jsx";
import ErrorMessage from "../error-message/error-message.jsx";
import Header from "../header/header.jsx";
import Map from "../map/map.jsx";
import ReviewsList from "../reviews-list/reviews-list.jsx";
import ReviewForm from "../review-form/review-form.jsx";
import {CardsListClass, getRatingPercentage} from "../../utils";
import {AuthorizationStatus} from "../../reducer/user/user";

const MAX_PICTURES_COUNT = 6;
const MAX_OFFERS_NEAR_COUNT = 3;

const Property = (props) => {
  const {
    offer,
    onCardTitleClick,
    login,
    authorizationStatus,
    errorMessage,
    onReviewSubmit,
  } = props;

  const {
    id,
    pictures,
    title,
    type,
    price,
    isPremium,
    rating,
    description,
    bedrooms,
    guests,
    features,
    owner
  } = offer;

  const reviews = [];
  const offersNear = [];
  const picturesShown = pictures.length <= MAX_PICTURES_COUNT ? pictures : pictures.slice(0, MAX_PICTURES_COUNT);
  const offersNearShown = offersNear.length <= MAX_OFFERS_NEAR_COUNT ? offersNear : offersNear.slice(0, MAX_OFFERS_NEAR_COUNT);

  const renderReviewForm = () => {
    if (authorizationStatus === AuthorizationStatus.AUTH) {
      return (
        <ReviewForm
          onSubmit={onReviewSubmit}
          id={id}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <div className="page">
      <Header
        login={login}
        authorizationStatus={authorizationStatus}
      />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {picturesShown.map((picture, i) => {
                return (
                  <div className="property__image-wrapper" key={title + i}>
                    <img className="property__image" src={picture} alt={title} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium ? <div className="property__mark">
                <span>Premium</span>
              </div> : ``}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: getRatingPercentage(rating) + `%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {guests} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {features.map((feature, i) => {
                    return (
                      <li className="property__inside-item" key={feature + i}>
                        {feature}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={
                    owner.isSuper ? `property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper` :
                      `property__avatar-wrapper user__avatar-wrapper`
                  }>
                    <img className="property__avatar user__avatar" src={owner.avatar} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {owner.name}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <ReviewsList
                  reviews={reviews}
                />
                {renderReviewForm()}
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map
              activePin={offer}
              centerLat={offer.location.lat}
              centerLong={offer.location.long}
              zoom={offer.location.zoom}
              offers={[]}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <CardsList
              className={CardsListClass.PROPERTY}
              offers={offersNearShown}
              onCardHover={() => {}}
              onCardTitleClick={onCardTitleClick}
            />
          </section>
        </div>
      </main>
      <ErrorMessage
        errorMessage={errorMessage}
      />
    </div>
  );
};

Property.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  offer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    pictures: PropTypes.arrayOf(PropTypes.string.isRequired),
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf([`apartment`, `room`, `house`, `hotel`]).isRequired,
    price: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    bedrooms: PropTypes.number.isRequired,
    guests: PropTypes.number.isRequired,
    features: PropTypes.array.isRequired,
    preview: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      isSuper: PropTypes.bool.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
    city: PropTypes.shape({
      location: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        long: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired,
      }),
      name: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      long: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  onCardTitleClick: PropTypes.func,
  onReviewSubmit: PropTypes.func,
};

export default React.memo(Property);
