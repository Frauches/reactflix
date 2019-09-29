import React, { useState } from 'react';
import {
  Navbar, NavbarBrand, NavItem,
  Nav, NavLink, NavbarToggler, Collapse
} from 'reactstrap';
import { Link } from 'react-router-dom';


function Header() {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  }

  return (
    <Navbar className="container" light color='light' expand='md'>
      <NavbarBrand tag={Link} to='/'>Reactflix</NavbarBrand>
      <NavbarToggler onClick={handleToggle} />
      <Collapse isOpen={open} navbar>
        <Nav className='ml-auto' navbar>
          <NavItem>
            <NavLink tag={Link} to='/series'>Series</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to='/genres'>Genres</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  )
}

export default Header;