import React from 'react';
import {connect} from 'react-redux';
import {signup} from './actions';
import Flash from './Flash'
import Loader from 'react-loader'

class Signup extends React.Component {
    // pretty standard
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            error: false,
            isLoaded: true
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    toggleLoader() {
    this.setState({ isLoaded: !this.state.isLoaded });
    }

    onChange(e) {
        // change a key in state with whatever the name attribute is
        // either username or password
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        this.toggleLoader();
        // make sure we use an arrow function here to correctly bind this to this.context.router
        this.props.signup(this.state).then(() => {
                this.setState({error: false})
                this.toggleLoader()
                // route to /login once signup is complete
                this.context.router.push('/login');
            },
            // if we get back a status code of >= 400 from the server...
            (err) => {
                this.toggleLoader()
                // not forr production - but good for testing for now!
                this.setState({error: true})
            });
    }

    render() {
        const { isLoaded, error } = this.state;

        const loadedContent = (
      <div>
        <div className="loader-wrapper">
          <Loader loaded={isLoaded}></Loader>
        </div>
      </div>
    )

    const showForm = (
        <div>
          <form onSubmit={this.onSubmit}>
            <h1>Sign Up!</h1>
            <div className="form-group">
              <label htmlFor="username"></label>
              <input placeholder="username" type="text" id="username" name="username"
                     value={this.state.username} onChange={this.onChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="password"></label>
              <input type="password" placeholder="password" id="password" name="password"
                     value={this.state.password} onChange={this.onChange}/>
            </div>
            <button className="button-content">
              Sign up
            </button>
          </form>
        </div>
    )
            return (
            <div>  
              {error ?  <Flash/> : null}
              {isLoaded ?  showForm : loadedContent}         
            </div>
            )
    }
}

Signup.contextTypes = {
    router: React.PropTypes.object.isRequired
}
Signup.propTypes = {
    signup: React.PropTypes.func.isRequired
}

export default connect(null, {signup})(Signup);
