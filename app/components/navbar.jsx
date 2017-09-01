import React, { Component } from 'react';
import { Route, Switch, Link } from "react-router-dom";

export default function Navbar(){
  return (
            <nav className = "navbar navbar-light">
               <ul className="nav nav-pills">
                  <Link to= "/">
                    <li className="active">Home <span className="sr-only">(current)</span></li>
                  </Link>
                  <Link to= "/campuses">
                    <li>Campuses</li>
                  </Link>
                  <Link to= "/students">
                    <li>Players</li>
                  </Link>
                </ul>
          </nav>
         )
}
