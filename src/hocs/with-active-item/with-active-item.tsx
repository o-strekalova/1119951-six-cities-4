import * as React from "react";
import {Subtract} from "utility-types";
import {Offer, City} from "../../types";

interface State {
  activeItem: Offer | City;
}

interface InjectingProps {
  activeItem: Offer | City,
  onActiveItemChange: (item: Offer | City) => void,
}

const withActiveItem = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithActiveItem extends React.PureComponent<T, State> {
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

  return WithActiveItem;
};

export default withActiveItem;
