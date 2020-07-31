/** @jsx jsx */
import { useState } from 'react';
import { css, jsx } from '@emotion/core';

import BeerItem from '../Beer/BeerItem';
import { apiKey } from '../secrets.json';

import ClipLoader from "react-spinners/ClipLoader";

const beerStyles = css `
  background-color: #e9ebee;
  justify-content: center;
  align-content: center;
  text-align: center;
  padding: 30px;
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

export const Search = () => {
  const [page, setPage] = useState(1);
  const [beerQuery, setBeerQuery] = useState('')
  const [maxPage, setMaxPage] = useState(null);
  const [error, setError] = useState(null);
  const [beerList, setBeerList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const nextPage = () => {
    setIsLoading(true);
    setPage(page + 1);
    search(beerQuery);
    window.scrollTo(0, 0);
    
  };

  const prevPage = () => {
    setIsLoading(true);
    setPage(page - 1);
    search(beerQuery);
    window.scrollTo(0,0);
    // if (page > 1) {
      
    // }
  }

  const search = (query) => {
    setIsLoading(true);
    if (!apiKey) {
      setError("Oops! Looks like the API key in secrets.json is blank. Make sure to add a valid key if you want to see any data.")
      return;
    }
    else {
      setError(null);
    }

    const proxyUrl = 'https://shrouded-journey-35897.herokuapp.com/';
    const targetUrl = `https://sandbox-api.brewerydb.com/v2/search?q=${query}&type=beer&key=${apiKey}&p=${page}`
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
  }

  return (
    <div css={beerStyles}>
      <div css={{marginBottom: '20px'}}>
        <h1>Search for a beer</h1>
        <input onChange={event => setBeerQuery(event.target.value)} placeholder="Enter beer" />
        <button onClick={()=>{search(beerQuery)}}>Search</button>
      </div>
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
        : beerList && beerList.length > 0 &&
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
      {/* </ul> */}
      <div css={{textAlign: 'center', padding: '20px'}}>
        {!isLoading && beerList && beerList.length > 0 && page > 1 && <button css={button} onClick={()=>{prevPage()}}>← Previous page</button>}
        {!isLoading && beerList && beerList.length > 0 && page < maxPage && <button css={button} onClick={()=>{nextPage()}}>Next page →</button>}
      </div>
    </div>
  )
}
