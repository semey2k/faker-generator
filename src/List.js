import React from 'react';
import styled from 'styled-components';
import { CSVLink } from 'react-csv';

const List = ({ items, headers }) => (
  <Container>
    {items.map((el, index) => (
      <ItemContainer key={index}>
         <Item>
          {index + 1}
        </Item>
        <Item>
          <span>Full Name:</span>
          {el.name}
        </Item>
        <Item>
          <span>ID:</span>
          {el.id.slice(0, 5)}
        </Item>
        <Item>
          <span>City:</span>
          {el.city}
        </Item>
        <Item>
          <span>Street:</span>
          {el.street}
        </Item>
        <Item>
          <span>Phone Number:</span>
          {el.phone}
        </Item>
        <CSVLink className="btn" data={[el]} headers={headers} separator={';'}>
          Download CSV
        </CSVLink>
      </ItemContainer>
    ))}
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ItemContainer = styled.div`
  background: #fff;
  position: relative;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  min-width: 400px;
  margin-bottom: 20px;
  transition: all 0.3s ease-in-out;

  
  .btn {
    display: inline-block;
    padding: 10px 15px;
    background-color: #1976d2;
    border-radius: 5px;
    font-size: 0.9375rem;
    margin-top: 10px;
    margin-bottom: 5px;
    color: #fff;
    text-decoration: none;
    text-transform: uppercase;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%),
      0px 1px 5px 0px rgb(0 0 0 / 12%);
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: #1565b5;
    }
  }

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;
const Item = styled.div`
  margin: 10px 0;

  &:first-child{
    position: absolute;
    right: 25px;
    top: 0;
    font-size: 18px;
    font-weight: bold;
  }

  &:nth-child(2){
    margin-top: 20px;
  }

  span {
    margin-right: 5px;
    font-weight: bold;
  }
`;

export default List;
