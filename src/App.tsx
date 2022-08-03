import "./styles.css";
import axios from "axios";
import { useEffect, useState } from "react";

const axiosConfig = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
};

export default function App() {
  const [isLoading, setLoadingData] = useState<boolean>(true);
  const [data, setData] = useState<string>("");

  useEffect(() => {
    axios
      .get("https://auction36.herokuapp.com/", axiosConfig)
      .then((Response) => {
        console.log("sujith", Response.data);
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
