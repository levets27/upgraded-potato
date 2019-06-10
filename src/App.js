import React from "react";
import styled from "styled-components";
import "./App.css";

function App() {
  const brands = ["wf", "am", "bl", "jm", "pg"];
  const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
  `;
  const ColorBlock = styled.div`
    margin: 5px;
    max-width: 100px;
    height: 100px;
    display: flex;
    border: 1px solid darkgray;
    border-radius: 5px;
    span {
      font-size: 0.75rem;
      margin: auto;
      color: white;
      background: rgba(0, 0, 0, 0.7);
    }
  `;
  return (
    <Wrapper>
      {brands.map(brand => {
        const variables = require(`./scss/_${brand}.scss`);
        console.log(variables);
        return Object.entries(variables).map((color, i) => (
          <ColorBlock key={i} style={{ background: color[1], color: "white" }}>
            <span>
              {color[0]}: {color[1]}
            </span>
          </ColorBlock>
        ));
      })}
    </Wrapper>
  );
}

export default App;
