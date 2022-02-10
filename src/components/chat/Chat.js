/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserList } from '../../actions/userActions';
import { senMessage, getMessages } from '../../actions/ChatActions';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

class Chat extends Component {

    constructor() {
        super();
        this.state = {
            show: false,
            show_emoji: false,
            show_chat_box: false,
            minimize_chat_box: false,
            chat_box_user: {},
            lastRef: 0,
            message: "",
            messageToSend: "",
        }
        this.minimizeChatBox = this.minimizeChatBox.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.createChatBox = this.createChatBox.bind(this);

    }
    showOrHideEmojis() {
        this.setState({ show_emoji: !this.state.show_emoji })
    }
    setChatBoxUser(user) {
        this.setState({ chat_box_user: user, show_chat_box: true, minimize_chat_box: false });
        this.props.getMessages(user.id);
    }
    componentWillMount() {
        this.props.getUserList();
    
    }
    createUsersList() {
        let listItems = [];
        const list = this.props.user.userList;

        if (list.length > 0) {

            list.map(user => {
                const userphoto = user[3] === "" ? '/images/no-avatar.th.png':user[3];
                listItems.push(
                    <li id="" style={{ backgroundColor: "#616161", color: "white" }} onClick={this.setChatBoxUser.bind(this, { username: user[1], id: user[0], state: user[2], photo:user[3]})}>
                        <span class={user[2] === 1 ? "online" : "offline"}></span>
                        <img alt='' src={userphoto} class="avatar" />
                        {user[1]}

                    </li>
                   
                )

               return null
            })

        }
        return listItems;
    }
    showMessage(message) {
        let message_array = message.split("sp_start_");
        let result = "";
        message_array.forEach(el => {
            if (el.indexOf("sp_end_") === -1) {
                // simple text
                result += el;
            } else {
                let el_array = el.split("sp_end_");
                let emojiPic = "";
                if (el_array[0].length <= 5) {
                    emojiPic = String.fromCodePoint(`0x${el_array[0]}`)

                } else {
                    let sym = el_array[0].split('-')
                    let codesArray = []
                    sym.forEach(element => codesArray.push('0x' + element))
                    emojiPic = String.fromCodePoint(...codesArray)

                }
                result+=emojiPic;
                if(el_array.length !== 1){
                    result+=el_array[1];
                }


            }

        })
        return result;

    }
    addEmoji = (e) => {
        let emojiPic = "";
        if (e.unified.length <= 5) {
            emojiPic = String.fromCodePoint(`0x${e.unified}`)

        } else {
            let sym = e.unified.split('-')
            let codesArray = []
            sym.forEach(el => codesArray.push('0x' + el))
            emojiPic = String.fromCodePoint(...codesArray)

        }

        this.setState({
            message: this.state.message + emojiPic, messageToSend: this.state.messageToSend + "sp_start_" + e.unified + "sp_end_"
        })
    }
    createMessagesList() {
        let listItems = [];
        const list = this.props.chat.list;
        const photo = (this.props.currentUser.user && this.props.currentUser.user.photo) ? ( this.props.currentUser.user.photo) : "/images/no-avatar.th.png"
        if (list.length > 0) {
            let index = 1;
            list.map(message => {
                const re = index === list.length ? 100 : 0;
                if ("" + message[2] === this.props.currentUser.user.id) {
                    listItems.push(
                        <li ref={re}><img alt='' src={photo} class="avatar" /><div class="block  content" style={{ width: "250px" }}><span>at {message[4].split(".")[0]} {message[5] && <b class="right">&#10004;&#10004;</b>}</span>
                            <p className="wrapper">{this.showMessage(message[1])}</p>
                        </div>
                        </li>
                    )
                } else {
                    listItems.push(
                        <li ref={re}><div class="block  content" style={{ width: "250px", borderColor: "#0038AD" }}><span>at {message[4].split(".")[0]} </span>
                            <p className="wrapper">{this.showMessage(message[1])}</p>
                        </div><img alt='' src={this.state.chat_box_user.photo} class="avatar" />
                        </li>

                    )
                }

                index++;
                return 0
            })
        }
        return listItems;
    }
    componentDidMount() {
        this.interval = setInterval(() => this.updateMessages(), 5000);
    }
    updateMessages() {
        if (this.state.show_chat_box) {
            this.props.getMessages(this.state.chat_box_user.id);

        }
    }
   
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    minimizeChatBox() {
        this.setState({ minimize_chat_box: !this.state.minimize_chat_box , show_emoji:false })
    }
    onChange(e) {
        if(e.target.value.indexOf("\n")!==-1){
          this.onSubmit();
          return;
        }
        let value = e.target.value;
        this.setState({ [e.target.name]: value, messageToSend: this.state.messageToSend + value.substring(value.length - 1, value.length) });
      
    }
    onSubmit() {
        if(!this.state.messageToSend  ||this.state.messageToSend.length === 0)
          return;
        const messageToSend = {
            "content": this.state.messageToSend,
            "sender": this.props.currentUser.user.id,
            "receiver": this.state.chat_box_user.id
        }
        this.props.senMessage(messageToSend);
        this.setState({ message: ""  , messageToSend:""});
    }
    scrollToBottom = () => {
        if (this.messagesEnd)
            this.messagesEnd.scrollIntoView({  });
    }

    closeChatBox() {
        this.setState({ show_chat_box: false , show_emoji:false });
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    createChatBox() {
        const result =
            <div id="chat_box" style={{ width: "400px" }}>
                <div class="title" onClick={this.minimizeChatBox} style={{ backgroundColor: "black", color: "white" }}><span id="state" class={this.state.chat_box_user.state === 1 ? "online" : "offline"}></span>{this.state.chat_box_user.username}<a  onClick={this.closeChatBox.bind(this)} class="fa"  style={{fontSize:'18px',color:'white',position:'fixed',left:'575px',textDecoration:'none' }}>&#xf00d;</a><a  onClick={this.minimizeChatBox} class="fa fa-eye-slash" style={{ color:'white',textDecoration:'none',marginLeft:'270px' }} ></a></div>
                {!this.state.minimize_chat_box && <div class="box_body">
                    <div class="msg_list"><a href="#" class="more">view more</a><ul style={{ overflowY: "auto" }}>
                        {this.createMessagesList()}
                        <div style={{ float: "left", clear: "both" }}
                            ref={(el) => { this.messagesEnd = el; }}>
                        </div>
                    </ul><div class="clear"></div></div>
                    <div class="send_msg"><textarea name="message" value={this.state.message}
                        onChange={this.onChange}
                    ></textarea>

                        <div className="col-md-12  text-right ">
                            <button type="submit" className="btn btn-dark" onClick={this.onSubmit} > Send </button>
                            <button  className="btn btn-warning" style={{position:'fixed' , left:'550px',backgroundColor:'#BA3D07'}} onClick={this.showOrHideEmojis.bind(this)} > Emoji </button>
                        </div>
                    </div>

                </div>}
            </div>


        return result;
    }
    execludeCategories() {
        const ex = ['categories.recent'];
        return ex;
    }
    showOrHide() {
        this.setState({ show: !this.state.show })
    }
    render() {
        console.log(this.props.currentUser.user);
        const loggedIn = (localStorage.jwtToken ? true : false);
        
        return (
            <div >
                
                {loggedIn && <div id="user_online" style={{ top: "100px" }} >
                
                    <div class="title" style={{ backgroundColor: "#BA3D07", top: "100px", color: "white" }}>
                    <span class="chat-icon" ></span>Users
	        	</div>
                  
                    <div class="scroll">
                        <ul>
                            {this.createUsersList()}
                        </ul>
                    </div>
                    
                </div>}
                {this.state.show_chat_box && this.createChatBox()}
                 <span className={this.state.show_emoji?"show_emoji":"hide_emoji"}  >
                    <Picker set='google'  style={{ border:"solid 1px black" , position: 'fixed', backgroundColor: "white", bottom: '37px', left: '540px', zIndex: '25' }}  showPreview={false} onSelect={this.addEmoji.bind(this)} />
                </span>

            </div>
        )
    }
}
const mapStateToProps = state => ({
    user: state.admin,
    currentUser: state.security,
    chat: state.chat

})
export default connect(mapStateToProps, { getMessages, senMessage, getUserList })(Chat)
