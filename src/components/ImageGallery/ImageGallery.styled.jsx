import styled from 'styled-components';

export const ImageGalleryList = styled.ul`
display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 10px 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;

export const Error = styled.p`
    color: red;
    font-size: 22px;
    padding-left: 40px;
`;