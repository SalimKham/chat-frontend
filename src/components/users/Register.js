import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types'
import { createUser } from '../../actions/userActions';
import { Link } from 'react-router-dom'

class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            confirmPassword: "",
            photo:"",
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }
    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            "username": this.state.username,
            "password": this.state.password,
            "confirmPassword": this.state.confirmPassword,
            "photo":this.state.photo

        }
  this.props.createUser(newUser, this.props.history);
    }
    render() {
        const { errors } = this.state;

        return (
            <div>

                <div className="wrapper fadeInDown">
                    <div id="formContent">
                        <h2>Sign up</h2>

                        {errors.error && <div class="alert" style={{ backgroundColor: '#BA3D07', color: 'white' }}>
                            {errors.error}
                        </div>}
                        <form onSubmit={this.onSubmit}>
                            <input type="text" className="fadeIn first" name="username" placeholder="user name"
                                value={this.state.username}
                                onChange={this.onChange}
                            />
                         

                            <input type="password" className="fadeIn third" name="password" placeholder="password"
                                value={this.state.password}
                                onChange={this.onChange}
                            />
                            <input type="password" className="fadeIn third" name="confirmPassword" placeholder="Confirm Password" required="required"
                                value={this.state.confirmPassword}
                                onChange={this.onChange}
                            />
                           

                            <div className="input-groupe btn align-center">
                                <Link to="/" className="btn bg-dark text-white ">Cancel</Link>
                                <button type="submit" className="btn btn-success" style={{backgroundColor:'#BA3D07'}}  >Sign Up </button>
                            </div>
                        </form>
                        <div id="formFooter">
                            <Link className="underlineHover" to="/login" style={{color:'#BA3D07'}} >Already Have Account?</Link>
                        </div>

                    </div>
                </div>
            </div>

        )
    }
}
Register.propTypes = {
    createUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(mapStateToProps, { createUser })(Register);
