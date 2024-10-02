import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import EditOptionsTree from "./EditOptionsTree";

const EditOptionsDialog = ({ open, onClose, onSave, optionsData }) => {
  const [localOptionsData, setLocalOptionsData] = useState([]);
  const [hasErrors, setHasErrors] = useState(false);
  const [validationMap, setValidationMap] = useState({});

  useEffect(() => {
    if (open) {
      // Deep copy to avoid mutating the original data
      setLocalOptionsData(JSON.parse(JSON.stringify(optionsData)));
      setHasErrors(false);
      setValidationMap({});
    }
  }, [open, optionsData]);

  const handleSave = () => {
    onSave(localOptionsData);
  };

  const handleOptionChange = (updatedOptions) => {
    setLocalOptionsData(updatedOptions);
  };

  const handleValidationChange = (id, hasError) => {
    setValidationMap((prev) => {
      const newValidationMap = { ...prev, [id]: hasError };
      setHasErrors(Object.values(newValidationMap).some((error) => error));
      return newValidationMap;
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Options</DialogTitle>
      <DialogContent dividers>
        {localOptionsData.length > 0 ? (
          <EditOptionsTree
            id="root"
            options={localOptionsData}
            onOptionChange={handleOptionChange}
            onValidationChange={handleValidationChange}
          />
        ) : (
          <Box textAlign="center" mt={2}>
            No options available. Click "Add Option" to get started.
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          color="primary"
          variant="contained"
          disabled={hasErrors}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditOptionsDialog;
