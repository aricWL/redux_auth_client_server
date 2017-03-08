import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from './actions';
import './index.css'

class NavigationBar extends React.Component {
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const userLinks = (
      <a href="#" className="butt" onClick={this.logout.bind(this)}>Logout</a>
    );

    const guestLinks = (
        <div className="">
          <Link className="butt" to="/signup">Sign up</Link>
          <Link className="butt" to="/login">Login</Link>
        </div>
    );

    return (
        <div className="heading">
            <div className="nav-title center">
              <Link to="/" className="">Holy SH*T PUPPIES!</Link>
            </div>

            <div className="nav-links">
              {this.props.auth ? userLinks : guestLinks}
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
