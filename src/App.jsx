import { useState } from "react";
import { Wheel } from "react-custom-roulette";

import {
	T1,
	StayIn,
	ActivityExt,
	OldFav,
	Casual,
	Semi,
	Formal,
} from "./data.json";
import "./App.css";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";

function App() {
	const [mustSpin, setMustSpin] = useState(false);
	const [prizeNumber, setPrizeNumber] = useState(-1);
	const [outputVal, setOutputVal] = useState("Date Night Idea");
	const [data, setData] = useState(T1);
	const [levels, setLevels] = useState([]);

	function updateData() {
		if (levels.length == 0) {
			if (data[prizeNumber]["option"].includes("Stay")) {
				setLevels((levels) => [...levels, "StayIn"]);
				setData(StayIn);
			} else if (data[prizeNumber]["option"].includes("Try")) {
				setLevels((levels) => [...levels, "TryNew"]);
			} else if (data[prizeNumber]["option"].includes("External")) {
				setLevels((levels) => [...levels, "ActivityExt"]);
				setData(ActivityExt);
			} else {
				setLevels((levels) => [...levels, "OldFav"]);
				setData(OldFav);
			}
		} else {
			if (levels.includes("OldFav")) {
				if (data[prizeNumber]["option"].includes("Casual")) {
					setData(Casual);
				} else if (data[prizeNumber]["option"].includes("Semi")) {
					setData(Semi);
				} else if (data[prizeNumber]["option"].includes("Formal")) {
					setData(Formal);
				}
			}
		}
	}

	const handleSpinClick = async () => {
		if (!mustSpin) {
			const newPrizeNumber = Math.floor(Math.random() * data.length);
			setMustSpin(true);
			setPrizeNumber(newPrizeNumber);
		}
	};

	const reload = () => {
		window.location.reload();
	};

	return (
		<>
			<Stack spacing={1}>
				<Wheel
					mustStartSpinning={mustSpin}
					prizeNumber={prizeNumber}
					data={data}
					onStopSpinning={() => {
						setOutputVal(data[prizeNumber]["option"]);
						updateData();
						setMustSpin(false);
					}}
					backgroundColors={[
						"#30598a",
						"#72bfed",
						"#e4dcbd",
						"#f1b873",
						"#e27a37",
					]}
					textColors={["#ffffff"]}
				/>
				<Button variant="contained" onClick={handleSpinClick}>
					SPIN
				</Button>
				<Button variant="contained" color="error" onClick={reload}>
					RESET
				</Button>

				<p className="textField">{outputVal}</p>
			</Stack>
		</>
	);
}

export default App;
