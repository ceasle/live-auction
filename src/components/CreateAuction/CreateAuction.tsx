import axios from "axios";
import { Formik, Form, FastField, ErrorMessage, FieldArray } from "formik";
import { useState } from "react";
import { CREATE_PAGE_URL } from "../../constants/apiUrls";
import { Loading } from "../shared/Loading/Loading";
import * as Yup from "yup";
import { isAuthenticated } from "../../utils/APIutils";
import { TextField } from "formik-mui";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker as formikDateTimePicker } from "formik-mui-x-date-pickers";
import { Grid, Button, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { CustomAlert } from "../shared/CustomAlert/CustomAlert";

export const CreateAuction = () => {
  const [isLoading, setLoadingData] = useState<boolean>(false);
  const [successSubmission, setSuccessSubmission] = useState<boolean>(false);
  const [failureSubmission, setFailureSubmission] = useState<boolean>(false);

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

  const emptyItem = {
    itemName: "",
    itemDescription: "",
    itemBasePrice: 0,
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : successSubmission ? (
        <CustomAlert
          severity="success"
          title="Hurray!"
          message="We have successfully received your data"
          note="Thank you!"
        />
      ) : failureSubmission ? (
        <CustomAlert
          severity="error"
          title="Oh Snap!"
          message="An error occurred while submitting your data"
          buttonText="Try Again"
        />
      ) : (
        <Formik
          initialValues={{
            auctionName: "",
            auctionDescription: "",
            items: [emptyItem],
            invitees: [""],
            auctionDateTime: "",
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
                    .max(400, "Must be 400 characters or less")
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
            auctionDateTime: Yup.string().required("Required"),
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
                console.log(response);
                setLoadingData(false);
                setSuccessSubmission(true);
              })
              .catch((err) => {
                // TODO: Add failure message pop up
                console.log(values);
                console.log(err);
                setLoadingData(false);
                setFailureSubmission(true);
              });
          }}
          render={({ values }) => (
            <Paper sx={{ marginX: 16, marginY: 5, padding: 5 }} elevation={3}>
              <Form>
                <Grid
                  container
                  direction="row"
                  alignItems="flex-start"
                  columnSpacing={1}
                  rowSpacing={2}
                >
                  <Grid item xs={12}>
                    <FastField
                      component={TextField}
                      name="auctionName"
                      label="Auction Name"
                      type="text"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FastField
                      component={TextField}
                      name="auctionDescription"
                      label="Auction Description"
                      type="text"
                      fullWidth
                      multiline
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FieldArray
                      name="items"
                      render={(arrayHelpers) => (
                        <div>
                          {values.items && values.items.length > 0 ? (
                            values.items.map((_, index) => (
                              <div key={index}>
                                <Grid
                                  container
                                  columnSpacing={1}
                                  style={{ margin: 16 }}
                                >
                                  <Grid item xs={2}>
                                    <FastField
                                      component={TextField}
                                      name={`items.${index}.itemName`}
                                      label="Item Name"
                                      fullWidth
                                    />
                                  </Grid>
                                  <Grid item xs={4}>
                                    <FastField
                                      component={TextField}
                                      name={`items.${index}.itemDescription`}
                                      label="Item Description"
                                      fullWidth
                                      multiline
                                    />
                                  </Grid>
                                  <Grid item xs={2}>
                                    <FastField
                                      component={TextField}
                                      name={`items.${index}.itemBasePrice`}
                                      label="Item Base Price"
                                      fullWidth
                                    />
                                  </Grid>
                                  <Grid item xs={3}>
                                    <Button
                                      type="button"
                                      onClick={() => arrayHelpers.remove(index)}
                                      variant="outlined"
                                      startIcon={<DeleteIcon />}
                                      size="large"
                                    >
                                      Remove Item
                                    </Button>
                                  </Grid>
                                </Grid>

                                {/* TODO: Add field for image */}

                                <Grid item xs={2}>
                                  {values.items.length == index + 1 && (
                                    <Button
                                      type="button"
                                      onClick={() =>
                                        arrayHelpers.push(emptyItem)
                                      }
                                      variant="contained"
                                      size="large"
                                    >
                                      Add Item
                                    </Button>
                                  )}
                                </Grid>
                              </div>
                            ))
                          ) : (
                            <Grid item xs={12}>
                              <Button
                                type="button"
                                onClick={() => arrayHelpers.push(emptyItem)}
                                variant="contained"
                                size="large"
                              >
                                Add Item
                              </Button>
                              <ErrorMessage name="items" />
                            </Grid>
                          )}
                        </div>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FieldArray
                      name="invitees"
                      render={(arrayHelpers) => (
                        <>
                          {values.invitees && values.invitees.length > 0 ? (
                            values.invitees.map((_, index) => (
                              <div key={index}>
                                <Grid
                                  container
                                  columnSpacing={1}
                                  style={{ margin: 16 }}
                                >
                                  <Grid item xs={3}>
                                    <FastField
                                      component={TextField}
                                      name={`invitees.${index}`}
                                      label="Attendee Email"
                                      fullWidth
                                    />
                                  </Grid>
                                  <Grid item>
                                    <Button
                                      type="button"
                                      onClick={() => arrayHelpers.remove(index)}
                                      variant="outlined"
                                      size="large"
                                      startIcon={<DeleteIcon />}
                                    >
                                      Remove Attendee
                                    </Button>
                                  </Grid>
                                  <Grid item>
                                    <Button
                                      type="button"
                                      onClick={() => arrayHelpers.push("")}
                                      hidden={
                                        values.invitees.length != index + 1
                                      }
                                      variant="contained"
                                      size="large"
                                    >
                                      Add Attendee
                                    </Button>
                                  </Grid>
                                </Grid>
                              </div>
                            ))
                          ) : (
                            <Grid item>
                              <Button
                                type="button"
                                onClick={() => arrayHelpers.push("")}
                                variant="contained"
                                size="large"
                              >
                                Add Attendee
                              </Button>
                              <ErrorMessage name="invitees" />
                            </Grid>
                          )}
                        </>
                      )}
                    />
                  </Grid>
                  <Grid item>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <FastField
                        component={formikDateTimePicker}
                        label="Auction Date & Time"
                        name="auctionDateTime"
                        textField={{
                          helperText: "Enter date and time to host the auction",
                        }}
                        inputFormat="DD/MM/YYYY HH:mm"
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={2}>
                    <Button type="submit" variant="contained" size="large">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            </Paper>
          )}
        />
      )}
    </>
  );
};
