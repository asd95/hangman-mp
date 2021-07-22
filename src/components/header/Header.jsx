import React from 'react';
import './Header.style.scss';

const Header = () => {
    return (
        <header className='header'>
            <h1 className="header__title">Hangman</h1>
            <h2 className="header__subtitle">Enter a letter to find word.</h2>
        </header>
    );
}

export default Header;
