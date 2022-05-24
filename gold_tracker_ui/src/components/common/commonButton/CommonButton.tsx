import React from "react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

const CommonButton = ({
  children,
  color,
  disabled,
  size,
  sx,
  variant,
  onClick,
  title = "",
  placement,
}: any) => {
  return (
    <Tooltip title={title} placement={placement}>
      <Button
        color={color}
        disabled={disabled}
        size={size}
        sx={sx}
        variant={variant}
        onClick={onClick}
      >
        {children}
      </Button>
    </Tooltip>
  );
};

export default CommonButton;
