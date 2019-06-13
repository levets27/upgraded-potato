import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import "./App.css";

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
  padding: 10px 0;
  background: #fff;
  z-index: 1;
  border-bottom: 3px solid #000;
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
  border-radius: 3px;
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
const FilterContainer = styled.label`
  position: sticky;
  top: 0;
  text-align: center;
  height: 50px;
  padding: 5px 0;
  background: #fff;
  z-index: 1;
  border-bottom: 3px solid #000;
  margin: 0 -5px;
`;
const HiddenLabel = styled.span`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;
const FilterInput = styled.input`
  padding: 10px;
  border-radius: 3px;
  border: 2px solid #7f187f;
  font-size: 0.75rem;
  width: 100%;
`;
const Wrapper = styled.div`
  padding: 0 10px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(6, 1fr);
`;

const brands = ["wf", "am", "bl", "jm", "pg"];
// Credit David Walsh (https://davidwalsh.name/javascript-debounce-function)

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
  var timeout;

  return function executedFunction() {
    var context = this;
    var args = arguments;

    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

let allBrandColors = {};
for (var i in brands) {
  let brand = brands[i];
  let variables = Object.entries(require(`./scss/_${brand}.scss`));

  allBrandColors[brand] = variables;
}

const FilterBlock = props => {
  return (
    <FilterContainer htmlFor="filter">
      <HiddenLabel>Filter Results</HiddenLabel>
      <FilterInput
        name="filter"
        type="text"
        placeholder="Filter Results"
        value={props.query}
        onChange={props.filter}
      />
    </FilterContainer>
  );
};

const ColorGrid = props => {
  const { query, filter, colors } = props;
  return (
    <>
      {brands.map((brand, i) => (
        <Fragment key={i}>
          {colors[brand] !== undefined && (
            <>
              {i === 0 && (
                <Column>
                  <FilterBlock query={query} filter={filter} />
                  {colors[brand].map((color, i) => (
                    <Fragment key={i}>
                      {color[0].toLowerCase().includes(query.toLowerCase()) && (
                        <RowLabel>
                          <span>${color[0]}</span>
                        </RowLabel>
                      )}
                    </Fragment>
                  ))}
                </Column>
              )}
              <Column key={i}>
                <Heading>{brand.toUpperCase()}</Heading>
                {colors[brand].map((color, i) => {
                  let array = color[1].split(", ", 2);
                  return (
                    <Fragment key={i}>
                      {color[0].toLowerCase().includes(query.toLowerCase()) && (
                        <ColorBlock
                          style={{ background: array[1], color: "white" }}
                        >
                          <p>
                            {array[0].replace(/"/g, "").replace(/'/g, "")}
                            <br />
                            {array[1]}
                          </p>
                        </ColorBlock>
                      )}
                    </Fragment>
                  );
                })}
              </Column>
            </>
          )}
        </Fragment>
      ))}
    </>
  );
};
const App = () => {
  const [colorData, setColorData] = useState({});
  const [filterKeyword, setFilterKeyword] = useState("");
  const filterResults = e => {
    let query = e.target.value;
    debounce(setFilterKeyword(query), 500);
  };
  useEffect(() => {
    setColorData(allBrandColors);
  }, [colorData]);
  // Functions and stuff
  return (
    <Wrapper>
      <ColorGrid
        colors={colorData}
        query={filterKeyword}
        filter={filterResults}
      />
    </Wrapper>
  );
};

export default App;
