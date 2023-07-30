import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHouse } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  return (
    <Navbar bg="primary" variant="dark" className="mt-4 mb-4 rounded">
      <div className="container">
        <Navbar.Brand href="/">myShopApp</Navbar.Brand>
        <Nav className="me-auto row justify-content-end">
          <Nav.Link as={NavLink} to="/">
            <FontAwesomeIcon icon={faHouse} size="lg" className="mr-1" />
          </Nav.Link>
          <Nav.Link as={NavLink} to="/cart">
            <FontAwesomeIcon icon={faCartShopping} size="lg" className="mr-2" />
          </Nav.Link>
        </Nav>
      </div>
    </Navbar>
  );
};

export default NavBar;
