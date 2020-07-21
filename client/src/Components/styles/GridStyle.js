import styled from 'styled-components';

export const GridStyle = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  h1 {
    font-family: 'Abel', sans-serif;
    font-size: 42px;
    @media screen and (max-width: 768px) {
      font-size: 22px;
    }
  }
`;

export const GridContentStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minMax(100px, 1fr));
  grid-gap: 40px;
  position: relative;
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(4, minMax(100px, 1fr));
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(3, minMax(100px, 1fr));
  }
  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(2, minMax(100px, 1fr));
  }
  @media screen and (max-width: 375px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
