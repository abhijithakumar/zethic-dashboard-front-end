import React, { component } from 'react';
import SideBar from './sidebar';
import Header from './header';


class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        return (
            <div>
                <Header></Header>
                <div className='container'>
                    <div className='row'>
                        <SideBar></SideBar>
                    </div>
                </div>
            </div>
        );
    }

}


export default Home;