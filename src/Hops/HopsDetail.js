/** @jsx jsx */
import { useState, useEffect } from 'react';
import { css, jsx } from '@emotion/core';
import {useParams} from 'react-router-dom';

import { apiKey } from '../secrets.json';
import ClipLoader from "react-spinners/ClipLoader";

const descriptionStyles = css`
  font-size: 20px;
  padding: 10px;
  margin: 10px;
`;

const hopsNameStyles = css`
   padding: 10px;
   margin: 0px;
`;

const countryContainerStyles = css`
  padding: 10px;
  margin: 0px;
`;

const loadingContainer = css`
    position: absolute;
    top: 50%;
    left: 50%;
    -moz-transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
`;

const errorStyles = css`
  color: red;
  font-size: 20px;
   padding: 5px;
`;

const HopsDetail = () => {
  const { hopsId } = useParams();
  const [error, setError] = useState(null);
  const [hops, setHops] = useState(null);
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
    const targetUrl = `https://sandbox-api.brewerydb.com/v2/hop/${hopsId}/?key=${apiKey}`
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
		console.info(response);
        setHops(response.data);
        setIsLoading(false);
      })
      .catch(error => console.log(error));
  }, [hopsId]);

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
    console.info(hops);
    return (
      <div>
	  <h1 css={hopsNameStyles}>{hops.name}</h1>
	  <p css={countryContainerStyles}>{hops.country.displayName}</p>
	  <p css={descriptionStyles}>Description: {hops.description}</p>
      </div>
    );
  }
}

export default HopsDetail;
