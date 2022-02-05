import React, { component } from 'react';
import axios from 'axios';
import { withSignIn,PrivateRoute } from 'react-auth-kit';
import { BrowserRouter as Router, Route, Routes,BrowserRouter } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Home from './home';
import { BASEURL } from '../constants';



class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            isSigned: false
        }

    }

    handleHtmlControlChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleSubmit = (event) => {
        console.log(this.state);
        event.preventDefault();
        axios.post(BASEURL+'/login', this.state).
            then(response => {
                console.log(response.data.token)
                if (this.props.signIn({
                    expiresIn: 5000,
                    token: response.data.token,
                    tokenType: "Bearer",
                    authState: response.data.authUserState,
                })) {
                    this.setState({isSigned: true });
                    console.log(response.data.token)
                    
                } else {
                    console.log('error signin');
                    //Throw error
                }
                this.setState({ message: "User created successfuly." })
            }).catch(error => {
                console.log(error)
            })
    }
    render() {
        if(this.state.isSigned)
        {
            return <Navigate to="/dashboard"></Navigate>
        }

        return (
            <div className='container'>
                <div className='row'>
                    <div className="card col-6 bg-white mb-3">
                        <div className="card-header">Header</div>
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={this.state.email} onChange={this.handleHtmlControlChange}></input>
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={this.state.password} onChange={this.handleHtmlControlChange}></input>
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


export default withSignIn(Login);