import React from 'react';
import { connect } from 'react-redux';
import { login } from './actions';
import Loader from 'react-loader'
import Flash from './Flash'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoaded: true,
      error: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  toggleLoader() {
    this.setState({ isLoaded: !this.state.isLoaded });
  }

  onSubmit(e) {
    e.preventDefault();
      this.toggleLoader()
      this.props.login(this.state).then(
        (res) => {
          this.setState({error: false})
          this.toggleLoader()
          this.context.router.push('/welcome')
          this.setState({error: false})},
        
        (err) => {
            this.toggleLoader()
            this.setState({error: true})
        });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { isLoaded, error } = this.state;
    const { username, password } = this.state;

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
            <h1>Log in!</h1>
            <div className="form-group">
              <label htmlFor="username"></label>
              <input placeholder="username" type="text" id="username" name="username"
                     value={username} onChange={this.onChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="password"></label>
              <input type="password" placeholder="password" id="password" name="password"
                     value={password} onChange={this.onChange}/>
            </div>
            <button className="button-content">
              Log In
            </button>
          </form>
        </div>
    )
    return (
      <div>
        {error ?  <Flash/> : null}
        {isLoaded ?  showForm : loadedContent}
      </div>
    );
  }
}

LoginForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

LoginForm.propTypes = {
  login: React.PropTypes.func.isRequired
}



export default connect(null, { login })(LoginForm);
