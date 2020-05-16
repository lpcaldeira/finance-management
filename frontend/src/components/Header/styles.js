import styled from "styled-components";

export const Container = styled.div`
  transition: all 0.2s;
  position: relative;

  header {
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0px 0px 0px;
    transition: all 0.2s;
  }

  img {
    width: 100px;
    margin: 10px 0 20px;
  }

  strong {
    width: 200px;
    height: 100px;
    color: #008888;
    font-size: 30px;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
`;
