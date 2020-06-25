import Main from "../main/main.jsx";
import Property from "../property/property.jsx";
import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeOffer: null,
    };
  }

  handleCardTitleClick(offer) {
    this.setState(() => ({
      activeOffer: offer,
    }));
  }

  _renderApp() {
    const {placesCount, offers} = this.props;
    const {activeOffer} = this.state;

    if (!activeOffer) {
      return (
        <Main
          placesCount={placesCount}
          offers={offers}
          onCardTitleClick={(offer) => {
            this.handleCardTitleClick(offer);
          }}
        />
      );
    }

    if (activeOffer) {
      return (
        <Property
          offer={activeOffer}
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
              offer={this.props.offers[0]}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  placesCount: PropTypes.number.isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    pictures: PropTypes.arrayOf(PropTypes.string.isRequired),
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf([`apartment`, `room`, `house`, `hotel`]),
    price: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    description: PropTypes.string,
    bedrooms: PropTypes.number.isRequired,
    guests: PropTypes.number.isRequired,
    features: PropTypes.array,
    owner: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string,
      isSuper: PropTypes.bool.isRequired,
    }),
  }))
  .isRequired
};

export default App;
