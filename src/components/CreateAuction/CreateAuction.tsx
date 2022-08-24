import axios from "axios";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { useState } from "react";
import { CREATE_PAGE_URL } from "../../constants/apiUrls";
import { Loading } from "../shared/Loading/Loading";
import * as Yup from "yup";

export const CreateAuction = () => {
  const [isLoading, setLoadingData] = useState<boolean>(false);

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
          })}
          onSubmit={(values) => {
            setLoadingData(true);
            // setData(values);
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
                console.log(err);
                setLoadingData(false);
              });
          }}
          render={({ values }) => (
            <Form>
              <label htmlFor="auctionName">Auction Name</label>
              <Field name="auctionName" type="text" />
              <ErrorMessage name="auctionName" />

              <label htmlFor="auctionDescription">Auction Description</label>
              <Field name="auctionDescription" type="text" />
              <ErrorMessage name="auctionDescription" />

              <FieldArray
                name="items"
                render={(arrayHelpers) => (
                  <div>
                    {values.items && values.items.length > 0 ? (
                      values.items.map((item, index) => (
                        <div key={index}>
                          <label htmlFor={`items.${index}.itemName`}>
                            Item Name
                          </label>
                          <Field name={`items.${index}.itemName`} />
                          <ErrorMessage name={`items.${index}.itemName`} />

                          <label htmlFor={`items.${index}.itemDescription`}>
                            Item Description
                          </label>
                          <Field name={`items.${index}.itemDescription`} />
                          <ErrorMessage
                            name={`items.${index}.itemDescription`}
                          />

                          <label htmlFor={`items.${index}.itemBasePrice`}>
                            Item Base Price
                          </label>
                          <Field name={`items.${index}.itemBasePrice`} />
                          <ErrorMessage name={`items.${index}.itemBasePrice`} />

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
                          >
                            +
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

              <button type="submit">Submit</button>
            </Form>
          )}
        />
      )}
    </>
  );
};
