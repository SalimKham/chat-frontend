/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
import React, { Component } from 'react';

class ShowQuestionnary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentIndex: 0,
            showResult: false,
            result: 0,
            selectedAnswers: "",
        }

    }
    tryAgain() {
        this.setState({ currentIndex: 0, showResult: false, result: 0, selectedAnswers: "" })
    }
    changeIndex() {

        if (this.state.currentIndex !== 0) {
            this.setState({ currentIndex: this.state.currentIndex - 1 })
        }
    }
    showResult() {
        const questions = this.props.questions;
        let nbrValideAnswers = 0;
        let nbrCorrectAnswers = 0;
        
        questions.map(question => {
            const responses = question.responses;
            responses.map(res => {
                if (res.valide) {
                    nbrValideAnswers += 1;
                    if (this.state.selectedAnswers.indexOf("" + res.id) !== -1)
                        nbrCorrectAnswers += 1;

                } else{
                    if (this.state.selectedAnswers.indexOf("" + res.id) !== -1)
                    nbrCorrectAnswers -= 1;
                }
                
            })

        })
        nbrCorrectAnswers = nbrCorrectAnswers < 0 ? 0 : nbrCorrectAnswers;
        this.setState({ showResult: true, result: Math.round((nbrCorrectAnswers / nbrValideAnswers) * 100)  });
    }

    nextOption() {
        if (this.state.currentIndex !== this.props.questions.length) {
            this.setState({ currentIndex: this.state.currentIndex + 1})
        }
    }
    selectOption(id) {
        let { selectedAnswers } = this.state;
        if (selectedAnswers.indexOf(id) !== -1) {
            selectedAnswers = selectedAnswers.replace(id + "/", "");
        } else {
            selectedAnswers += id + "/";
        }
        this.setState({ selectedAnswers });

    }

    showOptions() {
        const list = this.props.questions[this.state.currentIndex].responses;
        let listItems = [];
        list.map(response => {
            listItems.push(

                <tr style={{ padding: "0px", backgroundColor: "white" }} onClick={this.selectOption.bind(this, response.id)} >
                    <td   ><div className={"checkbox " + (this.state.selectedAnswers.indexOf(response.id+"/") !== -1 ? "on" : "")}>
                    </div></td>
                    <td style={{ padding: "0px", color: "green" }}> {response.content} </td>


                </tr>)
        })
        return listItems;
    }

    render() {
        return (
            <div class={"wrapper "} style={{ width: "100%" }}>

                {this.state.showResult && <div id="formContent" className={this.state.showResult ? "fadeInDown" : ""} style={{ borderTopColor: (this.state.result < 50 ? "red" : this.state.result < 70 ? "orange" : "green") }}>
                    <h2>Your Result : </h2>
                    <div class="fadeIn first font22" style={{ color: (this.state.result < 50 ? "red" : this.state.result < 70 ? "orange" : "green") }}>
                        {this.state.result + "/100"}
                    </div>
                </div>
                }



                {!this.state.showResult && <table  style={{ width: "100%" }}>

                    <thead >
                        <tr >
                            <th style={{ width: "10%" ,  backgroundColor: "#FFFFFF" , verticalAlign:"middle;"}} className="text-center" >Question {this.state.currentIndex + 1}   </th>
                            <th  className="text-center bold italic" style={{ width: "90%" , backgroundColor: "#FFFFFF"}}>  <div dangerouslySetInnerHTML={{__html: this.props.questions[this.state.currentIndex].question}}></div> </th>

                        </tr>
                    </thead>


                    <tbody>
                        <tr style={{ padding: "0px", backgroundColor: "white" }} >
                            <td  ></td>
                            <td className="font16 italic bold text-primary" > Select Correct Answers :  </td>
                        </tr>
                        {this.showOptions()}
                    </tbody>

                </table>}


                <div style={{width:"100%"}} className="input-groupe btn align-right">
                    {(this.state.currentIndex !== 0 && !this.state.showResult) &&<a className="btn bg-primary " onClick = {this.changeIndex.bind(this)}>Prev</a>}
                    <a className="btn bg-primary" onClick={this.state.currentIndex + 1 !== this.props.questions.length ? this.nextOption.bind(this) : this.state.showResult ? this.tryAgain.bind(this) : this.showResult.bind(this)} >{this.state.currentIndex + 1 !== this.props.questions.length ? "Next" : this.state.showResult ? "Try Again" : "Show Result"}</a>

                </div>

            </div>
        );
    }
}

export default ShowQuestionnary;