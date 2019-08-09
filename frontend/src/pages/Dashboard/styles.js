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

    h1 {
      color: #fff;
      font-size: 32px;
      font-weight: bold;
    }

    button {
      height: 44px;
      background: #f94d6a;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;
      padding: 0 25px;

      &:hover {
        background: ${darken(0.08, '#F94D6A')};
      }
    }
  }

  ul {
    margin-top: 50px;
    display: grid;
    grid-gap: 10px;
  }
`;

export const Meetapp = styled.li`
  display: flex;
  justify-content: space-between;
  height: 62px;
  align-items: center;
  padding: 20px 30px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;

  strong {
    font-size: 18px;
    color: #fff;
  }

  span {
    color: rgba(255, 255, 255, 0.6);
    font-size: 16px;
  }
`;
