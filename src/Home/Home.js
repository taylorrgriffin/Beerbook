/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const containerStyles = css`
  text-align: center;
`;

const beerIconStyles = css`
  font-size: 100px;
`;

export const Home = () => {
  return (
    <div css={containerStyles}>
      <h1>beerbook</h1>
      <p>A place to learn about all your favorite beers. Select a tab to get started!</p>
      <div css={beerIconStyles}><span role="img" aria-label="beer emoji">🍺</span></div>
      <h2>Cheers!</h2>
    </div>
  )
}