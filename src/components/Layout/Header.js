import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/userActions';

import { getProfile } from '../../actions/profileActions';
import { SERVER_URL } from '../../actions/types';
import Chat from '../chat/Chat';

class Header extends Component {
    logout() {
        this.props.logout();
    }
    render() {
        const loggedIn = (localStorage.jwtToken ? true : false);
        const image = this.props.user.user &&  this.props.user.user.photo? ( SERVER_URL+ this.props.user.user.photo.split(" ")[0]) : "/images/no-avatar.th.png"
        return (
            <header  >
           
            <div className=" collapse" style={{background:"#155EB6"}} id="navbarHeader" >
              <div className="container" >
                <div className="row">
                  <div className="col-sm-8 col-md-7 py-4">
                    <h4 style={{color:"black"}}>About</h4>
                    <p className="" style={{color:"white"}}>ASK MORE 1.0 is a simple web application build in JAVA SPRING BOOT for the backend and REACTjs for frontend . The idea behind developping this app is to give the student and teachers the opportunity to continue their studying experience outside the school....</p>
                  </div>
                 { loggedIn && <div className="col-sm-1 offset-md-1 py-4 align-center" style={{padding :"0px" ,borderLeft:"1px solid black",borderRight:"1px solid black" , borderBottom:"6px solid black" , backgroundColor:"#181C22"}}>
                  <img alt='' className="rounded-circle" style={{marginBottom:"5px" , border:"solid 2px black"}} src={image} />
                  
                     <ul className="list-unstyled">
                     <li><a href={"/profile/"+this.props.user.user.id+"/1"} className="btn  text-primary underlineHover" style={{marginBottom:"5px" ,width:"100%" , backgroundColor:"black"}}>Profile</a></li>
                     <li><Link to="/profile" className="btn  text-primary underlineHover" style={{marginBottom:"5px" ,width:"100%" , backgroundColor:"black"}}>Mail</Link></li>
                     <li><Link to='' className="btn  text-primary underlineHover" style={{width:"100%" , backgroundColor:"black"}} onClick = {this.logout.bind(this)}>Logout</Link></li>
                     
                    </ul>
                  </div>}
                </div>
              </div>
            </div>
            <div className="navbar   navbar-dark shadow-sm " style={{background:"#155EB6" , borderBottom:"solid 3px black"}}>

            
              <div className="container d-flex justify-content-between">
                <Link to="/" className="navbar-brand d-flex align-items-center">
                <img alt='' src="/images/header-logo.png" />  
                </Link>
             
                <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
              </div>
            </div>
            { loggedIn && <Chat  />}
          </header>
        )
    }
}

const mapStateToProps = state => ({
    user: state.security
});

export default connect(mapStateToProps, { getProfile, logout })(Header);
