import styled from "styled-components";
import Colors from "../../styles/colors";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 375px;
  background-color: ${Colors.backgroundPadrao}; /*#333;*/
  padding: 10px;
`;

export const Section = styled.section`
  width: 100%;
  background-color: rgb(255, 255, 255);
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
`;

export const Article = styled.article`
  width: 100%;
  display: flex;
  flex-direction: row;
  border-left: 10px solid ${Colors.backgroundPadrao}; /*#333;*/
`;

export const DivStructureImage = styled.div`
  width: 100%;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  text-align: left;
  position: relative;
  align-items: flex-start;
  order: 2;
  padding: 16px;
  img {
    display: block;
    object-fit: cover;
    width: auto;
    max-height: 100vh;
    margin: 0px auto;
  }
`;

export const DivText = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  text-align: right;
  position: relative;
  align-items: flex-end;
  padding: 64px 32px;
  h3 {
    font-size: 25px;
    max-width: 26rem;
    color: ${Colors.backgroundPadrao};
    margin-bottom: 32px;
  }
  pre {
    font-size: 18px;
    line-height: 1.5;
    color: rgb(118, 118, 118);
  }
  pre:nth-child(4n+0) {
    padding-bottom: 20px;
  }
  p {
    font-size: 18px;
    line-height: 1.5;
    color: rgb(118, 118, 118);
    margin-bottom: 32px;
    max-width: 24rem;
  }
  p:last-child {
    margin-bottom: 0px;
  }
`;

export const Form = styled.form`
  width: 400px;
  background: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 100px;
    margin: 10px 0 40px;
  }
  p {
    color: #333;
    margin-bottom: 15px;
    border: 1px solid #333;
    padding: 10px;
    width: 100%;
    text-align: center;
  }
  input {
    /* flex: 1; */
    display: flex;
    height: 46px;
    margin-bottom: 15px;
    padding: 0 20px;
    color: #777;
    font-size: 15px;
    width: 100%;
    border: 1px solid #ddd;
    &::placeholder {
      color: #999;
    }
  }
  button {
    color: #fff;
    font-size: 16px;
    background: ${Colors.backgroundPadrao};
    height: 56px;
    border: 0;
    border-radius: 5px;
    width: 100%;
  }
  hr {
    margin: 20px 0;
    border: none;
    border-bottom: 1px solid #cdcdcd;
    width: 100%;
  }
  a {
    font-size: 16;
    font-weight: bold;
    color: #999;
    text-decoration: none;
  }

  h1 {
    margin-bottom: 15px;
    /* font-size: 36px; */
    font-weight: normal;
    line-height: 54px;
    color: ${Colors.backgroundPadrao};
  }
`;
