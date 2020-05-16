import styled from "styled-components";
import Colors from "../../styles/colors"

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  min-height: 730px;
`;

export const Form = styled.form`
  width: 400px;
  background: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;

  img {
    width: 100px;
    margin: 10px 0 40px;
  }

  p {
    color: ${Colors.backgroundPadrao};
    margin-bottom: 15px;
    border: 1px solid ${Colors.backgroundPadrao};
    padding: 10px;
    width: 100%;
    text-align: center;
  }

  input {
    display: flex;
    height: 46px;
    /* margin-bottom: 15px; */
    padding: 0 20px;
    color: #777;
    font-size: 15px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid #ddd;
    &::placeholder {
      color: #999;
    }
  }

  button {
    margin-top: 15px;
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
  }
`;

export const MuiStyles = {
  formControl: {
    minWidth: "100%",
  },
  inputLabel: {
    marginTop: "15px",
    fontSize: "15px",
    alignSelf: "flex-start"
  },
  select: {
    minWidth: "100%",
    fontSize: "15px",
  },
  menuItem: {
    fontSize: "15px",
  },
  currencyInput: {
    minWidth: "100%",
    fontSize: "15px",
  },
}
