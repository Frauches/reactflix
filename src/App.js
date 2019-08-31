import React, { useState } from 'react';
import {
  Navbar, NavbarBrand, NavItem,
  Nav, NavLink, NavbarToggler, Collapse
} from 'reactstrap';

function App() {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  }

  return (
    <div className="App">
      <Navbar light color="light" expand="md">
        <NavbarBrand>Reactflix</NavbarBrand>
        <NavbarToggler onClick={handleToggle}/>
        <Collapse isOpen={open} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink>Gêneros</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default App;
