import React from 'react';

export default class Navbar extends React.Component {
   render() {
      return (
         <nav id='navbar'>
            <div className='nav-wrapper'>
               <a className='brand-logo left' href='/'>Home</a>
               <ul id='nav-mobile' className='right hide-on-sm-and-down'>
                  <li><a href='/chart'>Custom Charts</a></li>
                  <li><a href='/create'>Create</a></li>
                  <li><a href='/calendar'>Calendar</a></li>
               </ul>
            </div>
         </nav>
      );
   }
}
