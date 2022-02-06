/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
import React, { Component } from 'react'
import { connect } from 'react-redux';

import { addQuestionnaryToTutorial } from '../../actions/TutorialAction';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
class addQuestionnary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tutorial_id: this.props.match.params.id,
            curentIndex: 1,
            questions: [
                {
                    index: 1,
                    content: "",

                }
            ],
            reponses: [],
            error: {}
        }
        this.createOption = this.createOption.bind(this);
        this.onResponseChange = this.onResponseChange.bind(this);
        this.onQuestionChange = this.onQuestionChange.bind(this);
    }
    showQuestion() {
        const list = this.state.questions;
        let listItems = [];
        list.map(question => {
            if (question.index === this.state.curentIndex) {
                listItems.push(
                    <div className="input-groupe " id="content">

                        <div className="inputs border align-center" id="content-txt" >

                            <center>
                                <CKEditor

                                    editor={ClassicEditor}
                                    data={question.content}

                                    onChange={this.handleEditorChange.bind(this, question.index)}


                                />
                            </center>
                        </div>
                    </div>

                )
                return;
            }
        })
        return listItems;
    }
    valideToggle(index) {

        let res = [];
        this.state.reponses.map(response => {
            if (response.order !== index) {
                res.push(response);
            } else {
                res.push({
                    questionIndex: response.questionIndex,
                    order: response.order,
                    content: response.content,
                    valide: !response.valide

                })
            }

        });
        this.setState({ reponses: res })
    }
    showOptions(list) {
        let listItems = [];
        list.map(response => {
            (response.questionIndex === this.state.curentIndex) && listItems.push(

                <tr  >
                    
                    <td style={{ heigth: "50px" }}> <textarea style={{width:"100%"}} onChange={this.onResponseChange} id={response.order} className="single-textarea" placeholder="option"
                        value={response.content}
                    >  </textarea></td>
                    <td   ><div  onClick={this.valideToggle.bind(this, response.order)} className={"checkbox " + (response.valide ? "on" : "")}>
                    </div></td>

                </tr>)
        })
        return listItems;
    }
    handleEditorChange(id, event, editor) {

        const int_id = parseInt("" + id);
        const int_currentIndex = parseInt(this.state.curentIndex.toString());

        if (int_id !== int_currentIndex) {
            return;
        }
        const data = editor.getData();
        console.log("setting value");
        let res = [];
        this.state.questions.map(question => {
            if (question.index !== id) {
                res.push(question);
            } else {
                res.push({
                    index: question.index,
                    content: data
                })
            }

        });
        this.setState({ questions: res, error: {} })

    }
    onQuestionChange(cont, editor) {
        let res = [];
        this.state.questions.map(question => {
            if (question.index !== editor.id) {
                res.push(question);
            } else {
                res.push({
                    index: question.index,
                    content: cont
                })
            }

        });
        this.setState({ questions: res, error: {} })

    }
    onResponseChange(e) {
        let res = [];
        this.state.reponses.map(response => {
            if (response.order !== e.target.id) {
                res.push(response);
            } else {
                res.push({
                    questionIndex: response.questionIndex,
                    order: response.order,
                    content: e.target.value,
                    valide: response.valide
                })
            }

        });
        this.setState({ reponses: res })

    }
    changeIndex() {

        if (this.state.curentIndex !== 1) {
            this.setState({ curentIndex: this.state.curentIndex - 1, error: {} })
        }
    }


    nextOption() {
        if (this.state.curentIndex !== this.state.questions.length) {
            this.setState({ curentIndex: this.state.curentIndex + 1, error: {} })
        }
    }
    validateQuestion() {
        let error = {};
        this.state.questions.map(question => {
            if (question.content.length < 2) {
                error = {
                    message: "Please Enter A Valid Question"
                }
                return;
            }
        }

        )
        const responses = this.state.reponses.filter((
            response => response.questionIndex === this.state.curentIndex
        ))
        if (!error.message) {
            if (responses.length < 2) {
                error = {
                    message: "Question Should Have At least Two Options"
                }
            } else {
                responses.map(res => {
                    if (res.content.length < 2) {
                        error = {
                            message: "Please Enter A Valid Response (index : " + res.order + ")"
                        }
                        return;
                    }

                }


                )
            }
        }
        return error;

    }
    addQuestion() {
        const error = this.validateQuestion();
        if (!error.message) {
            let res = this.state.questions;
            const question = {
                index: this.state.questions.length + 1,
                content: ""
            }
            res.push(question);
            this.setState({ curentIndex: this.state.curentIndex + 1, questions: res, error: {} });
        } else {
            this.setState({ error })
        }
    }
    createOption() {
        let res = this.state.reponses;
        const option = {
            questionIndex: this.state.curentIndex,
            order: res.length,
            content: ""
        }
        res.push(option);
        this.setState({ reponses: res, error: {} });

    }

    onSubmit(e) {
        e.preventDefault();
        const error = this.validateQuestion();
        if (!error.message) {

            let questions_array = "";
            this.state.questions.map(question => {
                questions_array += 0 + ":" + question.content + "sp_q"
            });
            let answers_array = "";
            this.state.reponses.map(response => {
                answers_array += response.questionIndex + ":" + response.content + ":" + response.valide + "sp_ans";
            });


            this.props.addQuestionnaryToTutorial(this.state.tutorial_id, questions_array, answers_array);
        } else {
            this.setState({ error })
        }

    }

    render() {
        const list = this.state.reponses;


        return (
            <div>
                <div class="wrapper" style={{ width: "100%" }}>
                    {this.state.error.message && <div class="alert alert-danger">
                        {this.state.error.message}
                    </div>}

                    <h2>Question {this.state.curentIndex}</h2>
                    {this.showQuestion()}
                    
                    <div className="input-groupe " id="content">

                        <div className="inputs border " id="content-txt" >
                           

                                <form onSubmit={this.onSubmit.bind(this)} style={{ width: "100%" }} >
                                    <div className="input-groupe btn align-left">

                                        <a className="btn bg-success " onClick={this.createOption}>Add Option</a>

                                    </div>
                                    <table class="table table-striped w-table-fixed" style={{ width: "100%" }}>

                                        <thead>
                                            <tr >
                                                <th className="text-center text-white" style={{ width: "80%" }}>Answer </th>
                                                <th className="text-center text-white" style={{ width: "20%" }}>Correct?</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(list.length !== 0) && this.showOptions(list)
                                            }
                                        </tbody>


                                    </table>




                                    <div className="input-groupe btn">
                                        <div className="align-left">
                                            <a className="btn bg-primary " onClick={this.changeIndex.bind(this)}>Prev</a>
                                            <a className="btn bg-primary " onClick={this.nextOption.bind(this)}>Next</a>
                                        </div>
                                        <div className="align-right">
                                            <a className="btn bg-danger " onClick={this.changeIndex.bind(this)}>Cancel</a>
                                            <a className="btn bg-primary " onClick={this.addQuestion.bind(this)}>Add</a>
                                            <button type="submit" className="btn btn-success" >Publish </button>
                                        </div>
                                    </div>
                                </form>

                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default connect(null, { addQuestionnaryToTutorial })(addQuestionnary);

