import React from 'react';
import { Link } from 'react-router-dom';

import './LandingPage.css';

class landingPage extends React.Component {
    
    render() {
        return (
            <div className='backgroundImage'>
                <div className='container'>
                    <h1 className='title'>Henry Dogs</h1>
                    <Link to={`/home`}>
                        <button className='buttonHome'>Home</button>
                    </Link>
                </div>
            </div>

    )}
};

export default landingPage;