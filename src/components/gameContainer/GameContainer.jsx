import React from 'react';
import './GameContainer.style.scss';

const GameContainer = ({children}) => {
    return (
        <div className="game-container">
            {children}
        </div>
    );
}

export default GameContainer;
