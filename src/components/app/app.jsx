import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import Main from "../main/main.jsx";
import Property from "../property/property.jsx";
import {ActionCreator} from "../../reducer";
import {SortType} from "../../utils";

class App extends PureComponent {
  _renderApp() {
    const {
      activeCity,
      activeOffer,
      activeSort,
      offersAll,
      sortedOffers,
      onCardTitleClick,
      onCityClick,
      onSortClick,
    } = this.props;

    if (!activeOffer) {
      return (
        <Main
          offersAll={offersAll}
          activeCity={activeCity}
          sortedOffers={sortedOffers}
          activeSort={activeSort}
          onCardTitleClick={onCardTitleClick}
          onCityClick={onCityClick}
          onSortClick={onSortClick}
        />
      );
    }

    if (activeOffer) {
      return (
        <Property
          offer={activeOffer}
          onCardTitleClick={onCardTitleClick}
        />
      );
    }

    return null;
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-property">
            <Property
              offer={this.props.sortedOffers[0]}
              onCardTitleClick={this.props.onCardTitleClick}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  offersAll: PropTypes.arrayOf(PropTypes.shape({
    city: PropTypes.string.isRequired,
    offers: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      coords: PropTypes.arrayOf(PropTypes.number.isRequired),
      pictures: PropTypes.arrayOf(PropTypes.string.isRequired),
      title: PropTypes.string.isRequired,
      type: PropTypes.oneOf([`apartment`, `room`, `house`, `hotel`]).isRequired,
      price: PropTypes.number.isRequired,
      isPremium: PropTypes.bool.isRequired,
      rating: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      bedrooms: PropTypes.number.isRequired,
      guests: PropTypes.number.isRequired,
      features: PropTypes.array.isRequired,
      owner: PropTypes.shape({
        avatar: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        isSuper: PropTypes.bool.isRequired,
      }).isRequired,
      reviews: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        avatar: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        date: PropTypes.instanceOf(Date).isRequired,
        text: PropTypes.string.isRequired,
      })).isRequired,
      offersNear: PropTypes.array,
    })).isRequired,
  })).isRequired,
  sortedOffers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    coords: PropTypes.arrayOf(PropTypes.number.isRequired),
    pictures: PropTypes.arrayOf(PropTypes.string.isRequired),
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf([`apartment`, `room`, `house`, `hotel`]).isRequired,
    price: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    bedrooms: PropTypes.number.isRequired,
    guests: PropTypes.number.isRequired,
    features: PropTypes.array.isRequired,
    owner: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      isSuper: PropTypes.bool.isRequired,
    }).isRequired,
    reviews: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
      text: PropTypes.string.isRequired,
    })).isRequired,
  })).isRequired,
  activeOffer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    coords: PropTypes.arrayOf(PropTypes.number.isRequired),
    pictures: PropTypes.arrayOf(PropTypes.string.isRequired),
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf([`apartment`, `room`, `house`, `hotel`]).isRequired,
    price: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    bedrooms: PropTypes.number.isRequired,
    guests: PropTypes.number.isRequired,
    features: PropTypes.array.isRequired,
    owner: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      isSuper: PropTypes.bool.isRequired,
    }).isRequired,
    reviews: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
      text: PropTypes.string.isRequired,
    })).isRequired,
  }),
  activeCity: PropTypes.string.isRequired,
  activeSort: PropTypes.string.isRequired,
  onCardTitleClick: PropTypes.func,
  onCityClick: PropTypes.func,
  onSortClick: PropTypes.func,
};

const mapStateToProps = (state) => ({
  activeCity: state.activeCity,
  activeOffer: state.activeOffer,
  activeSort: state.activeSort,
  offersAll: state.offersAll,
  sortedOffers: state.sortedOffers,
});

const mapDispatchToProps = (dispatch) => ({
  onCardTitleClick(offer) {
    dispatch(ActionCreator.getActiveOffer(offer));
  },
  onCityClick(city) {
    dispatch(ActionCreator.getOffersByCity(city));
    dispatch(ActionCreator.sortOffers(SortType.POPULAR));
  },
  onSortClick(sort) {
    dispatch(ActionCreator.sortOffers(sort));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
