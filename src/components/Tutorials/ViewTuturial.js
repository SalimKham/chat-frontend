/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteTutorial, deleteQuestionnary, getTutorial, getContent } from '../../actions/TutorialAction';
import { SERVER_URL } from '../../actions/types';
import CommentList from '../Lists/CommentList';
import { Link } from 'react-router-dom'
import ShowQuestionnary from '../Questionnary/ShowQuestionnary';

class ViewTuturial extends Component {
    constructor() {
        super();
        this.state = {
            showQuestionnary: false,
        }
    }



    showQuestionnary() {
        this.setState({ showQuestionnary: !this.state.showQuestionnary });
    }
    componentWillMount() {
        this.props.getTutorial(this.props.match.params.id);
        ;
    }

    getDetails() {
        const tutorial = this.props.tutorial.selected;

        let details = {
            id: tutorial ? this.props.match.params.id : "",
            subjectName: tutorial ? tutorial.subject.name : "",
            allowedGroupes: tutorial ? tutorial.allowedGroupes : "",
            username: tutorial ? tutorial.teacher.username : "",
            owner: tutorial ? tutorial.teacher.id : 0,
            title: tutorial ? tutorial.title : "",
            content: tutorial ? tutorial.content : "",
            contentType: tutorial ? tutorial.contentType : 1,
            createAt: tutorial ? tutorial.createAt : "",
            nbrComment: tutorial ? tutorial.nbrComment : "",
            nbrVisitor: tutorial ? tutorial.nbrVisitor : "",
            photo: tutorial ? SERVER_URL  + tutorial.teacher.userInfo.photo + ".min.png" : "",
            questionnary: tutorial.questionnary,
        }
        return details;
    }
    deleteQuestionnary(id) {
        this.props.deleteQuestionnary(id);
    }

    render() {

        if (!this.props.tutorial.selected)
            return <div></div>;


        const TutorialInfo = this.getDetails();

        if (this.props.user.user.type === 2 && TutorialInfo.allowedGroupes.length !== 0) {
            let access = false;
            TutorialInfo.allowedGroupes.map(groupe => {
                if (groupe.acceptedStudents.length !== 0 && groupe.acceptedStudents.indexOf("" + this.props.user.user.id) !== -1) {
                    access = true;
                  
                }

            })

            if (!access)
                return (<div>
                    <br />
                    <Link to="/tutorials" class="btn-top arrowLeft left">Return to Tutorials list </Link>


                    <br />


                    <div class='Notifications Warning '><p class='align-left'><small>Oops! you have no access to this tutorial<em>


                    </em></small></p></div>
                    <br />
                </div>);
        }

        return (
            <div>
                <section className="section_gap" >
                    <div className="container" >
                        <div className="row" >
                            <div className="col-lg-12">
                                <div class="input-groupe btn-top align-right">
                                    <Link to="/tutorials" class="arrowLeft left">Return to Tutorials list </Link>
                                    <a href="" class="arrowRight"></a>
                                </div>
                                <div class="btn">
                                    <h4 class="margin font14">
                                        Subject : <b style={{ color: "#1F80BF" }}>{TutorialInfo.subjectName}</b>
                                    </h4>
                                </div>

                                <div class={"Notifications  right " + (TutorialInfo.allowedGroupes.length === 0 ? "Success" : "Warning")}><p class='align-left'><small>Cours privacy :<em>
                                    {
                                        TutorialInfo.allowedGroupes.length === 0 ? "Public" : "Private"
                                    }

                                </em></small></p></div>

                                <div id="post-frame">
                                    <h1 class="title">
                                        <a>
                                            <span>{TutorialInfo.title}</span>
                                        </a>
                                    </h1>

                                    <div class="user-bar">
                                        <div class="photo">
                                            <a href="/people/seamusleahy"><img alt='' src={TutorialInfo.photo} /></a>
                                        </div>
                                        <div class="meat">
                                            <h2>
                                                <a href="">{TutorialInfo.username}</a>
                                            </h2>
                                            at {TutorialInfo.createAt}. {TutorialInfo.nbrVisitor} views
                                        <div class="right">
                                                <a href="#" class="control comments-icon">{TutorialInfo.nbrComment} comments</a>
                                            </div>
                                        </div>
                                        <div class="clear"></div>
                                    </div>
                                    {TutorialInfo.contentType === 1 && <div dangerouslySetInnerHTML={{ __html: TutorialInfo.content }}></div>}
                                    {TutorialInfo.contentType === 2 && <object data={TutorialInfo.content} type="application/pdf" width="100%" height="800px">
                                        <p> Your Browser doesn't support Pdf viewer Please enable it Or download Pdf  </p>
                                        <div className="align-center">
                                            <div className="pdf_options">
                                                <a  className="bi bi-cloud-download-fill fa-lg"  href ={  TutorialInfo.content} ></a>
                                                <Link  className="bi bi-cloud-download-fill fa-lg" ></Link>
                                            </div>
                                        </div>
                                        </object>
                                    }
                                    <br />

                                    <hr class="dotted" />


                                    <hr class="dotted" />
                                    <div class="Notifications information">
                                        {TutorialInfo.questionnary && <div class="margin">
                                            <a class="button right" onClick={this.showQuestionnary.bind(this)}>{this.state.showQuestionnary ? "Hide" : "Show"}</a>
                                            <p class="align-left bold italic font16">
                                                Quiz :
                                            </p>
                                            {this.state.showQuestionnary && <ShowQuestionnary questions={TutorialInfo.questionnary.questions} />}
                                        </div>}



                                        {this.props.user.user.id === TutorialInfo.owner && <div class="input-groupe btn-top align-right">

                                            {!TutorialInfo.questionnary && <Link to={"/newQuestionnary/" + TutorialInfo.id} class="button white add">Add Quiz</Link>}
                                            {TutorialInfo.questionnary && <form method="POST" class="right">
                                                <input type="hidden" name="id_cours" value="" />
                                                <a class="button white delete" onClick={this.deleteQuestionnary.bind(this, TutorialInfo.questionnary.id)}>Remove Quiz</a>
                                                <input type="submit" style={{ display: "none" }} title="Delete" value="delete" name="delete_questinary" />
                                            </form>}

                                            <form method="POST" class="right" action="">
                                                <input type="hidden" name="id_cours" value="" />
                                                <a href="#" class="button white delete" onClick={this.props.deleteTutorial.bind(this, TutorialInfo.id)} >delete</a>

                                            </form>
                                        </div>}
                                    </div>
                                </div>
                                <br />
                                <br />
                                <CommentList parent={TutorialInfo.id} />
                                <br />
                                <br />
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}
const mapStateToProps = state => ({
    tutorial: state.tutorial,
    user: state.security
})
export default connect(mapStateToProps, { deleteTutorial, deleteQuestionnary, getContent, getTutorial })(ViewTuturial);
