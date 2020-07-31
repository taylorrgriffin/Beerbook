import React from 'react';
import {
  NavLink,
} from 'react-router-dom';
import '../App.css';

export const ScrollList = ({items}) => (
  <ul className="scrolllist">
    {items.map((item) => {
      return(
        <li className="scrolllist-item"><NavLink className="scrolllist-item-link" to={item.url}>{item.title}</NavLink></li>
      );
    })}
  </ul>
);