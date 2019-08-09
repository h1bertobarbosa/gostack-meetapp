import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 900px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      color: #fff;
      font-size: 32px;
    }
  }

  img {
    height: 300px;
    object-fit: cover;
    border-radius: 4px;
    margin-top: 50px;
  }

  span {
    margin-top: 25px;
    color: #fff;
    font-size: 18px;
  }

  footer {
    color: #fff;
    opacity: 0.6;
    font-size: 16px;
    display: flex;
    margin-top: 30px;
    padding-left: 20px;

    address {
      margin-left: 40px;
    }
  }
`;

export const Button = styled.button`
  align-self: flex-end;
  margin: 20px 0 auto;
  height: 44px;
  background: ${props => (props.secondary ? '#4dbaf9' : '#F94D6A')};
  font-weight: bold;
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  transition: background 0.2s;
  padding: 0 25px;
  opacity: ${props => (props.disabled ? '0.3' : '1')};

  &:hover {
    background: ${props =>
      darken(0.08, props.secondary ? '#4dbaf9' : '#F94D6A')};
  }

  &:last-of-type {
    margin-left: 15px;
  }
`;
