import React from 'react';
import { Link } from 'react-router-dom';
export const Header = () => (

      <header>
            <nav className="navbar navbar-default">
            <div className="container">
                <div className="navbar-header">
                  <Link to="/user" className="navbar-brand" >Scheduler</Link>
                </div>
                <ul className="nav navbar-nav navbar-right">
                    <li><Link to="/user" >Client</Link></li>
                    <li><Link to="/admin">Acceptor</Link></li>        
                </ul>
            </div>
            </nav>
        </header>
        
);
