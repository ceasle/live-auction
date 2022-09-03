import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { LOGIN_PAGE_URL } from "../../constants/apiUrls";
import { setItem } from "../../utils/APIutils";

export const Login = () => {
  let navigate = useNavigate();
  return (
    <>
      <Formik
        initialValues={{
          usrnme: "",
          psswd: "",
        }}
        validationSchema={Yup.object({
          usrnme: Yup.string().required("Required").min(1, "minimum is 1"),
          psswd: Yup.string().required("Required").min(1, "minimum is 1"),
        })}
        onSubmit={(values) => {
          axios
            .post(LOGIN_PAGE_URL, {
              username: values.usrnme,
              password: values.psswd,
            })
            .then((response) => {
              alert("success");
              if (response.status === 200) {
                setItem("ACCESS_TOKEN", response.data.token); //add to local storage
                setItem(
                  "ACCESS_TOKEN_EXPIRATION",
                  JSON.stringify(Date.now() + 5 * 60 * 60 * 1000) //add to  local storage
                );
                navigate("/auction");
              }
            })
            .catch((error) => {
              alert("failure");
            });
        }}
      >
        {
          <Form>
            <label htmlFor="usrnme">UserName</label>
            <Field name="usrnme" type="text" />
            <ErrorMessage name="usrnme" />
            <br /> <br />
            <label htmlFor="psswd">Password</label>
            <Field name="psswd" type="password" />
            <ErrorMessage name="psswd" />
            <button type="submit">Submit</button>
          </Form>
        }
      </Formik>
    </>
  );
};
