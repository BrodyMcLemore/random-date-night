import React from "react";
import { Box, Stack } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const SelectionTree = ({ selectedItems }) => {
  return (
    <Stack spacing={1} alignItems="center">
      {selectedItems.map((item, index) => (
        <React.Fragment key={index}>
          <Box
            px={3}
            py={2}
            bgcolor="success.main"
            color="primary.contrastText"
            borderRadius={1}
            fontSize="1.25rem"
            fontWeight="bold"
            width="100%"
            textAlign="center"
          >
            {item}
          </Box>
          {index < selectedItems.length - 1 && (
            <ArrowDownwardIcon
              fontSize="large"
              sx={{ color: "primary.contrastText" }}
            />
          )}
        </React.Fragment>
      ))}
    </Stack>
  );
};

export default SelectionTree;
