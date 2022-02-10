import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from "prop-types";
import { login } from '../../actions/userActions';
import { Link } from 'react-router-dom';
class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {

        this.setState({ [e.target.name]: e.target.value, errors: {} });
    }
    onSubmit(e) {
        e.preventDefault();
        const loginRequest = {
            "username": this.state.username,
            "password": this.state.password
        }
        this.props.login(loginRequest, this.props.history);


    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.security.validToken) {
            this.props.history.push("/")
        }
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }
    render() {
        const { errors } = this.state;
        return (
            <div>
                <div class="wrapper fadeInDown">
                    <div id="formContent">
                        <h2>Log in</h2>
                        {errors.username && <div class="alert" style={{backgroundColor:'#BA3D07',color:'white'}}>
                            {errors.username} OR  {errors.password}
                        </div>}
                        {errors.error && <div class="alert alert-danger">
                            {errors.error}
                        </div>}
                        <form onSubmit={this.onSubmit}>
                            <input type="text" class="fadeIn third" name="username" placeholder="user name"
                                value={this.state.username}
                                onChange={this.onChange}
                            />
                            <input type="password" class="fadeIn third" name="password" placeholder="password"
                                value={this.state.password}
                                onChange={this.onChange}
                            />

                            <div className="input-groupe btn align-center">
                                <Link to="/" className="btn bg-dark text-white">Cancel</Link>
                                <button type="submit" className="btn btn-success" style={{backgroundColor:'#BA3D07'}} >Login </button>
                            </div>
                        </form>


                        <div id="formFooter">
                            <Link class="underlineHover" style={{color:'#BA3D07'}} to="/register">Sign up</Link>
                        </div>

                    </div>
                </div>


            </div>
        )
    }
}
Login.propTypes = {
    errors: Proptypes.object.isRequired,
    security: Proptypes.object.isRequired,
    login: Proptypes.func.isRequired
}
const mapStateToProps = state => ({
    errors: state.errors,
    security: state.security
})
export default connect(mapStateToProps, { login })(Login);