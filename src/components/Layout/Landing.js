import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Landing extends Component {
  render() {
    const loggedIn = (localStorage.jwtToken ? true : false);
    return (
      <div>
   
      <div class="wrapper fadeInDown">
            <h4 className="bold">Welcome</h4>
            <p class="margin font22">Welcome to Ask More website</p>
            <em class="margin font18" style={{ lineHeight: "32px" }}> You Are One step a head.</em>
            <br />
            
            <br /><br />

            {!loggedIn && <div className="input-groupe btn align-center">
            <Link to="/login" className="btn bg-dark text-white ">Login</Link>
            <Link to="/Register" className="btn btn-success">SignUp</Link>
            </div>}
            {loggedIn && <div className="input-groupe btn align-center">
            <Link to="/tutorials" className="btn bg-dark text-white ">Go To Tutorials</Link>
            </div>}


                

          
        </div>

      </div>
    )
  }
}
