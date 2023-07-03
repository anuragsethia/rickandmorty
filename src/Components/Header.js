import React from 'react'
import morty from '../Images/morty.png';

export const Header = () => {
    return (
        <>
            <header className="header">
                <nav className="navbar bg-body-tertiary">
                    <div className="container">
                        <a className="navbar-brand" href="/">
                            <img src={morty} alt="Rick and Morty" width="44" height="34" />
                        </a>
                        <h1>Rick & Morty Profiles</h1>
                    </div>
                </nav>
            </header>
        </>
    )
}
