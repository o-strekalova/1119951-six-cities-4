import PropTypes from "prop-types";
import React from "react";

const errorMessageStyle = {
  position: `fixed`,
  top: 0,
  right: 0,
  left: 0,
  width: `200px`,
  margin: `auto`,
  padding: `10px 20px`,
  textAlign: `center`,
  backgroundColor: `red`,
  color: `white`,
};

const ErrorMessage = (props) => {
  const {
    errorMessage,
  } = props;

  if (errorMessage) {
    return (
      <div style={errorMessageStyle}>
        {errorMessage}
      </div>
    );
  } else {
    return null;
  }
};

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string,
};

export default React.memo(ErrorMessage);
