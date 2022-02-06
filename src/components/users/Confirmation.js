import React, { Component } from 'react';
import {connect} from 'react-redux';
import Proptypes from "prop-types";
import {confirm} from '../../actions/userActions';
import {Link} from 'react-router-dom'
 class Confirmation extends Component {

    constructor(props){
        super(props);
        const  user_id = this.props.match.params.id;
        this.state = {
            code:"",
            errors : {},
            id:user_id
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        
        this.setState({[e.target.name] : e.target.value , errors : {}});
   }
   onSubmit(e){
       e.preventDefault();
      
       this.props.confirm(this.state.id ,this.state.code);


   }
   componentWillReceiveProps(nextProps){
  
       if(nextProps.errors){
             this.setState({errors : nextProps.errors});
       }
   }
   
    render() {
       
        return (
            <div>


            <div class="wrapper fadeInDown">
            <div id="formContent">
            <h4 >Email Verification</h4>
            <p class="margin font16">Thanks for signing up... Now it's time to get engaged!</p>
            <em class="margin font14" style={{ lineHeight: "32px" }}>Please check your email account for the <b style={{ color: "#a44" }}>confirmation code</b>.</em>
            <br />
            <em class="margin font14" style={{ lineHeight: "32px" }}>Once you've copy the code of confirmation in that email and typed in this form,</em>
            <br />
            <em class="margin font14" style={{ lineHeight: "32px" }}>you'll be able to login to <b class="font14" style={{ color: "#48b" }}>AskMore</b> web-app</em>
            <br /><br />

                <form onSubmit={this.onSubmit}>
                    
                <input type="text" class="fadeIn third" style={{borderBottom:"solid 2px green"}} name="code" placeholder="Confirmation Code"
                value={this.state.code}
                onChange={this.onChange}
            />

                    <div class="input-groupe btn align-center">
                    <Link to="/" className="btn btn-danger ">Cancel</Link>
                    <button type="submit"  className="btn btn-success" >Confirm</button>
                    </div>
                </form>


                

            </div>
        </div>

                
            </div>
        )
    }
}

Confirmation.propTypes = {
    errors : Proptypes.object.isRequired,
    confirm : Proptypes.func.isRequired
}
const mapStateToProps = state =>({
    errors: state.errors
})
export default connect (mapStateToProps,{confirm})(Confirmation);
