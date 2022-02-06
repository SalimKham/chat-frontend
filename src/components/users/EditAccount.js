import React, { Component } from 'react'
import { connect } from 'react-redux';
import { editPassword } from '../../actions/profileActions';
class EditAccount extends Component {
    constructor() {
        super();
        this.state = {
            newPassword: "",
            oldPassword: "",
            confirmPassword: "",
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
        if (this.state.oldPassword !== this.state.confirmPassword) {
            this.setState({ errors: { error: "password not matched!" } });
            return;
        }
        this.props.editPassword(this.state.oldPassword, this.state.newPassword);


    }
    componentWillReceiveProps(nextProps) {

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <div>

                <form onSubmit={this.onSubmit}>

                    <div class="input-groupe">
                        {errors.error ? <div className="alert alert-danger" role="alert"> {errors.error} </div> : ""}
                        {errors.result ? <div className="alert alert-success" role="alert"> {errors.result} </div> : ""}
                    </div>
                    <div class="input-groupe">
                        <label>Username</label>
                        <div class="inputs">
                            <label>{this.props.user.user.username}</label>
                        </div>
                    </div>
                    <div class="input-groupe">
                        <label>Password</label>
                        <div class="inputs">
                            <input type="password" name="oldPassword" placeholder="old Password" required="required"
                                value={this.state.oldPassword}
                                onChange={this.onChange} />
                        </div>
                    </div>
                    <div class="input-groupe">
                        <label>Confirm Password</label>
                        <div class="inputs">
                            <input type="password" name="confirmPassword" placeholder="Confirm Password" required="required"
                                value={this.state.confirmPassword}
                                onChange={this.onChange} />
                        </div>
                    </div>
                    <div class="input-groupe">
                        <label>New Password</label>
                        <div class="inputs">
                            <input type="password" name="newPassword" placeholder="new Password" required="required" value={this.state.newPassword}
                                onChange={this.onChange} />
                        </div>
                    </div>
                    <div class="input-groupe btn">
                        <input type="reset" value="reset" />
                        <input type="submit" value="save" name="editUserAccount" />
                    </div>
                </form>




            </div>
        )
    }
}

const mapStateToProps = state => ({
    errors: state.errors,
    user: state.security
})
export default connect(mapStateToProps, { editPassword })(EditAccount);
