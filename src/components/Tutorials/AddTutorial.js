/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */

import React, { Component } from 'react'
import { addTutorial } from '../../actions/TutorialAction';
import { getSubjectList } from '../../actions/AdminAction';
import { getGroupeListByTeacher } from '../../actions/groupeActions'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { connect } from 'react-redux';
export class AddTutorial extends Component {
    constructor() {
        super();
        this.state = {
            show: 1,
            title: "",
            subject: "",
            content: "",
            allowed_groupes: "",
            delayComment: "",
            file: null
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })

    }
    componentWillMount() {
        this.props.getSubjectList();
        this.props.getGroupeListByTeacher();
    }
    onSubmit(e) {
        e.preventDefault();
        const tutorial = {
            "content": this.state.content,
            "title": this.state.title,
            "delayComment": this.state.delayComment,
            "contentType": this.state.show
        }
        this.props.addTutorial(this.state.subject, this.state.allowed_groupes, tutorial, this.state.file);

    }
    fileUpload(e) {
        this.setState({ file: e.target.files[0] });
    }
    showPDF() {
        document.getElementById('content-pdf-File').click();
    }
    changeContent(c_type) {
        this.setState({ show: c_type });
    }

    createSelectSubject() {
        const list = this.props.tutorial.subjects;
        let listItems = [];
        if (list.length > 0) {
            list.map(subject => {
                listItems.push(
                    <option value={subject.id}>{subject.name}</option>
                )
                return null
            })
        }
        return listItems;
    }
    addGroupe(id) {
        let allowed_groupe = this.state.allowed_groupes;
        if (allowed_groupe.indexOf("" + id) === -1) {
            allowed_groupe += id + "/"
        } else {
            allowed_groupe = allowed_groupe.replace("" + id, "");
        }
        this.setState({ allowed_groupes: allowed_groupe })

    }
    handleEditorChange(event, editor) {
        const data = editor.getData();
        this.setState({content:data});
    }
    createGroupeList() {
        
        const list = this.props.tutorial.groupes;
        let listItems = [];
        if (list.length > 0) {
            list.map(groupe => {
                listItems.push(
                    <label className={this.state.allowed_groupes.indexOf("" + groupe.id) === -1 ? 'checked' : 'checked on'}><input type='checkbox' value={groupe.id} val='' checked="true" onClick={this.addGroupe.bind(this, groupe.id)} /> {groupe.name}</label>
                )
            })
        }
        return listItems;
    }
    render() {
        return (
            <div>
                <section className="section_gap" >
                    <div className="container" >
                        <div className="row" >
                            <div className="col-lg-12">
                                <div className="input-groupe btn-top align-left">
                                    <h4 className="margin font14">
                                        filed : <b style={{ color: "#1F80BF" }}>Field  name</b>
                                    </h4>
                                </div>
                                <br />
                                <br />
                                <form className="profile-form" onSubmit={this.onSubmit}>
                                    <div className="input-groupe">
                                        <h3>ADD NEW COURSE</h3>
                                    </div>
                                    <div className="input-groupe">
                                        <label>Module</label>
                                        <div className="inputs">
                                            <select name="subject" value={this.state.subject} onChange={this.onChange} onClick={this.onChange}>
                                                {this.createSelectSubject()}
                                            </select>
                                            <small>select module</small>
                                        </div>
                                    </div>
                                    <div className="input-groupe">
                                        <label>Title</label>
                                        <div className="inputs">
                                            <input type="text" name="title" className="medium" value={this.state.title} min-length="3" notnull
                                                onChange={this.onChange}
                                            />
                                            <small>e.g : jQuery and Ajax </small>
                                        </div>
                                    </div>
                                    <div className="input-groupe">
                                        <label>Content type <span style={{ color: "#f00" }}> * </span> </label>
                                        <div className="inputs">
                                            <div className="groupe-radio">
                                                <div className={this.state.show === 1 ? "radio on" : "radio"}>
                                                    <label className="txt"><input type="radio" name="c_type" onClick={this.changeContent.bind(this, 1)} /></label>
                                                </div>
                                                <div className={this.state.show === 2 ? "radio on" : "radio"}>
                                                    <label className="pdf"><input type="radio" name="c_type" onClick={this.changeContent.bind(this, 2)} /></label>
                                                </div>
                                                <div className={this.state.show === 3 ? "radio on" : "radio"}>
                                                    <label className="images"><input type="radio" name="c_type" onClick={this.changeContent.bind(this, 3)} /></label>
                                                </div>
                                                <div className={this.state.show === 4 ? "radio on" : "radio"}>
                                                    <label className="swf"><input type="radio" name="c_type" onClick={this.changeContent.bind(this, 4)} /></label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="input-groupe noWidth" id="content">

                                        <div className="inputs border align-center" id="content-txt" style={{ display: (this.state.show === 1 ? "block" : "none") }}>

                                            <center>

                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    data={this.state.content}

                                                    onChange={this.handleEditorChange}

                                                />

                                             
                                            </center>
                                        </div>

                                        <div className="inputs border align-center" id="content-pdf" style={{ display: (this.state.show !== 1 ? "block" : "none") }}>
                                            <div id="upload-control" className="align-left">
                                                <label>Upload file</label><br />
                                                <a id="content-pdf-Button" className="button" onClick={this.showPDF.bind(this)}>browse</a>
                                                <input type="file" id="content-pdf-File" onChange={this.fileUpload.bind(this)} name="file" multiple="multiple" style={{ display: 'none' }} />
                                                <small id="content-pdf-max_size"></small>
                                                <div className="clear"></div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="input-groupe">
                                        <label>Comments delay</label>
                                        <div className="inputs">
                                            <input type="text" name="delayComment" value={this.state.delayComment} className="very-small" isnumber max-length="5" notnull
                                                onChange={this.onChange}
                                            />
                                            <small>e.g : 5 (days) </small>
                                        </div>
                                    </div>

                                    <div className="input-groupe">
                                        <label>Privacy</label>
                                        <div className="inputs">


                                            {this.createGroupeList()}

                                            <input type="text" name="allowed_groupe" value="" id="checked_text" style={{ display: "none" }} />
                                            <br /><small>ex : choose groupes </small>
                                            <br /><small>important : don't choose any groupe for  </small>
                                            <label>Public</label>     </div>
                                    </div>


                                    <div className="input-groupe btn align-center">
                                        <input type="reset" value="reset" />
                                        <input type="submit" name="add_cours" value="save" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        )
    }
}
const mapStateToProps = state => ({
    tutorial: state.tutorial
})
export default connect(mapStateToProps, { getGroupeListByTeacher, getSubjectList, addTutorial })(AddTutorial);

