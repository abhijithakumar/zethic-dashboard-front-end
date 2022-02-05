import React, { component } from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../components/sidebar';
import { BASEURL } from '../constants';
import { withAuthHeader } from 'react-auth-kit';




class EditEmployee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        };
      }

      componentDidMount() {
        fetch(BASEURL+'/viewuser', { 
            method: 'get', 
            headers: new Headers({
                'Authorization':this.props.authHeader, 
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
        return (
            <div className='container'>
                        <SideBar></SideBar>

                <h2>Section title</h2>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">Employee ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Building No</th>
              <th scope="col">Street Name</th>
              <th scope="col">City</th>
              <th scope="col">State</th>
              <th scope="col">Country</th>
              <th scope="col">Pincode</th>
            </tr>
            
          </thead>
          <tbody>
          {(this.state.items ?? []).map(item =>
            <tr key={item.id}>
              <td>{item.employee_id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.user_address.building_no}</td>
              <td>{item.user_address.street_name}</td>
              <td>{item.user_address.city}</td>
              <td>{item.user_address.state}</td>
              <td>{item.user_address.country}</td>
              <td>{item.user_address.pincode}</td>
              <td><Link to={"/editdata/"+item.id}>Edit</Link></td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
            </div>
        );
    }

}


export default withAuthHeader(EditEmployee);