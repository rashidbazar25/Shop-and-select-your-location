import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f9f6f2",
        padding: 2,
        textAlign: "center",
        mt: 4,
      }}
    >
      <Typography variant="body2" color="textSecondary">
        صُمم بواسطة بو محمد - 776249562
      </Typography>
    </Box>
  );
};

export default Footer;
