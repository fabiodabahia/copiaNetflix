import React from 'react';
import './Header.css';

export default ({black}) => {
    return (
        <header className={black ?"black" : ''}>
            <div className="header--logo">
                <img src="https://images-na.ssl-images-amazon.com/images/I/21SEo9itttL.jpg"/>
            </div>
            <div className="header--user">
                <img src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"/>
            </div>
        </header>

    )
}