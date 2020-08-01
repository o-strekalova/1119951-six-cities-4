import PropTypes from "prop-types";
import React, {PureComponent} from 'react';

const withToggle = (Component) => {
  class WithToggle extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isChecked: this.props.offer.isFavorite,
      };

      this.handleToggleChange = this.handleToggleChange.bind(this);
    }

    handleToggleChange() {
      this.setState((prevState) => ({
        isChecked: !prevState.isChecked,
      }));
    }

    render() {
      return <Component
        isToggleChecked={this.state.isChecked}
        onToggleClick={this.handleToggleChange}
        {...this.props}
      />;
    }
  }

  WithToggle.propTypes = {
    offer: PropTypes.shape({
      id: PropTypes.string.isRequired,
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
    })
  };

  return WithToggle;
};

export default withToggle;
