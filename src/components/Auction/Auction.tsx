import axios from "axios";
import { useEffect, useState } from "react";
import { AUCTION_PAGE_URL } from "../../constants/apiUrls";
import { Loading } from "../shared/Loading/Loading";

export const Auction = () => {
  const [data, setData] = useState<String>("");
  const [isLoading, setLoadingData] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(AUCTION_PAGE_URL, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
        },
      })
      .then((response) => {
        setData(response.data);
        setLoadingData(false);
      });
  }, []);

  return <>{isLoading ? <Loading /> : <div>{data}</div>}</>;
};
