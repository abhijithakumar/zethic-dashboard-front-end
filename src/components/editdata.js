import React, { component } from 'react';
import {withAuthHeader} from 'react-auth-kit';
import SideBar from '../components/sidebar';
import Header from '../components/header';
import axios from 'axios';
import { BASEURL } from '../constants';






class EditData extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

            error: null,
          isLoaded: false,
          items: null,
        }

    }
      componentDidMount() {
        fetch(BASEURL+'/edituserdata/'+window.location.pathname.split('/').reverse()[0], { 
            method: 'get', 
            headers: new Headers({
                'Authorization':this.props.authHeader , 
                'Content-Type': 'application/json'
            }), 
        })
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                employee_id:result.items.employee_id,
                name:result.items.name,
                email: result.items.name,
                building_no: result.items.user_address.building_no,
                street_name: result.items.user_address.street_name,
                city: result.items.user_address.city,
                state: result.items.user_address.state,
                country: result.items.user_address.country,
                pincode: result.items.user_address.pincode,
                role: result.items.role,
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
      handleHtmlControlChange = (event) => {
          
        this.setState({ [event.target.name]: event.target.value })
        console.log(event.target.value);
    }
      handleSubmit = (event) => {
        console.log(this.state.items);
        console.log(this.props.authState)

        event.preventDefault();
        axios.post(BASEURL+'/edituser/'+window.location.pathname.split('/').reverse()[0], {
            employee_id:this.state.employee_id,
            name:this.state.name,
            email:this.state.email,
            building_no:this.state.building_no,
            street_name:this.state.street_name,
            city:this.state.city,
            state:this.state.state,
            country:this.state.country,
            pincode:this.state.pincode,
            role:this.state.role,
        },
         {
            headers: {
              'Authorization':this.props.authHeader,
              'Content-Type': 'application/json'
            }
         }).
            then(response => {
                console.log(response)
                this.setState({ message: "User created successfuly." })
            }).catch(error => {
                console.log(error)
            })
    }



    render() {
        if(!this.state.items)
        {
            return <h1>Loading...</h1>
        }
        
        return (            
            <div>
                <Header></Header>
                <div className='container'>
                    <SideBar></SideBar>
                    <div className="card bg-white mb-3 my-5  offset-sm-3">
                        <div className="card-header">Header</div>
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Employee ID</label>
                                    <input type="number" className="form-control" name='employee_id' defaultValue={this.state.items.employee_id}  onChange={this.handleHtmlControlChange}></input>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-control" id="exampleInputName1" name='name' defaultValue={this.state.items.name}  onChange={this.handleHtmlControlChange}></input>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" name='email' defaultValue={this.state.items.email}   onKeyUp={this.handleHtmlControlChange}></input>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Building No</label>
                                    <input type="text" className="form-control" name='building_no' defaultValue={this.state.items.user_address.building_no}  onChange={this.handleHtmlControlChange}></input>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Street Name</label>
                                    <input type="text" className="form-control" name='street_name' defaultValue={this.state.items.user_address.street_name}  onChange={this.handleHtmlControlChange}></input>

                                </div>
                                <div className="mb-3">
                                    <label className="form-label">City</label>
                                    <input type="text" className="form-control" name='city' defaultValue={this.state.items.user_address.city}  onChange={this.handleHtmlControlChange}></input>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">State</label>
                                    <input type="text" className="form-control" name='state' defaultValue={this.state.items.user_address.state}  onChange={this.handleHtmlControlChange}></input>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Country</label>
                                    <input type="text" className="form-control" name='country' defaultValue={this.state.items.user_address.country}  onChange={this.handleHtmlControlChange}></input>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Pincode</label>
                                    <input type="text" className="form-control" name='pincode' defaultValue={this.state.items.user_address.pincode}  onChange={this.handleHtmlControlChange}></input>
                                </div>
                                <div className="mb-3">
                                    <select name="role" defaultValue={this.state.items.role ?? "employee"} onChange={this.handleHtmlControlChange}>
                                        <option value="admin">Admin</option>
                                        <option value="employee">Employee</option>
                                    </select>
                                </div>
                                
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}


export default withAuthHeader(EditData);