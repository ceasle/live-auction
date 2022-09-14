import axios from "axios";
import { useEffect, useState } from "react";
import { HOME_PAGE_URL } from "../../constants/apiUrls";
import { defaultUserProps, UserProps } from "../../constants/userProps";
import { isAuthenticated } from "../../utils/APIutils";
import { CustomAlert } from "../shared/CustomAlert/CustomAlert";
import { Loading } from "../shared/Loading/Loading";

export const Home = () => {
  const [data, setData] = useState<UserProps>(defaultUserProps);
  const [isLoading, setLoadingData] = useState<boolean>(true);

  if (isAuthenticated() === false) {
    return (
      <CustomAlert
        severity="error"
        title="Error!"
        message="Unauthorized error"
        note="Try logging in"
        buttonText="Login"
        redirectionUrl="/login"
      />
    );
  }

  useEffect(() => {
    axios.get(HOME_PAGE_URL).then((response) => {
      setData(response.data);
      setLoadingData(false);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div>{data.upcomingAuctions.map((el) => el.name)}</div>
        </>
      )}
    </>
  );
};
