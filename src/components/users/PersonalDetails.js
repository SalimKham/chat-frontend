import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProfile } from '../../actions/profileActions';


class PersonalDetails extends Component {
    constructor() {
        super();
        this.state = {

            firstName: " ",
            lastName: " ",
            address: " ",
            birthday: null,
            birthday_type: "1",
            sex: "M",
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
        const newInfo = {
            "id_Info": this.props.user.profile.userInfo.id_Info,
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "address": this.state.address,
            "birthday": this.state.birthday,
            "birthday_type": this.state.birthday_type,
            "sex": this.state.sex,
        }

        this.props.updateProfile(newInfo);

    }

    componentDidMount() {
        if (this.props.user.profile.userInfo) {
            const { userInfo } = this.props.user.profile;

            this.setState({
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                address: userInfo.address,
                birthday: userInfo.birthday,
                birthday_type: userInfo.birthday_type,
                sex: userInfo.sex
            });
        }

    }
    componentWillReceiveProps(nextProps) {
        if (this.props.user.profile) {
            const { userInfo } = this.props.user.profile;

            this.setState({ firstName: userInfo.firstName, lastName: userInfo.lastName, address: userInfo.address, birthday: userInfo.birthday, birthday_type: userInfo.birthday_type, sex: userInfo.sex });
        }


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
                        <label>First Name</label>
                        <div class="inputs">
                            <input type="text" name="firstName" placeholder="type first Name"
                                min-length="3" 
                                value={this.state.firstName||""}
                                onChange={this.onChange} />
                            <small>e.g : Djallel</small>
                        </div>
                    </div>
                    <div class="input-groupe">
                        <label>Last Name</label>
                        <div class="inputs">
                            <input type="text" name="lastName" placeholder="type last Name"
                                min-length="3" 
                                value={this.state.lastName||""}
                                onChange={this.onChange} />
                            <small>write your last name here </small>
                        </div>
                    </div>
                    <div class="input-groupe">
                        <label>Gender</label>
                        <div class="inputs">

                            <select name="sex" 
                                value={this.state.sex||"M"}
                                onChange={this.onChange}>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </select>
                        </div>
                    </div>
                    <div class="input-groupe">
                        <label>Birthday</label>
                        <div class="inputs">
                            <input type="date" name="birthday" placeholder="type your Birthday"
                                isdate length="10" notnull

                                value={this.state.birthday || ' 2010-12-31'}
                                onChange={this.onChange} />
                            <small>e.g : 05/06/1986 </small>
                            <br /><br />
                            <label>Privacy</label>
                            <select name="birthday_type" value={this.state.birthday_type}
                                onChange={this.onChange}>
                                <option value="0">Hide Age and Date of Birth</option>
                                <option value="1">Display Only Age</option>
                                <option value="2">Showing only the day and month of Birth</option>
                                <option value="3">Age and date of birth</option>
                            </select>
                        </div>
                    </div>
                    <div class="input-groupe">
                        <label>Address</label>
                        <div class="inputs">
                            <textarea name="address" placeholder="your address ..." min-length="5"
                               value={this.state.address||""}
                                onChange={this.onChange}>Medjana</textarea>
                            <small>ex : Russia, Penza 440018 </small>
                        </div>
                    </div>

                    <div class="input-groupe btn">
                        <input type="reset" value="reset" />
                        <input type="submit" value="save" name="editUserPersonal" />
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
export default connect(mapStateToProps, { updateProfile })(PersonalDetails);