import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: rgba(0, 0, 0, 0.7);
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 90px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    img {
      height: 30px;
    }
  }

  aside {
    display: flex;
    align-items: center;

    button {
      padding: 0 20px;
      border: 0;
      background: #d44059;
      color: #fff;
      height: 44px;
      font-weight: bold;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.08, '#d44059')};
      }
    }
  }
`;

export const Profile = styled.div`
  display: flex;

  div {
    text-align: right;
    margin-right: 30px;

    strong {
      display: block;
      color: #fff;
    }

    a {
      display: block;
      margin-top: 5px;
      font-size: 14px;
      color: #999;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
