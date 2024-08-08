/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, Container } from 'react-bootstrap';
import Link from 'next/link';

function NavBar() {
  return (
    <>
      <Navbar color="dark" style={{ background: '#A9A9A9', font: 'bold' }} collapseOnSelect expand="lg">
        <Container>
          <Nav navbar>
            <Link passHref href="/">
              <Navbar.Brand>Rare Publishing</Navbar.Brand>
            </Link>
            <Link passHref href="/posts/posts">
              <Nav.Link>Posts</Nav.Link>
            </Link>
            <Link passHref href="/users">
              <Nav.Link>Users</Nav.Link>
            </Link>
            <Link passHref href="/categories">
              <Nav.Link>Categories</Nav.Link>
            </Link>
            <Link passHref href="/tags">
              <Nav.Link>Tags</Nav.Link>
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
