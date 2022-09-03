import axios from "axios";
import { useEffect, useState } from "react";
import { DEFAULT_PAGE_URL, JOIN_PAGE_URL } from "../../constants/apiUrls";
import { Loading } from "../shared/Loading/Loading";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "./Default.css";

export const Default = () => {
  const [isLoading, setLoadingData] = useState<boolean>(false);
  // useEffect(() => {
  //   axios.get(DEFAULT_PAGE_URL).then((response) => {
  //     setLoadingData(false);
  //   });
  // }, []);

  const Default_page = () => {
    return (
      <div>
        {ButtonAppBar()}
        <div className="home">{FormJoinCode()}</div>
      </div>
    );
  };

  function ButtonAppBar() {
    const navigate = useNavigate();
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Live Auction
            </Typography>
            <Button
              color="inherit"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }

  function FormJoinCode() {
    return (
      <Formik
        initialValues={{
          entry_code: "",
        }}
        validationSchema={Yup.object({
          // TODO: change size of code from 3 to >6
          entry_code: Yup.string()
            .max(3, "Enter valid code")
            .min(3, "Enter valid code")
            .required("Required"),
        })}
        onSubmit={(values) => {
          // setLoadingData(true);
          // setData(values);
          axios
            .post(JOIN_PAGE_URL, {
              Entry_code: values.entry_code,
            })
            .then((response) => {
              // TODO: complete here
              alert("success");
              // setLoadingData(false);
            })
            .catch((error) => {
              // TODO: complete here
              alert("failure");
              // setLoadingData(false);
            });
        }}
        render={({ values }) => (
          <Form className="form">
            <Field name="entry_code" type="text" size="medium" />
            <ErrorMessage name="entry_code" />
            <button type="submit">Join Auction</button>
          </Form>
        )}
      />
    );
  }

  return <>{isLoading ? <Loading /> : <div>{Default_page()}</div>}</>;
};
