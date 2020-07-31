/** @jsx jsx */
import { useState, useEffect } from 'react';
import { css, jsx } from '@emotion/core';
import { NavLink } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";

import { apiKey } from '../secrets.json';

const link = css`
  text-decoration: none;
  color: #4E71EA;
`;

const errorStyles = css`
  color: red;
  font-size: 20px;
`;

const loadingContainer = css`
    position: absolute;
    top: 50%;
    left: 50%;
    -moz-transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
`;

export const Random = () => {
  const [beer, setBeer] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!apiKey) {
      setError("Oops! Looks like the API key in secrets.json is blank. Make sure to add a valid key if you want to see any data.")
      return;
    }
    else {
      setError(null);
    }

    const proxyUrl = 'https://shrouded-journey-35897.herokuapp.com/';
    const targetUrl = `https://sandbox-api.brewerydb.com/v2/beer/random/?key=${apiKey}`
    console.info(`Fetching ${targetUrl}`)
    fetch(proxyUrl + targetUrl,
      {
        method: "GET",
        headers: new Headers({
          Accept: "application/vnd.github.cloak-preview"
        })
      }
    )
      .then(res => res.json())
      .then(response => {
        setBeer(response.data);
        setIsLoading(false);
      })
      .catch(error => console.log(error));
  }, []);
  console.info(beer);
  return (
    <div css={{"text-align":"center"}}>
      <h1 css={{"padding": "10px", "margin-bottom": "0px", "padding-bottom": "0px"}}>Your random beer is...</h1>
      {
        isLoading
        ? <div css={loadingContainer}>
    	  { error
    	  ? <p css={error && errorStyles}>error</p>
    	  : <ClipLoader
    		  size={150}
    		  color={"#3B5998"}
    		  loading={isLoading} />
    	  }
    	</div>
        : <div css={{"margin-left": "10px", "display": "inline-flex"}}>
            <NavLink css={link} to={`/beer/${beer.id}`}><h1>{beer.name}</h1></NavLink>
            <span css={{"font-size":"100px", "text-align":"center"}} role="img" aria-label="beer emoji">🍺</span>
          </div>
      }
    </div>
  )
}
