import React, { component } from 'react';
import { Link } from 'react-router-dom';
import { BASEURL } from '../constants';
import { withAuthHeader } from 'react-auth-kit';

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch(BASEURL + '/getuserrole', {
      method: 'get',
      headers: new Headers({
        'Authorization': this.props.authHeader,
        'Content-Type': 'application/json'
      }),
    })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    console.log(this.props.authHeader)
    if (!this.state.items) {
      return (<h3>Loading...</h3>)
    }
    if (this.state.items == "admin") {
      console.log('aaa')
      return (
        <div className='container'>

          <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">

                <li className="nav-item add-employee">
                  <Link className="nav-link active" aria-current="page" to="/adduser">
                    <span data-feather="home"></span>
                    Add Employee
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/edituser">
                    <span data-feather="home"></span>
                    Edit Employee
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/viewuser" aria-current="page" >
                    <span data-feather="home"></span>
                    View Employee
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      )
    }
    else {
      console.log(this.state.items)
      return (
        <div className='container'>
          <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link className="nav-link active" to="/viewuser" aria-current="page" >
                    <span data-feather="home"></span>
                    View Employee
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      );
    }
  }
}


export default withAuthHeader(SideBar);
