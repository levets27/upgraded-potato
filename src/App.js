import React from "react";
import styled from "styled-components";
import "./App.css";

function App() {
  const brands = ["wf", "am", "bl", "jm", "pg"];
  const getBrandName = brand => {
    switch (brand) {
      case "wf":
        return "Wayfair";
      case "am":
        return "AllModern";
      case "bl":
        return "Birch Lane";
      case "jm":
        return "Joss & Main";
      case "pg":
        return "Perigold";
      default:
        return "Wayfair";
    }
  };
  const Wrapper = styled.div`
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(6, 1fr);
  `;
  const Column = styled.div`
    display: grid;
    grid-gap: 10px;
  `;
  const Heading = styled.h2`
    position: sticky;
    top: 0;
    text-align: center;
    font-size: 1.5rem;
    height: 50px;
    padding-top: 10px;
    background: #fff;
    z-index: 1;
    border-bottom: 2px solid #000;
    margin: 0 -5px;
  `;
  const RowLabel = styled.h3`
    display: flex;
    height: 100px;
    span {
      margin: auto;
      text-align: center;
    }
  `;
  const ColorBlock = styled.div`
    position: relative;
    border: 1px solid darkgray;
    border-radius: 5px;
    height: 100px;
    p {
      font-size: 0.75rem;
      padding: 5px;
      width: 100%;
      position: absolute;
      bottom: 0;
      color: white;
      background: rgba(0, 0, 0, 0.7);
      text-align: center;
    }
  `;
  return (
    <Wrapper>
      {brands.map((brand, i) => {
        let variables = Object.entries(require(`./scss/_${brand}.scss`));
        // Wrap each element in a column
        return (
          <>
            {i === 0 && (
              <Column key={i}>
                <Heading>Var Name</Heading>
                {variables.map((color, i) => (
                  <RowLabel key={i}>
                    <span>${color[0]}</span>
                  </RowLabel>
                ))}
              </Column>
            )}
            <Column key={i}>
              <Heading>{getBrandName(brand)}</Heading>
              {variables.map((color, i) => {
                let array = color[1].split(", ", 2);
                return (
                  <ColorBlock
                    key={i}
                    style={{ background: array[1], color: "white" }}
                  >
                    <p>
                      {array[0].replace(/"/g, "").replace(/'/g, "")}
                      <br />
                      {array[1]}
                    </p>
                  </ColorBlock>
                );
              })}
            </Column>
          </>
        );
      })}
    </Wrapper>
  );
}

export default App;
