"use client";

import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
} from "@mui/material";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useState } from "react";

type PasswordFieldProps = OutlinedInputProps & {
  label: string;
};

export const PasswordField = ({ label, ...props }: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const classIcons = "size-6 text-gray-500";
  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password" required>
        {label}
      </InputLabel>
      <OutlinedInput
        type={showPassword ? "text" : "password"}
        name="password"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword((show) => !show)}
              edge="end"
            >
              {showPassword ? (
                <EyeClosedIcon className={classIcons} />
              ) : (
                <EyeOpenIcon className={classIcons} />
              )}
            </IconButton>
          </InputAdornment>
        }
        label={label}
        {...props}
      />
    </FormControl>
  );
};
