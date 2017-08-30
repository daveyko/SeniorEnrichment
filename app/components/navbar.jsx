import React, { Component } from 'react';
import { Route, Switch, Link } from "react-router-dom";

export default function Navbar(){
  return (
          <nav className = "navbar navbar-default">
            <div className = "container-fluid">
               <ul className="nav nav-pills">
                  <Link to= "/campus">
                    <li className="active">Home <span className="sr-only">(current)</span></li>
                  </Link>
                  <Link to= "/students">
                    <li>Students</li>
                  </Link>
                </ul>
            </div>
          </nav>
         )
}
