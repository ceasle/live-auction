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
  const [data, setData] = useState("");

  useEffect(() => {
    axios
      .get("https://infinite-escarpment-04245.herokuapp.com/", axiosConfig)
      .then((Response) => {
        console.log("sujith", Response.data);
        setData(Response.data);
      });
  }, []);

  return (
    <div className="App">
      <h1>{data}</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
