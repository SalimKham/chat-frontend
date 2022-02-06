import React, { Component } from 'react';
import { connect } from 'react-redux';

import { archiveField, addSubject, deleteSubject, getFieldList, getSubjectList } from '../../actions/AdminAction';



class SubjectList extends Component {

    constructor() {
        super();
        this.state = {
            field: "",
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
        this.props.getSubjectList();

    }



    deleteSubject(id) {
        this.props.deleteSubject(id);

    }
    archiveToggle(id, index) {
        this.props.archiveField(id, index);
    }

    createSubjectList() {
        let listItems = [];
        const list = this.props.user.subjectList;
        if (list.length > 0) {
            
            list.map(subject => {
                listItems.push(
                    <tr  >

                        <td className="text-center">{subject.field.name}</td>
                        <td className="text-center">{subject.id}</td>
                        <td className="text-center">{subject.name}</td>
                        <td className="text-center">{subject.description}</td>
                        <td className="text-center"> <button className="btn btn-danger btn-sm" onClick={this.deleteSubject.bind(this, subject.id)}>delete</button>
                        </td>
                    </tr>
                )
                
                return null
            })
        }
        return listItems;

    }
    createSelectField() {
        const list = this.props.user.fieldList;
        let listItems = [];
        if (list.length > 0) {
            list.map(field => {
                listItems.push(
                    <option value={field.id}>{field.name}</option>
                )
                return ''
            })
        }
        return listItems;


    }
    createField() {
        const { errors } = this.state;
        return (

            <div style={{ border: "solid 1px #51D5E5" , width:"50%"}} >
                <h3 className="text-center bold italic"> New Subject</h3>

                <form onSubmit={this.onSubmit}>
                    {errors.error ? <div className="alert alert-danger" role="alert"> {errors.error} </div> : ""}
                    {errors.result ? <div className="alert alert-success" role="alert"> {errors.result} </div> : ""}
                    <div class="input-groupe">
                        <div class="inputs">
                            <label>Field</label>
                            <select name="field"
                                value={this.state.field}
                                onChange={this.onChange}
                                onClick={this.onChange}>
                                {this.createSelectField()}
                            </select>
                        </div>
                    </div>

                    <div className="input-groupe">
                        <div class="inputs">

                            <input type="text" name="name" placeholder="Subject name"
                                min-length="3"
                                value={this.state.name}
                                onChange={this.onChange} />
                            <small>e.g : Spring Security</small>
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
                        <input type="submit" value="save"  onClick={this.onSubmit} />
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
        const newSubject = {
            "name": this.state.name,
            "descr": this.state.descr
        }
        console.log(newSubject + " field id " + this.state.field);
        this.props.addSubject(this.state.field, newSubject);
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

                                <h3 className="text-center bold italic"> List of Subjects</h3>


                                <div><button class="btn btn-primary btn-md" onClick={this.showForm.bind(this, true)}>Add </button></div>
                                <div class="table-wrapper-scroll-y my-custom-scrollbar">
                                    <table class="table table-striped w-table-fixed">

                                        <thead>
                                            <tr>

                                                <th className="text-center">Field</th>
                                                <th className="text-center">Subject ID</th>
                                                <th className="text-center">name</th>
                                                <th className="text-center">Description</th>
                                                <th className="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {this.createSubjectList()}




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

export default connect(mapStateToProps, { addSubject, deleteSubject, archiveField, getSubjectList, getFieldList })(SubjectList);
