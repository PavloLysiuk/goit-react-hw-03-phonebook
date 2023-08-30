import styled from 'styled-components';

export const SearchInput = styled.input`
  /* margin-bottom: 24px; */
  padding: 8px 16px;
  width: 100%;

  border-radius: 4px;
  border: 1px solid #40bfff;

  &::placeholder {
    padding: 0;
    margin: 0;
    font-size: 14px;
    color: #40bfff;
  }
`;
