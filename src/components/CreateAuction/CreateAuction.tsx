import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { CREATE_PAGE_URL } from "../../constants/apiUrls";
import { Loading } from "../shared/Loading/Loading";
import * as Yup from "yup";

export const CreateAuction = () => {
  const [data, setData] = useState<String>("");
  const [isLoading, setLoadingData] = useState<boolean>(false);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Formik
          initialValues={{ firstName: "", lastName: "", email: "" }}
          validationSchema={Yup.object({
            firstName: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("Required"),
            lastName: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setLoadingData(true);
            axios
              .post(CREATE_PAGE_URL, {
                id: 1,
                name: "ABC",
                description: "XYZ",
                items: [
                  {
                    id: 1,
                    name: "Pen",
                    description: "XYZ",
                    basePrice: 10,
                  },
                  {
                    id: 2,
                    name: "Book",
                    description: "XYZ",
                    basePrice: 20,
                  },
                ],
              })
              .then((response) => {
                setData(response.data);
                setLoadingData(false);
              });
          }}
        >
          <Form>
            <label htmlFor="firstName">First Name</label>
            <Field name="firstName" type="text" />
            <ErrorMessage name="firstName" />

            <label htmlFor="lastName">Last Name</label>
            <Field name="lastName" type="text" />
            <ErrorMessage name="lastName" />

            <label htmlFor="email">Email Address</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" />

            <button type="submit">Submit</button>
          </Form>
        </Formik>
      )}
    </>
  );
};
