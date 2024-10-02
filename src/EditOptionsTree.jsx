import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  Button,
  Paper,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

const EditOptionsTree = ({
  id,
  options,
  onOptionChange,
  onValidationChange,
  level = 0,
}) => {
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    validateOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  const validateOptions = () => {
    let hasError = false;
    const optionNames = options.map((item) => item.option.trim());
    const duplicates = optionNames.filter(
      (item, index) => optionNames.indexOf(item) !== index && item !== ""
    );
    const newErrors = options.map((item, index) => {
      const isEmpty = item.option.trim() === "";
      const isDuplicate = duplicates.includes(item.option.trim());
      if (isEmpty || isDuplicate) hasError = true;
      return {
        isEmpty,
        isDuplicate,
      };
    });
    setErrors(newErrors);
    onValidationChange(id, hasError);
  };

  const handleAddOption = () => {
    const newOption = { option: "", subOptions: [] };
    const updatedOptions = [...options, newOption];
    onOptionChange(updatedOptions);
  };

  const handleDeleteOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    onOptionChange(updatedOptions);
  };

  const handleOptionTextChange = (index, value) => {
    const updatedOption = { ...options[index], option: value };
    const updatedOptions = [...options];
    updatedOptions[index] = updatedOption;
    onOptionChange(updatedOptions);
  };

  const handleSubOptionsChange = (index, subOptions) => {
    const updatedOption = { ...options[index], subOptions };
    const updatedOptions = [...options];
    updatedOptions[index] = updatedOption;
    onOptionChange(updatedOptions);
  };

  return (
    <Box ml={level * 2}>
      {options.map((item, index) => {
        const childId = `${id}-${index}`;
        return (
          <Paper
            key={childId}
            variant="outlined"
            sx={{ padding: 2, marginBottom: 2 }}
          >
            <Box display="flex" alignItems="center">
              <TextField
                label={`Option Level ${level + 1}`}
                value={item.option}
                onChange={(e) => handleOptionTextChange(index, e.target.value)}
                fullWidth
                error={errors[index]?.isEmpty || errors[index]?.isDuplicate}
                helperText={
                  errors[index]?.isEmpty
                    ? "Option name cannot be empty."
                    : errors[index]?.isDuplicate
                    ? "Duplicate option name."
                    : ""
                }
              />
              <IconButton
                onClick={() => handleDeleteOption(index)}
                color="error"
                sx={{ marginLeft: 1 }}
              >
                <Delete />
              </IconButton>
            </Box>
            <Box mt={1}>
              <Button
                onClick={() =>
                  handleSubOptionsChange(index, item.subOptions || [])
                }
                variant="text"
                color="primary"
                size="small"
              >
                {item.subOptions && item.subOptions.length > 0
                  ? "Edit Sub-Options"
                  : "Add Sub-Options"}
              </Button>
            </Box>
            {item.subOptions && (
              <EditOptionsTree
                id={childId}
                options={item.subOptions}
                onOptionChange={(subOptions) =>
                  handleSubOptionsChange(index, subOptions)
                }
                onValidationChange={onValidationChange}
                level={level + 1}
              />
            )}
          </Paper>
        );
      })}
      <Button
        startIcon={<Add />}
        onClick={handleAddOption}
        variant="outlined"
        color="primary"
        size="small"
        sx={{ marginTop: 1 }}
      >
        Add Option
      </Button>
    </Box>
  );
};

export default EditOptionsTree;
