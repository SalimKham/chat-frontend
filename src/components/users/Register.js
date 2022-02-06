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
            email: "",
            password: "",
            confirmPassword: "",
            type: "2",
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
            "email": this.state.email,
            "type": this.state.type,
            "password": this.state.password,
            "confirmPassword": this.state.confirmPassword,

        }
  this.props.createUser(newUser, this.props.history, this.state.type);
    }
    render() {
        const { errors } = this.state;

        return (
            <div>

                <div className="wrapper fadeInDown">
                    <div id="formContent">
                        <h2>Sign up</h2>

                        {errors.error && <div class="alert alert-danger">
                            {errors.error}
                        </div>}
                        <form onSubmit={this.onSubmit}>
                            <input type="text" className="fadeIn first" name="username" placeholder="user name"
                                value={this.state.username}
                                onChange={this.onChange}
                            />
                            <input type="email" className="fadeIn second" name="email" placeholder="Email Address" required="required"
                                value={this.state.email}
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
                            <select className="fadeIn third" id="sel1"
                                name="type"
                                value={this.state.type}
                                onChange={this.onChange}
                            >
                                <option value="2">Student</option>
                                <option value="3">Teacher</option>
                            </select>

                            <div className="input-groupe btn align-center">
                                <Link to="/" className="btn bg-dark text-white ">Cancel</Link>
                                <button type="submit" className="btn btn-success" >Sign Up </button>
                            </div>
                        </form>
                        <div id="formFooter">
                            <Link className="underlineHover" to="/login">Already Have Account?</Link>
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
