import React, { Component, Fragment } from "react"
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';
import LoginModal from './auth/LoginModal';

class AppNavbar extends Component {
    state = {
        isOpen: false
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    toogle = () =>{
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render(){

        const { isAuthenticated, user } = this.props.auth;

        const authLinks =  (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-auto"></span>
                    <strong className="text-secondary">{ user ? `Welcome ${user.fname}` : ''}</strong>
                </NavItem>
                <NavItem>
                    <Logout />
                </NavItem>
            </Fragment>
        )

        const guessLinks = (
            <Fragment>
                 <NavItem>
                    <RegisterModal />
                </NavItem>                     
                <NavItem>
                    <LoginModal />
                </NavItem>
            </Fragment>
        )
        return(
        <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
                <Container>
                    <NavbarBrand href="/">
                        DOST AST - COVID-19 DB
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toogle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {isAuthenticated ? authLinks : guessLinks}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
        )
    }
}



const mapStateToProps = state => ({
    auth:state.auth
})
export default connect(mapStateToProps, null)(AppNavbar);