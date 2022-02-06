import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {getAllTutorials} from '../../actions/TutorialAction'

 class Tutorials extends Component {
     componentWillMount(){
         this.props.getAllTutorials();
     }
    showTutorials() {
        const list = this.props.tutorial.list?this.props.tutorial.list : [];
        let listItems = [];
        let index = 1;
        list.map(tutorial => {
            listItems.push(<div class="col">


                <div id="post-frame-small">
                    <h1 class="title" >
                        <Link to={"/viewTutorial/"+tutorial.id}>
                            <span >{tutorial.title}</span>
                        </Link>
                    </h1>
                    <div class="user-bar">
                        <div class="photo">
                            <Link to={"/profile/"+tutorial.teacher.id}><img alt='' src={tutorial.teacher.userInfo.photo + ".png"} /></Link>
                        </div>
                        <div class="meat">
                            <h2>
                                <Link to={"/profile/"+tutorial.teacher.id}> by {tutorial.teacher.username}</Link>
                            </h2>
                            at {tutorial.createAt}. {tutorial.nbrVisitor} views . {tutorial.nbrComment} comments
                                <div class="right">
                                <Link to={"/viewTutorial/"+tutorial.id} >View</Link>
                            </div>
                        </div>
                        <div class="clear"></div>
                    </div>
                </div>


            </div>)
            if(index === 2){
                listItems.push(<div class="w-100"></div>)
                index = 1;
            }else{
                index ++;
            }
            return null
        })
        return listItems;
    }
    render() {
        return (
            <div >
            
                <div class="container wrapper">     
                <h3 className="bold font22" style={{color:"black"}}>Tutorials</h3>
                    <div class="row">
                       {this.props.user.user.type === 3 && <div class="col"><Link  to ="/newTutorial" class="btn btn-primary bold">Add </Link></div>}
                        {this.showTutorials()}
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    tutorial: state.tutorial,
    user:state.security
   
});

export default connect(mapStateToProps,{getAllTutorials})(Tutorials);
