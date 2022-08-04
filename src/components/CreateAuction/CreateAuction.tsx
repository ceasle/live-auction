import axios from "axios";
import { useEffect, useState } from "react";
import { CREATE_PAGE_URL } from "../../constants/apiUrls";
import { Loading } from "../shared/Loading";

export const CreateAuction = () => {
  const [data, setData] = useState<String>("");
  const [isLoading, setLoadingData] = useState<boolean>(true);

  useEffect(() => {
    axios.get(CREATE_PAGE_URL).then((response) => {
      setData(response.data);
      setLoadingData(false);
    });
  }, []);

  return <>{isLoading ? <Loading /> : <div>{data}</div>}</>;
};
