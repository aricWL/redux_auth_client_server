import React, { Component } from 'react';
import { getUsers } from './actions';
import Puppies from './Puppies';
import { connect } from 'react-redux';


// const Welcome = (props) => (

//       <div>
//             Welcome! You are logged in!
//             <Puppies/>
//       </div>
//     )

export class Welcome extends Component{

	constructor(props) {
        super(props)
        this.state = {
            users: ""
        }

    }
	componentWillMount(){
		console.log("component before mount")
		this.props.getUsers().then( (res) => {
    		console.log("Promise running")
    		console.log(res.data)
    		this.setState({users: res.data})
    	})
	}

	// usersAll() {  this.props.getUsers().then( (res) => {
 //    		console.log("Prmise running")
 //    		console.log(res.data)
 //    		this.setState({users: res.data})
 //    	})	
	// 	return
	// }	

	render() {

	return (
		<div>
            Welcome! You are logged in!
            State: {this.state.users}
            <Puppies/>
      </div>
	)	
    
		}

}

// Welcome.propTypes = {
//   getUsers: React.PropTypes.func.isRequired
// }

// export default connect(null,{ addPuppy })(Puppies);
export default connect(null,{ getUsers })(Welcome);