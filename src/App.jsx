import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import initialData from "./data.json";
import "./App.css";
import { Button, Stack, Box } from "@mui/material";
import SelectionTree from "./SelectionTree";
import EditOptionsDialog from "./EditOptionsDialog";

function App() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(-1);
  const [optionsData, setOptionsData] = useState([]);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  useEffect(() => {
    // Load initial data
    setOptionsData(initialData);
    setCurrentOptions(initialData);
  }, []);

  const handleSpinClick = () => {
    if (!mustSpin && currentOptions && currentOptions.length > 0) {
      const newPrizeNumber = Math.floor(Math.random() * currentOptions.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  const handleSpinComplete = () => {
    if (currentOptions && currentOptions[prizeNumber]) {
      const selectedOption = currentOptions[prizeNumber];
      setSelectedItems((prevItems) => [...prevItems, selectedOption.option]);
      updateCurrentOptions(selectedOption);
    }
    setMustSpin(false);
  };

  const updateCurrentOptions = (selectedOption) => {
    if (selectedOption.subOptions && selectedOption.subOptions.length > 0) {
      setCurrentOptions(selectedOption.subOptions);
    } else {
      // Reached a leaf node
      setCurrentOptions(null);
    }
  };

  const reload = () => {
    // Reset all state variables to their initial values
    setMustSpin(false);
    setPrizeNumber(-1);
    setSelectedItems([]);
    setCurrentOptions(optionsData);
  };

  const handleEditClick = () => {
    setEditDialogOpen(true);
  };

  const handleEditSave = (updatedData) => {
    setOptionsData(updatedData);
    setCurrentOptions(updatedData);
    setSelectedItems([]);
    setMustSpin(false);
    setPrizeNumber(-1);
    setEditDialogOpen(false);
  };

  const handleEditCancel = () => {
    setEditDialogOpen(false);
  };

  return (
    <Stack spacing={4} alignItems="center" sx={{ padding: 4 }}>
      {currentOptions && currentOptions.length > 0 ? (
        <>
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={currentOptions.map((item) => ({ option: item.option }))}
            onStopSpinning={handleSpinComplete}
            backgroundColors={[
              "#30598a",
              "#72bfed",
              "#e4dcbd",
              "#f1b873",
              "#e27a37",
            ]}
            textColors={["#ffffff"]}
            perpendicularText={true}
          />
          <Button
            variant="contained"
            onClick={handleSpinClick}
            disabled={mustSpin}
            sx={{ padding: "16px 32px", fontSize: "1.25rem" }}
          >
            SPIN
          </Button>
        </>
      ) : (
        <Box fontSize="1.5rem" fontWeight="bold">
          No further options available.
        </Box>
      )}

      <Button
        variant="contained"
        color="error"
        onClick={reload}
        sx={{ padding: "16px 32px", fontSize: "1.25rem" }}
      >
        RESET
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={handleEditClick}
        sx={{ padding: "16px 32px", fontSize: "1.25rem" }}
      >
        EDIT OPTIONS
      </Button>

      <SelectionTree selectedItems={selectedItems} />

      {/* Edit Options Dialog */}
      <EditOptionsDialog
        open={editDialogOpen}
        onClose={handleEditCancel}
        onSave={handleEditSave}
        optionsData={optionsData}
      />
    </Stack>
  );
}

export default App;
