/** @jsx jsx */
import { useState, useEffect } from 'react';
import { css, jsx } from '@emotion/core';
import {useParams} from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";

import { apiKey } from '../secrets.json';

const descriptionStyles = css`
font-size: 20px;
padding: 10px;
padding-top: 0px;
margin-left: 10px;
margin-top: 0px;

`;

const beerNameStyles = css`
padding: 10px;
margin: 0px;
`;

const imgContainerStyles = css`
  float: left;
padding: 10px;
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

const BeerDetail = () => {
  const { beerId } = useParams();
  const [error, setError] = useState(null);
  const [beer, setBeer] = useState(null);
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
    const targetUrl = `https://sandbox-api.brewerydb.com/v2/beer/${beerId}/?key=${apiKey}`
    console.info(`Making data request to ${targetUrl}`);
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
  }, [beerId]);

  if (isLoading) {
    return (<div css={loadingContainer}>
      { error
      ? <p css={error && errorStyles}>error</p>
      : <ClipLoader
          size={150}
          color={"#3B5998"}
          loading={isLoading} />
      }
    </div>)
  }
  else {
    console.info(beer);
    return (
      <div>
        <div css={imgContainerStyles}>{beer.labels && <img src={beer.labels.icon} alt={beer.name}/>}</div>
        <h1 css={beerNameStyles}>{beer.name}</h1>
        <p>{beer.category}</p>
        <p css={{"fontStyle": "italic", "padding": "10px", "margin-bottom": "0px", "padding-bottom": "0px"}}>
          abv: {beer.style && beer.style.abvMin && beer.style.abvMax ? `${beer.style.abvMin} - ${beer.style.abvMax}` : 'N/A'}
        </p>
        <p css={{"fontStyle": "italic", "padding": "10px", "margin": "0px"}}>
          ibu: {beer.style && beer.style.ibuMin && beer.style.ibuMax ? `${beer.style.ibuMin} - ${beer.style.ibuMax}` : 'N/A'}
        </p>
        <p css={descriptionStyles}>Description: {beer.style && beer.style.description}</p>
      </div>
    );
  }
}

export default BeerDetail;
