import { useEffect, useState } from "react";
import { createClient } from "urql";
import "./App.css";

function App() {
  const [tokens, setTokens] = useState([]);

  const QueryURL =
    "https://gateway-arbitrum.network.thegraph.com/api/5c1dd641a7ed2d4d5bb934765a236e5c/subgraphs/id/C2zniPn45RnLDGzVeGZCx2Sw3GXrbc9gL4ZfL8B8Em2j";

  // https://gateway-arbitrum.network.thegraph.com/api/5c1dd641a7ed2d4d5bb934765a236e5c/subgraphs/id/C2zniPn45RnLDGzVeGZCx2Sw3GXrbc9gL4ZfL8B8Em2j

  const client = createClient({
    url: QueryURL,
  });

  const query = `{
    
      tokens(first: 5) {
        id
        name
        symbol
        decimals
      }
      rewardTokens(first: 5) {
        id
        token {
          id
        }
        type
        _distributionEnd
      }
    
  }`;

  useEffect(() => {
    const getTokens = async () => {
      const { data } = await client.query(query).toPromise();
      setTokens(data.tokens);
    };
    getTokens();
  }, []);

  return (
    <>
      <div>
        <h1>Tokens Information</h1>
        {tokens !== null &&
          tokens.length > 0 &&
          tokens.map((token) => {
            return (
              <div key={token.id}>
                <div>{token.id}</div>
                <div>{token.name}</div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default App;
