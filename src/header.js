
import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Header(props) {
  const navigate = useNavigate();

  const logoutHandler = () => {
    props.setToken("");
    props.setUsername("");
    window.localStorage.removeItem("Token");
    window.localStorage.removeItem("User");
    window.localStorage.removeItem("posttitle");
    window.localStorage.removeItem("postdesc");
    window.localStorage.removeItem("postauthor");
    window.localStorage.removeItem("postlocation");
    window.localStorage.removeItem("postprice");
    window.localStorage.removeItem("postid");
    window.localStorage.removeItem("postmessage");
    window.localStorage.removeItem("postwilldeliver");

    setTimeout(()=>{
      navigate('/');
    }, 1000);
  }

  
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#">Stanger's Things</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link eventKey={2} href="/posts">Posts</Nav.Link>
            {props.token !== '' && props.token !== null ? <Nav.Link eventKey={3} href="/profile">Profile</Nav.Link> : null}
            {props.token === '' || props.token === null ? <Nav.Link eventKey={4} href="/account/login">Login</Nav.Link> : <Nav.Link eventKey={4} onClick={logoutHandler}>Logout</Nav.Link>}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;






