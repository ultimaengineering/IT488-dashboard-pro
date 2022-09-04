/*eslint-disable*/
import React from "react";
import { Container, Row } from "reactstrap";
// used for making the prop types of this component
import PropTypes from "prop-types";

const Footer = (props) => {
  return (
    <footer className={"footer" + (props.default ? " footer-default" : "")}>
      <Container fluid={props.fluid ? true : false}>
        <div className="copyright">
          © {new Date().getFullYear()} made with {" "}
          <i className="tim-icons icon-heart-2" /> by{" "}
          <a href="https://www.linkedin.com/in/alexander-montgomery-06a75584/" target="_blank">
            Developer
          </a>{" "}
        </div>
      </Container>
    </footer>
  );
};

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool
};

export default Footer;
