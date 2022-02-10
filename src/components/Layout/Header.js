import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/userActions';

import Chat from '../chat/Chat';

class Header extends Component {
    logout() {
        this.props.logout();
    }
    render() {
      const loggedIn = (localStorage.jwtToken ? true : false);
        
        return (
            <header  >
           
            
            <div className="navbar   navbar-dark shadow-sm ">

            
              <div className="container d-flex justify-content-between" style={{width:'220px',height:'200px'}}>
                <Link to="/" className="navbar-brand d-flex align-items-center">
                <img  style={{height:'200px'}} alt='' src="/images/header-logo.png" />  
                </Link>
                
              </div>
            </div>
            {  loggedIn && <Chat  />}
          </header>
        )
    }
}

const mapStateToProps = state => ({
    user: state.security
});

export default connect(mapStateToProps, { logout })(Header);
