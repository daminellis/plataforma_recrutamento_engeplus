import { CircularProgress } from "@mui/material";

type LoadingProps = {
  isWhite?: boolean;
  size?: string;
};

export const Loading = ({ isWhite, size }: LoadingProps) => {
  return (
    <CircularProgress
      size={size ? size : "1.5rem"}
      {...(isWhite && { sx: { color: "white" } })}
    />
  );
};
