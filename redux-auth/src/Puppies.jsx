// import React, {Component} from 'react';
// import {connect} from 'react-redux';
// import { addPuppy , Signup } from './actions';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import { addPuppy } from './actions';


export class PuppyForm extends Component{
    constructor(props) {
        super(props)
        this.state = {
            name:""
        }

    }

    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    onSubmit(e){
        e.preventDefault();
          console.log("Adding a puppy named " + this.state.name)
          // this addPuppy function takes an object that axios can then parse
          this.props.addPuppy(this.state)
    }

    render(){

        return (
            <div id='PuppyForm'>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>Name:
                        <input name='name' onChange={this.onChange.bind(this)}/>
                    </label>
                    <input type='submit' value='Submit'/>
                </form>
            </div>
    )}
}


class Puppies extends Component {


    render(){
        return (
            <div>
                <PuppyForm addPuppy={this.props.addPuppy}/>
            </div>
    )}
}

// Puppies.propTypes = {
//   addPuppy: React.PropTypes.func.isRequired
// }

// export default connect(null,{ addPuppy })(Puppies);
export default connect(null,{ addPuppy })(Puppies);


// DETAILS
// if 2nd param is left blank, componetent will get prop called dispatch
// export default connect(null,{ADD THE EXPORTED ACTION HERE})(Puppies);