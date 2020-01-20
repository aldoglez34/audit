import React from "react";
import { Dropdown, Nav, NavItem } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import fire from "../firebase/Fire";
import * as userActions from "../redux/actions/userActions";

function UserDropdown() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const logout = () => {
    fire
      .auth()
      .signOut()
      .then(() => dispatch(userActions.deleteUserInfo()))
      .catch(error => console.log(error));
  };

  return (
    <Dropdown as={NavItem}>
      <Dropdown.Toggle
        as={Nav.Link}
        style={{ color: "rgba(255, 255, 255, 0.5)" }}
      >
        <i className="fas fa-user mr-2" />
        {user.name + " " + user.firstSurname}
      </Dropdown.Toggle>
      <Dropdown.Menu
        data-display="static"
        className="dropdown-menu-xs-left dropdown-menu-md-right"
      >
        <Dropdown.Item onClick={logout}>Cerrar sesión</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default UserDropdown;
