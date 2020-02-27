import React from "react";
import { Alert, Image } from "react-bootstrap";
import PropTypes from "prop-types";

const ReportTitle = React.memo(({ title, description }) => {
  return (
    <>
      <h2>{title}</h2>
      <hr className="myDivider" />
      <br />
      <Alert variant="info" style={{ fontSize: "18px" }}>
        <Image
          src="/images/warning.png"
          width="45px"
          height="45px"
          className="mr-3"
        />
        {description}
      </Alert>
    </>
  );
});

ReportTitle.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default ReportTitle;
