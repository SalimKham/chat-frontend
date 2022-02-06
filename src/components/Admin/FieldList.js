import React, { Component } from 'react';
import { connect } from 'react-redux';

import { archiveField, addField, deleteField, getFieldList } from '../../actions/AdminAction';



class FieldList extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
            descr: "",
            showForm: false,
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }



    componentWillMount() {
        this.props.getFieldList();

    }



    deleteField(id) {
        this.props.deleteField(id);

    }
    archiveToggle(id, index) {
        this.props.archiveField(id, index);
    }


    createFieldList() {
        let listItems = [];
        const list = this.props.user.fieldList;
        if (list.length > 0) {
            let index = 0;
            list.map(field => {
                listItems.push(
                    <tr >
                        <td>{field.id}</td>
                        <td>{field.name}</td>
                        <td>{field.descr}</td>
                        <td className="text-center"> <button className="btn btn-danger btn-sm" onClick={this.deleteField.bind(this, field.id)}>delete</button>
                            <button onClick={this.archiveToggle.bind(this, field.id, index)} className="btn btn-warning btn-sm">{!field.is_arrchived ? "Archive"  : "Recover"}</button>
                        </td>
                    </tr>
                )
                index++;
                return null;
            })
        }
        return listItems;

    }

    createField() {
        const { errors } = this.state;
        return (

            <div style={{ border: "solid 1px #51D5E5", width: "50%" }} >
                <h3 className="text-center"> New Field</h3>

                <form onSubmit={this.onSubmit}>
                    {errors.error ? <div className="alert alert-danger" role="alert"> {errors.error} </div> : ""}
                    {errors.result ? <div className="alert alert-success" role="alert"> {errors.result} </div> : ""}
                    <div className="input-groupe">
                        <div class="inputs">

                            <input type="text" name="name" placeholder="Field name"
                                min-length="3"
                                value={this.state.name}
                                onChange={this.onChange} />
                            <small>e.g : Programming Languages</small>
                        </div>

                    </div>

                    <div class="input-groupe">
                        <div class="inputs">
                            <textarea name="descr" placeholder="Description..." min-length="5"
                                value={this.state.descr}
                                onChange={this.onChange}></textarea>
                        </div>
                    </div>

                    <div class="input-groupe btn">
                        <input type="reset" value="Cancel" onClick={this.showForm.bind(this, false)} />
                        <input type="submit" value="save" name="editUserPersonal" onClick={this.onSubmit} />
                    </div>



                </form>


            </div>

        )
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.errors) {
            if (nextProps.errors.result)
                this.setState({ errors: nextProps.errors, name: "", descr: "" });
            else
                this.setState({ errors: nextProps.errors });
        }
    }

    showForm(bool) {
        this.setState({ showForm: bool });
    }
    onSubmit(e) {
        e.preventDefault();
        const newField = {
            "name": this.state.name,
            "descr": this.state.descr
        }
        this.props.addField(newField);

    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {


        return (
            <section class="home_banner_area">

                <div class="banner_inner">


                    <div class="container" >
                        {this.state.showForm && this.createField()}

                        <div class="row" >
                            <div class="col-lg-12">

                                <h3 className="text-center"> List of Study Fields</h3>

                                <div><button class="btn btn-primary btn-md" onClick={this.showForm.bind(this, true)}>Add</button></div>
                                <div class="table-wrapper-scroll-y my-custom-scrollbar">
                                    <table class="table table-striped w-table-fixed">

                                        <thead>
                                            <tr>

                                                <th className="text-center">Field ID</th>
                                                <th className="text-center">name</th>
                                                <th className="text-center">Description</th>
                                                <th className="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {this.createFieldList()}




                                        </tbody>


                                    </table>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    errors: state.errors,
    user: state.admin
});

export default connect(mapStateToProps, { addField, deleteField, archiveField, getFieldList })(FieldList);
