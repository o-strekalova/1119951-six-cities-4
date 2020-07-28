import PropTypes from "prop-types";
import React, {PureComponent} from 'react';

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: this.props.activeItem,
      };

      this.handleActiveItemChange = this.handleActiveItemChange.bind(this);
    }

    handleActiveItemChange(item) {
      this.setState({
        activeItem: item,
      });
    }

    render() {
      return <Component
        activeItem={this.state.activeItem}
        onActiveItemChange={this.handleActiveItemChange}
        {...this.props}
      />;
    }
  }

  WithActiveItem.propTypes = {
    activeItem: PropTypes.oneOfType([
      PropTypes.shape({
        location: PropTypes.shape({
          lat: PropTypes.number.isRequired,
          long: PropTypes.number.isRequired,
          zoom: PropTypes.number.isRequired,
        }),
        name: PropTypes.string.isRequired,
      }),
      PropTypes.shape({
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
      })
    ]),
    onActiveItemChange: PropTypes.func,
  };

  return WithActiveItem;
};

export default withActiveItem;
