import React, { component } from 'react';
import axios from 'axios'
import SideBar from '../components/sidebar';
import Header from '../components/header';
import { withAuthHeader } from 'react-auth-kit';
import { BASEURL } from '../constants';



class AddEmployee extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            email: "",
            password: "",
            building_no: "",
            street_name: "",
            city: "",
            state: "",
            country: "",
            pincode: "",
            role: "",
            employee_id: '',
        }

    }

    handleHtmlControlChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleChange = (event) => {
        this.setState({ data: Array.from(event.target.selectedOptions, (item) => item.value) });
    }

    handleSubmit = (event) => {
        console.log(this.state);
        console.log(this.props.authState)

        event.preventDefault();
        axios.post(BASEURL+'/adduser', this.state,
            {
                headers: {
                    'Authorization': this.props.authHeader,
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
                                    <label className="form-label">Name</label>
                                    <input required type="text" className="form-control" id="exampleInputName1" name='name' value={this.state.name} onChange={this.handleHtmlControlChange}></input>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email address</label>
                                    <input required type="email"  className="form-control" id="exampleInputEmail1" name='email' value={this.state.email} onChange={this.handleHtmlControlChange}></input>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input required type="password" className="form-control" name='password' value={this.state.password} onChange={this.handleHtmlControlChange}></input>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Employee ID</label>
                                    <input required type="number" className="form-control" name='employee_id' value={this.state.employee_id} onChange={this.handleHtmlControlChange}></input>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Building No</label>
                                    <input required type="text" className="form-control" name='building_no' value={this.state.building_no} onChange={this.handleHtmlControlChange}></input>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Street Name</label>
                                    <input required type="text" className="form-control" name='street_name' value={this.state.street_name} onChange={this.handleHtmlControlChange}></input>

                                </div>
                                <div className="mb-3">
                                    <label className="form-label">City</label>
                                    <input required type="text" className="form-control" name='city' value={this.state.city} onChange={this.handleHtmlControlChange}></input>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">State</label>
                                    <input required type="text" className="form-control" name='state' value={this.state.state} onChange={this.handleHtmlControlChange}></input>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Country</label>
                                    <input required type="text" className="form-control" name='country' value={this.state.country} onChange={this.handleHtmlControlChange}></input>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Pincode</label>
                                    <input required type="text" className="form-control" name='pincode' value={this.state.pincode} onChange={this.handleHtmlControlChange}></input>
                                </div>
                                <div className="mb-3">
                                    <select value={this.state.role ?? "Employee"} name="role" onChange={this.handleHtmlControlChange}>
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


export default withAuthHeader(AddEmployee);