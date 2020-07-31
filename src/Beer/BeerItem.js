/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { NavLink } from 'react-router-dom';

const articleStyles = css`
  background-color: white;
  margin: 15px;
  padding: 10px;
  display: inline-block;
  width: 250px;
  height: 180px;
  box-shadow: 2px 2px 1px #dddfe2;
  vertical-align: top;
  border-radius: 3px;
  border-color: #dddfe2;
  border-width: 1px;
  border-style: solid;
`;

const beerNameStyles = css`
  font-size: 20px;
`;

const imgContainerStyles = css`
  float: left;
  padding-left: 5px;
  padding-right: 5px;
`;

const link = css`
  text-decoration: none;
  color: #4E71EA;
`;

const BeerItem = ({ id, name, category, abv, ibu, labels }) => {
  return (
    <li css={articleStyles}>
      <div css={{"padding-bottom": "12px"}}>
        <div css={imgContainerStyles}>{labels && <img src={labels.icon} alt={name}/>}</div>
        <NavLink css={link} to={`/beer/${id}`}><h1 css={beerNameStyles}>{name}</h1></NavLink>
      </div>
      <p css={{textAlign: 'center', paddingTop: '5px'}}>{category}</p>
	    <p css={{"fontStyle": "italic", textAlign: 'center'}}>abv: {abv} ibu: {ibu}</p>
    </li>
  );
}

export default BeerItem;
