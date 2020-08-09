import * as React from "react";
import {Subtract} from "utility-types";

interface State {
  isChecked: boolean;
}

interface InjectingProps {
  isToggleChecked: boolean
  onToggleClick: () => void,
}

const withToggle = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithToggle extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        isChecked: this.props.isToggleChecked,
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
        {...this.props}
        isToggleChecked={this.state.isChecked}
        onToggleClick={this.handleToggleChange}
      />;
    }
  }

  return WithToggle;
};

export default withToggle;
