import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from './actions';
import logo from './logo.png';
import './index.css';

class NavigationBar extends React.Component {
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const userLinks = (
      <div>
        <a href="#" className="button-nav" onClick={this.logout.bind(this)}>Logout</a>
      </div>
    );

    const guestLinks = (
        <div>
          <Link className="button-nav" to="/signup">Sign up</Link>
          <Link className="button-nav" to="/login">Login</Link>
        </div>
    );

    const addPuppy = (
      <div>
        <Link className="button-nav" to="/add">+</Link>
      </div>
    );

    return (
        <div className="heading">
            <div className="nav-title center">
              <Link to="/" className="">
                <img className="flex-start" src={logo} className="logo"/>
              </Link>
            </div>

            <div className="nav-links">
              {addPuppy} {this.props.auth ? userLinks : guestLinks}
            </div>

        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.isAuthenticated
  };
}

export default connect(mapStateToProps, { logout })(NavigationBar);
