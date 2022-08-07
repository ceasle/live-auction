import axios from "axios";
import { useEffect, useState } from "react";
import { DEFAULT_PAGE_URL } from "../../constants/apiUrls";
import { Loading } from "../shared/Loading/Loading";

export const Default = () => {
  const [data, setData] = useState<String>("");
  const [isLoading, setLoadingData] = useState<boolean>(true);

  useEffect(() => {
    axios.get(DEFAULT_PAGE_URL).then((response) => {
      setData(response.data);
      setLoadingData(false);
    });
  }, []);

  return <>{isLoading ? <Loading /> : <div>{data}</div>}</>;
};
