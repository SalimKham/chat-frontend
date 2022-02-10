import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/userActions';
import CropPhoto from "../utils/CropPhoto";
export class Landing extends Component {
  logout() {
    this.props.logout()
}
  render() {
    const loggedIn = (localStorage.jwtToken ? true : false);

    return (
      <div>
   
      <div class="wrapper fadeInDown">
            <h4 className="bold">Welcome to Chat website</h4>
              
          {loggedIn && <span><em class="margin font18" style={{ lineHeight: "32px" , color:'#BA3D07'}}> You Are now logged in.</em><Link to="" className="btn bg-dark text-white " onClick={this.logout.bind(this)}>Logout</Link></span> }
            <br />
          {loggedIn && <div> 
          <div id="accordion-avatar" >
                                    <CropPhoto />
                                </div>
          </div>
          }
            <br /><br />
           
            {!loggedIn && <div className="input-groupe btn align-center">
            <Link to="/login" className="btn bg-dark text-white ">Login</Link>
            <Link to="/Register" className="btn btn-success" style={{backgroundColor:'#BA3D07'}}>SignUp</Link>
            </div>}
            


                

          
        </div>

      </div>
    )
  }
}
const mapStateToProps = state => ({
  user: state.security
});

export default connect(mapStateToProps, { logout })(Landing);