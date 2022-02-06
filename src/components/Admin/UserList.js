import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserList } from '../../actions/userActions';
import { SERVER_URL } from '../../actions/types';

import {deleteUser , blockUnBlockUser ,activateUser } from '../../actions/AdminAction';
import {lastVisitInMinutes}  from '../../components/utils/Time'


class UserList extends Component {

    constructor(){
        super();
        this.state = {
            changed:false
        }
    }
    
    componentWillMount() {
        this.props.getUserList();
    
    }
    getUserState(state){

        switch (state) {
            case 1:
            return (<td className="text-success" >OK</td>)
            
            case 5:
            return(<td className="text-default">Waiting for Confirmation...</td>)
            
            case 4:
            return(<td className="text-warning">Waiting for Activation...</td>)
            
            case 3:
            return(<td className="text-danger">Blocked!!!</td>)
            case 2:
            return(<td className="text-success">Online</td>)
            default:
                return ''
            

        }

    }
    
   

    deleteUser(id){
        this.props.deleteUser(id);
        
      }
    blockUnblock(id , index ){
      this.props.blockUnBlockUser(id , index);
      this.forceUpdate();
    }

    activateUser(id , index){
            this.props.activateUser(id,index);
    }
    createUserList(){
        let listItems = [];
        const list = this.props.user.userList;
        if(list.length > 0){
            let index = 0;
            list.map(user => {
                listItems.push(
                    <tr class={user.type === 2 ?"table-info":(user.type === 3 ? "table-warning":"")}>
                    <td><a href={"/profile/"+user[0]}><img alt='' src={user[5]?(SERVER_URL + user[5] + ".min.png") : "/images/no-avatar.th.png"} class="avatar" /></a></td>
                    <td>{user[0]}</td>
                    <td>{user[1]}</td>
                    <td>{lastVisitInMinutes(user[7]) + " min ago"}</td>
                    {
                        this.getUserState(user[3])
                    }
                    <td id={"user_id_"+user.id} className="text-center"> <button type="submit" className="btn btn-danger btn-sm"  onClick= {this.deleteUser.bind(this , user[0])}>delete</button>
                    {user[3] !== 5 && user[3] !== 4 &&<button type="submit" onClick= {this.blockUnblock.bind(this , user[0] , index)} id= {user[3] === 3?"unblock":"block"} className="btn btn-warning btn-sm">{user[3] === 3?"Unblock":"Block"}</button>}
                    {user[3] === 4 && <button type="submit" id = {user[0]} onClick = {this.activateUser.bind(this , user[0] ,index)} className="btn btn-success btn-sm">Activate</button>}
                   
                    </td>
                    </tr>
                )
                index++;
                return null
            })
        }

        return listItems;

    }
    render() {
      
   
        return (
            <section class="home_banner_area">

                <div class="banner_inner">

                    <div class="container">
                        <div class="row" >
                            <div class="col-lg-12">
                            <h3 className="text-center"> List of users</h3>
                                <table class="table table-striped w-table-fixed">
                                    <thead>
                                        <tr>
                                        <th className="text-center">Picture</th>
                                            <th className="text-center">user ID</th>
                                            <th className="text-center">Username</th>
                                            <th className="text-center">last visit</th>
                                            <th className="text-center">State</th>
                                            <th className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                  {this.createUserList()}
                                    
                                     
                                    
                                   
                                    </tbody>


                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    user: state.admin
});

export default connect(mapStateToProps, {deleteUser,blockUnBlockUser,activateUser,getUserList })(UserList);
