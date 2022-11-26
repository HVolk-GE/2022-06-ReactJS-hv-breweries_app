import React, { useEffect } from "react";
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Nav, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    sessionStorage.setItem("10-barrel-brewing-co-bend-2", JSON.stringify({ "id": "10-barrel-brewing-co-bend-2", "name": "10 Barrel Brewing Co", "rating": "360" }))
    sessionStorage.setItem("10-56-brewing-company-knox", JSON.stringify({ "id": "10-56-brewing-company-knox", "name": "10-56 Brewing Company", "rating": "280" }))
    sessionStorage.setItem("105-west-brewing-co-castle-rock", JSON.stringify({ "id": "105-west-brewing-co-castle-rock", "name": "105 West Brewing Co", "rating": "240" }))

    useEffect(() => {
        const url = 'http://127.0.0.1:3128/load'
        fetch(url).then(res => res.json()).then(data => {
            dispatch({
                type: 'LOAD_USER_JSON',
                data
            })
        })
            .catch(console.error)
    }, [])


    function refreshPage() {
        dispatch({
            type: 'SET_RENDERS',
            rendners: 1,
        })
    }

    function backToHome() {
        navigate('/');
    }

    const currentUser = useSelector(state => state.currentUser)

    return (
        <div>
            <Container fluid>
                <Navbar bg="dark" variant={"dark"} expand="sm" fixed='top'>
                    <Navbar.Brand href="#">Navbar Brewer</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="mr-auto my-2 my-lg-0"
                            style={{ maxHeight: '200px' }}
                            navbarScroll
                        >
                            <Nav.Link as={Link} to="/" >Home</Nav.Link>
                            <Nav.Link as={Link} to="/breweries" onClick={refreshPage}>Breweries</Nav.Link>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/logout" onClick={backToHome}>Logout</Nav.Link>
                            <Nav.Link as={Link} to="/about">About</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        </div>
    )
}

export default NavBar