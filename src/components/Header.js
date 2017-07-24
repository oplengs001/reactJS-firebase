import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

export const Header = () => (
<div>
      <header>
            <nav className="navbar navbar-default">
            <div className="container">
                <div className="navbar-header">
                  <Link to="/user" className="navbar-brand" >Scheduler</Link>
                </div>
                <ul className="nav navbar-nav navbar-right">
                    <li><Link to="/user" >Client </Link></li>
                    <li><Link to="/admin" >Acceptor </Link></li>        
                </ul>
            </div>
            </nav>
        </header>
            <div className="page-header text-center">
    <h1>Schedule City</h1>        
    <p>Real-time scheduling demo using <a href="https://firebase.com">Firebase</a> 
    and <a href="https://facebook.github.io/react/"> ReactJS </a></p>
    </div> 
    </div>
);
