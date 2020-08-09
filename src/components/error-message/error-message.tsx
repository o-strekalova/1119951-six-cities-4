import * as React from "react";

interface Props {
  errorMessage: string | null,
}

const errorMessageStyle: React.CSSProperties = {
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

const ErrorMessage: React.FC<Props> = (props: Props) => {
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

export default React.memo(ErrorMessage);
