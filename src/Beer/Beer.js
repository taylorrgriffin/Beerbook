/** @jsx jsx */
import { useState, useEffect } from 'react';
import { css, jsx } from '@emotion/core';
import ClipLoader from "react-spinners/ClipLoader";

import BeerItem from './BeerItem';
import { apiKey } from '../secrets.json';

const beerStyles = css `
  background-color: #e9ebee;
  margin: 0px;
`;

const button = css`
  color: white;
  padding: 5px;
  font-size: 20px;
  background-color: #3B5998;
  border-radius: 3px;
  border-color: #dddfe2;
  border-width: 1px;
  border-style: solid;
  cursor: pointer;
  outline: none;
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

export const Beer = () => {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(null);
  const [error, setError] = useState(null);
  const [beerList, setBeerList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const nextPage = () => {
    setIsLoading(true);
    window.scrollTo(0, 0);
    setPage(page + 1);
  };
  
  const prevPage = () => {
    setIsLoading(true);
    window.scrollTo(0,0);
    if (page > 1) {
      setPage(page - 1);
    }
  }

  useEffect(() => {
    if (!apiKey) {
      setError("Oops! Looks like the API key in secrets.json is blank. Make sure to add a valid key if you want to see any data.")
      return;
    }
    else {
      setError(null);
    }
    
    const proxyUrl = 'https://shrouded-journey-35897.herokuapp.com/';
    const targetUrl = `https://sandbox-api.brewerydb.com/v2/beers/?key=${apiKey}&p=${page}`
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
        setBeerList(response.data);
        setIsLoading(false);
        setMaxPage(response.numberOfPages);
      })
      .catch(error => console.log(error));
  }, [page]);

  if (isLoading) {
    return (
      <div css={loadingContainer}>
        { error
        ? <p css={error && errorStyles}>error</p>
        : <ClipLoader
            size={150}
            color={"#3B5998"}
            loading={isLoading} />
        }
      </div>
    )
  }
  else {
    console.info(`maxPage is ${maxPage}`)
    return (
      <div css={beerStyles}>
      <h1 css={{margin: '0px', padding: '10px', fontSize: '36px', textAlign: 'center'}}>Beers</h1>
      <ul css={{margin: '0px'}}>
      {
        beerList.map((beer) => {
        return <BeerItem
          id={beer.id}
          key={beer.id}
          name={beer.name}
          category={beer.style ? beer.style.category.name : null}
          description={beer.style ? beer.style.description : null}
          abv={beer.style && beer.style.abvMin && beer.style.abvMax ? `${beer.style.abvMin} - ${beer.style.abvMax}` : 'N/A'}
          ibu={beer.style && beer.style.ibuMin && beer.style.ibuMax ? `${beer.style.ibuMin} - ${beer.style.ibuMax}` : 'N/A'}
          labels={beer.labels} />
        })
      }
      </ul>
      <div css={{textAlign: 'center', padding: '20px'}}>
        {!isLoading && page > 1 && <button css={button} onClick={()=>{prevPage()}}>← Previous page</button>}
        {!isLoading && page < maxPage && <button css={button} onClick={()=>{nextPage()}}>Next page →</button>}
      </div>
      </div>
    )
  }
}