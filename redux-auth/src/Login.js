import React from 'react';
import { connect } from 'react-redux';
import { login } from './actions';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }


  onSubmit(e) {
    e.preventDefault();
      this.props.login(this.state).then(
        (res) => this.context.router.push('/welcome'),
        (err) => {
        debugger;
        });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { username, password } = this.state;

    return (
      <div>
        <div>
      <form onSubmit={this.onSubmit}>
        <h1>Login</h1>
        <div className="form-group">
            <label htmlFor="username"></label>
            <input placeholder="Username" type="text" id="username" name="username" value={username} onChange={this.onChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="password"></label>
            <input type="password" placeholder="password" id="password" name="password" value={password} onChange={this.onChange}/>
          </div>
        <button type="submit" className="button-content">Login</button>
      </form>
      </div>
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
