/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addComment, getComments , deleteComment } from '../../actions/CommentAction'
import { SERVER_URL } from '../../actions/types';

class CommentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
            contentReplay:"",
            idReplay : 0
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.createCommentList = this.createCommentList.bind(this);
        this.setReplayID = this.setReplayID.bind(this);
    }
    setReplayID(id){
      this.setState({idReplay:id});
    }
    componentDidMount() {
        console.log("comment list");
        this.props.getComments(this.props.parent);
    }
    deleteComment(id){
        this.props.deleteComment(id);
    }
    ShowQuote(list,id){
        let item = [];
        if (list.length > 0) {
            list.map(comment => {
                if(comment.id === id){
                    item.push( <div class="quote">
                    
                                <div class="content">
                                
                                    <div class="info">
                                        
                                        <b>{comment.user.username }</b> at <em>{comment.createdAt}</em>
                                    </div>
                                    <p> {comment.content}</p>
                                </div>
                            </div>)
                           
                }
                return null
            })
        }
        return item;
    }
    createCommentList() {
        let listItems = [];
        const list = this.props.comment.comments;
        if (list.length > 0) {
            list.map(comment => {
                const image = comment.user.userInfo.photo? comment.user.userInfo.photo : "/images/no-avatar.th.png"
                listItems.push(

                    <div class="block comments">
                        <img alt='' src={image} class="avatar" />
                        <div class="content">
                            <div class="info">
                                <b><a href="">{comment.user.username}</a> {comment.user.type === 2 ? "(Student)" : "(Teacher)"} </b> at <em>{comment.createdAt}</em>
                                <a  class="edit-small-icon right"  title="Edit"></a>
                                <a onClick={this.setReplayID.bind(this,comment.id)} class="right reply-small-icon" title="Reply" ></a>
                                <a class="right delete-small-icon" title="Delete" onClick={this.deleteComment.bind(this,comment.id)}></a>
                                </div>
                              
                            
                            {comment.idReplay !== 0 && this.ShowQuote(list, comment.idReplay)}
                            <p>{comment.content}</p>
                            {this.state.idReplay === comment.id && this.showCommentForm(2)}
                        </div>
                    </div>)
                return null
            })
        }
        return listItems;
    }
    onSubmit(e) {
      
        e.preventDefault();
        const comment = {
            idReplay:e.target.id === 1?0:this.state.idReplay,
            content:e.target.id === 1? this.state.content: this.state.contentReplay
        }
        this.setState({content:"",contentReplay:"",idReplay:0});


       

        this.props.addComment(this.props.parent,comment);
        console.log(this.props.parent)


    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        
    }
    cancelReplay(){
        this.setState({idReplay:0})
    }

    showCommentForm(type){
        return (
            <form class="input-groupe" onSubmit={this.onSubmit} id={type}>
            <fieldset class="textarea-ballon inputs noWidth">
            {this.state.idReplay !== 0 &&  <a onClick = {this.cancelReplay.bind(this)} class="delete-small-icon right"  title="Delete"></a>} 
                <textarea placeholder="add your comment here ..." name={type===1?"content":"contentReplay"} enter_valid value={type===1? this.state.content:this.contentReplay}
                    onChange={this.onChange}
                ></textarea>
                <div className="col-md-12  text-right ">
                    <button type="submit" className="btn btn-success" > Send </button>
                </div>
            </fieldset>

        </form>
        )
    }
    render() {
        const image = this.props.user.user &&  this.props.user.user.photo? ( SERVER_URL+  this.props.user.user.photo+".min.png") : "/images/no-avatar.th.png"
        return (
            <div>
                <small class="icon-h3 add-comment">LEAVE REPLY : </small>
                <br />
                <div class="block add-comments" style={{ width: "100%" }}>
                    <img alt='' src={image}  className="avatar"/>
                   {this.showCommentForm(1)}
                </div>
           
                <small class="icon-h3 comments">COMMENTS : </small>

                {this.createCommentList()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.security,
    comment: state.comment
});
export default connect(mapStateToProps, { deleteComment , getComments, addComment })(CommentList)
