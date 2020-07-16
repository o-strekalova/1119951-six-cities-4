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
        {...this.props}
        activeItem={this.state.activeItem}
        onActiveItemChange={this.handleActiveItemChange}
      />;
    }
  }

  WithActiveItem.propTypes = {
    activeItem: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
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
    ]),
    onActiveItemChange: PropTypes.func,
  };

  return WithActiveItem;
};

export default withActiveItem;
