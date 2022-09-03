import axios from "axios";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { useState } from "react";
import { CREATE_PAGE_URL } from "../../constants/apiUrls";
import { Loading } from "../shared/Loading/Loading";
import * as Yup from "yup";
import { isAuthenticated } from "../../utils/APIutils";
import { Unauthorized } from "../shared/Unauthorized/Unauthorized";
import { TextField } from "formik-mui";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker as formikDateTimePicker } from "formik-mui-x-date-pickers";

export const CreateAuction = () => {
  const [isLoading, setLoadingData] = useState<boolean>(false);

  if (isAuthenticated() === false) {
    return <Unauthorized />;
  }

  const emptyItem = {
    itemName: "",
    itemDescription: "",
    itemBasePrice: 0,
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Formik
          initialValues={{
            auctionName: "",
            auctionDescription: "",
            items: [emptyItem],
            invitees: [""],
            auctionDateTime: null,
          }}
          validationSchema={Yup.object({
            auctionName: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("Required"),
            auctionDescription: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("Required"),
            items: Yup.array()
              .of(
                Yup.object().shape({
                  itemName: Yup.string()
                    .max(15, "Must be 15 characters or less")
                    .required("Required"),
                  itemDescription: Yup.string()
                    .max(20, "Must be 20 characters or less")
                    .required("Required"),
                  itemBasePrice: Yup.number()
                    .min(1, "Must be greater than 0")
                    .required("Required"),
                })
              )
              .min(1, "At least 1 item should be presented at the auction")
              .required("Required"),
            invitees: Yup.array()
              .of(Yup.string().email().required("Required"))
              .min(1, "At least 1 invitee should be present at the auction")
              .required("Required"),
            auctionDateTime: Yup.date().required("Required"),
          })}
          onSubmit={(values) => {
            setLoadingData(true);
            axios
              .post(CREATE_PAGE_URL, {
                name: values.auctionName,
                description: values.auctionDescription,
                items: values.items.map((item) => ({
                  name: item.itemName,
                  description: item.itemDescription,
                  basePrice: item.itemBasePrice,
                })),
              })
              .then((response) => {
                // TODO: Add success message pop up
                alert("success");
                console.log(response);
                setLoadingData(false);
              })
              .catch((err) => {
                // TODO: Add failure message pop up
                alert("failure");
                console.log(values);
                console.log(err);
                setLoadingData(false);
              });
          }}
          render={({ values }) => (
            <Form>
              <label htmlFor="auctionName">Auction Name</label>
              <Field component={TextField} name="auctionName" type="text" />

              <label htmlFor="auctionDescription">Auction Description</label>
              <Field
                component={TextField}
                name="auctionDescription"
                type="text"
              />

              <FieldArray
                name="items"
                render={(arrayHelpers) => (
                  <div>
                    {values.items && values.items.length > 0 ? (
                      values.items.map((_, index) => (
                        <div key={index}>
                          <label htmlFor={`items.${index}.itemName`}>
                            Item Name
                          </label>
                          <Field
                            component={TextField}
                            name={`items.${index}.itemName`}
                          />

                          <label htmlFor={`items.${index}.itemDescription`}>
                            Item Description
                          </label>
                          <Field
                            component={TextField}
                            name={`items.${index}.itemDescription`}
                          />

                          <label htmlFor={`items.${index}.itemBasePrice`}>
                            Item Base Price
                          </label>
                          <Field
                            component={TextField}
                            name={`items.${index}.itemBasePrice`}
                          />

                          {/* TODO: Add field for image */}

                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            -
                          </button>
                          <button
                            type="button"
                            onClick={() => arrayHelpers.push(emptyItem)}
                            hidden={values.items.length != index + 1}
                          >
                            Add Item
                          </button>
                        </div>
                      ))
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => arrayHelpers.push(emptyItem)}
                        >
                          Add Item
                        </button>
                        <ErrorMessage name="items" />
                      </>
                    )}
                  </div>
                )}
              />

              <FieldArray
                name="invitees"
                render={(arrayHelpers) => (
                  <>
                    {values.invitees && values.invitees.length > 0 ? (
                      values.invitees.map((_, index) => (
                        <div key={index}>
                          <label htmlFor={`invitees.${index}`}>
                            Email of the invitee
                          </label>
                          <Field
                            component={TextField}
                            name={`invitees.${index}`}
                          />
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            -
                          </button>
                          <button
                            type="button"
                            onClick={() => arrayHelpers.push("")}
                            hidden={values.invitees.length != index + 1}
                          >
                            Add Invitee
                          </button>
                        </div>
                      ))
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => arrayHelpers.push("")}
                        >
                          Add Invitee
                        </button>
                        <ErrorMessage name="invitees" />
                      </>
                    )}
                  </>
                )}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Field
                  component={formikDateTimePicker}
                  label="Date & Time picker"
                  name="auctionDateTime"
                  textField={{
                    helperText: "Enter date and time to host the auction",
                  }}
                  inputFormat="DD/MM/YYYY HH:mm"
                />
              </LocalizationProvider>
              <button type="submit">Submit</button>
            </Form>
          )}
        />
      )}
    </>
  );
};
