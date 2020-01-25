import React from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import PropTypes from "prop-types";

const HelpTooltip = React.memo(function HelpTooltip(props) {
  return (
    <OverlayTrigger
      //   trigger="click"
      placement="left"
      overlay={
        <Popover>
          <Popover.Title as="h3">{props.title}</Popover.Title>
          <Popover.Content>{props.text}</Popover.Content>
        </Popover>
      }
    >
      <span style={{ cursor: "pointer" }}>
        <i
          className="fas fa-question-circle ml-1"
          style={{ fontSize: "30px", color: "#5979e3" }}
        />
      </span>
    </OverlayTrigger>
  );
});

HelpTooltip.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default HelpTooltip;
