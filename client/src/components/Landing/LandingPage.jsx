import React from 'react';
import { Link } from 'react-router-dom';
import dog from '../../img/perro2.png'
import './LandingPage.css';

class landingPage extends React.Component {
    
    render() {
        return (
            <div className='c'>

                <div className='container'>
                    <h1>WELCOME TO</h1>
                    <h1 className='title'>Henry Dogs</h1>
                    <Link to={`/home`}>
                        <button className='buttonHome'>Home</button>
                    </Link>
                </div>

                <div className='backgroundImage'><img  src={dog} width='430px' height='500px'></img></div>
                
            </div>
    )}
};

export default landingPage;