import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faHouse,
  faMugHot,
} from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  return (
    <Navbar bg="warning" variant="light" className="mt-4 mb-4 rounded">
      <div className="container">
        <Navbar.Brand href="/">
          <FontAwesomeIcon icon={faMugHot} size="xl" className="me-2" />
          coffee shop
        </Navbar.Brand>
        <Nav className="me-0 d-flex flex-row">
          <Nav.Link as={NavLink} to="/">
            <FontAwesomeIcon icon={faHouse} size="lg" />
          </Nav.Link>
          <Nav.Link as={NavLink} to="/cart">
            <FontAwesomeIcon icon={faCartShopping} size="lg" />
          </Nav.Link>
        </Nav>
      </div>
    </Navbar>
  );
};

export default NavBar;
