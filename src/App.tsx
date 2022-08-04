import "./styles.css";
import axios from "axios";
import { useEffect, useState } from "react";

export default function App() {
  const [isLoading, setLoadingData] = useState<boolean>(true);
  const [data, setData] = useState<string>("");

  useEffect(() => {
    axios.get("http://localhost:8080/").then((Response) => {
      setData(Response.data);
      setLoadingData(false);
    });
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>{data}</h1>
          <h2>Start editing to see some magic happen!</h2>
        </div>
      )}
    </div>
  );
}
