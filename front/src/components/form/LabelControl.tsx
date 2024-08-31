import { FormControlLabel, FormControlLabelProps } from "@mui/material";

export const LabelControl = (props: FormControlLabelProps) => {
  const formControlLabelStyle = {
    "& .MuiFormControlLabel-label": {
      fontSize: "0.875rem",
    },
  };
  return <FormControlLabel {...props} sx={formControlLabelStyle} />;
};
