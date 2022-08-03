import "./styles.css";
import { getdata } from "./service";
import axios from "axios";

function a():any {
  axios.get('https://infinite-escarpment-04245.herokuapp.com/')
  .then((Response) =>{
    console.log('sujith',Response.data);
    return Response.data;
  })
}

export default function App() {
  
  return (
      <div className="App">
      <h1>{a()}</h1>
      <h2>Start editing to see some magic happen!</h2>
      </div>
  );
}
