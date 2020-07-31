/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import {
  NavLink,
} from 'react-router-dom';

const navStyles = css`
  margin: 0px;
  padding: 0px;
  background-color: #3B5998;
  color: white;
`;

const ulStyles = css`
  margin: 0;
  padding: 0;
  list-style-type: none;
  overflow: hidden;
`;

const navItemStyles = css`
  a {
    font-weight: bold;
    float: left;
    display: block;
    padding: 16px 24px;
    text-decoration: none;
    color: white;
    font-size: 16px;
  }
  .active {
    background-color: #4E71EA;
    color: whitesmoke;
  }
`;

const navItemStylesRight = css`
  ${navItemStyles}
  a {
    float: right;
  }
`;

export const NavBar = () => {
  return(
    <nav css={navStyles}>
      <ul css={ulStyles}>
        <li css={navItemStyles}>
          <NavLink exact to="/">Home</NavLink>
        </li>
        <li css={navItemStyles}>
          <NavLink to="/beer">Beer</NavLink>
        </li>
        <li css={navItemStyles}>
          <NavLink to="/hops">Hops</NavLink>
        </li>
        <li css={navItemStyles}>
          <NavLink to="/random">Random</NavLink>
        </li>
        <li css={[navItemStyles, navItemStylesRight]}>
          <NavLink to="/search">Search</NavLink>
        </li>
      </ul>
    </nav>
  );
}