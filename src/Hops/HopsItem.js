/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { NavLink } from 'react-router-dom';

const articleStyles = css`
  /* background-color: white;
  width: 50vw;
  margin: auto;
  padding: 20px;
  border-radius: 3px;
  border-color: #dddfe2;
  border-width: 1px;
  border-style: solid;
  margin-bottom: 30px; */
  background-color: white;
  margin: 15px;
  padding: 10px;
  display: inline-block;
  width: 250px;
  height: 100px;
  box-shadow: 2px 2px 1px #dddfe2;
  vertical-align: top;
  border-radius: 3px;
  border-color: #dddfe2;
  border-width: 1px;
  border-style: solid;
`;

const hopsNameStyles = css`
  font-size: 20px;
`;

const link = css`
  text-decoration: none;
  color: #4E71EA;
`;

const HopsItem = ({ id, name, country}) => {
  return (
    <li css={articleStyles}>
        <NavLink css={link} to={`/hops/${id}`}><h1 css={hopsNameStyles}>{name}</h1></NavLink>
      <p>{country}</p>
    </li>
  );
}

export default HopsItem;
