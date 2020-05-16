import styled from "styled-components";
import Colors from "../../styles/colors";

export const Container = styled.div`
  width: 100%;
  /* max-width: 1260px; */
  margin: 0 auto;
  padding: 40px 20px;
`;

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
`;

export const CardContainer = styled.section`
  /* display: grid; */
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 32px;
  /* margin-top: -150px; */
  flex-direction: row;
  justify-content: space-between;
  display: flex;
  /* padding-bottom: 40px; */
`;

export const Card = styled.div`
  background: #fff; /*#333; #FF872C;*/
  padding: 22px 32px;
  border-radius: 5px;
  min-width: 292px;
  /* color: #fff; */

  transition: all 0.2s ease 0s;
  border-width: 2px;
  border-style: solid;
  border-color: transparent;
  border-image: initial;
  &:hover {
    /* transform: translate3d(42px, -62px, -135px); */
    border-width: 2px;
    border-style: solid;
    border-color: #333;
    border-image: initial;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      font-size: 16px;
    }
  }

  h1 {
    margin-top: 14px;
    font-size: 36px;
    font-weight: normal;
    line-height: 54px;
  }
`;

export const TableContainer = styled.section`
  margin-top: 40px;
  flex-direction: row;
  justify-content: space-between;
  display: flex;

  table {
    width: 100%;
    /* border-collapse: collapse; */
    border-radius: 5px;

    &:hover {
      border: 2px solid ${Colors.tableHover};
      border-image: initial;
    }

    th{
      padding: 10px 10px 10px;
      text-align: left;
      font-size: 16px;
      background-color: ${Colors.tableHover};
      color: #fff;
    }

    tr:nth-child(even) {
      background-color: #f2f2f2;
    }

    tr:hover {
      background-color: #ddd;
    }

    td {
      /* border: 1px solid #ddd; */
      padding: 5px 10px 5px;
      /* border: 0.5; */
      font-size: 15px;
      /* background: #ffff; */

      &.empty {
        color: #333;
      }

      &.title {
        color: #333;
      }

      &.income {
        color: #12a454;
      }

      &.outcome {
        color: #e83f5b;
      }
    }

    td:first-child {
      /* border-radius: 8px 0 0 8px; */
    }

    td:last-child {
      border-radius: 0 8px 8px 0;
      width: 120px;
    }
  }
`;

export const Float = styled.div`
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 40px;
  right: 40px;
  background-color: ${Colors.botoesFlutuantes};
  border-radius: 50px;
  &:hover {
    background-color: ${Colors.botoesFlutuantesHover};
  }
`;

// export const TableTransactionsTitle = styled.h1`
//   color: ${Colors.backgroundPadrao};
//   font-weight: 500;
// `

export const MuiStyles = {
  buttonFab:{
    color: "#fff",
    backgroundColor: Colors.botoesFlutuantes,
  },
  buttonDelete: {
    color: Colors.compras,
  },
  buttonUpdate: {
    color: Colors.vendas
  },
}