import { Stack, Alert, AlertTitle, AlertColor, Button } from "@mui/material";
import { To, useNavigate } from "react-router-dom";

export type MessageProps = {
  severity: AlertColor;
  title: string;
  message: string;
  note?: string;
  redirectionUrl?: string;
  buttonText?: string;
};

export const CustomAlert = (props: MessageProps) => {
  const navigate = useNavigate();
  return (
    <Stack sx={{ width: "100%" }} spacing={2} alignItems="center">
      <Alert
        severity={props.severity}
        sx={{ width: "60%", margin: "30px" }}
        action={
          <Button
            color="inherit"
            size="small"
            onClick={() => {
              if (props.redirectionUrl) {
                navigate(props.redirectionUrl);
              } else {
                navigate(0);
              }
            }}
          >
            <strong>{props.buttonText ? props.buttonText : "CLOSE"}</strong>
          </Button>
        }
      >
        <AlertTitle>
          <strong>{props.title}</strong>
        </AlertTitle>
        {props.message}. <strong>{props.note}</strong>
      </Alert>
    </Stack>
  );
};
