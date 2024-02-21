import { FormControlLabel, Modal, Radio, RadioGroup } from "@mui/material";
import { useState } from "react";
interface SelectOptionModalProps {
  options: string[];
  open: boolean;
  closeCallback: (selectedOption: string) => void;
  header: string;
  defaultOption?: string;
}

export default function SelectOptionModal(props: SelectOptionModalProps) {
  const [selectedValue, setSelectedValue] = useState(props.defaultOption || "");
  const handleClose = () => {
    props.closeCallback(selectedValue);
  };
  return (
    <>
      <Modal open={props.open} onClose={handleClose}>
        <div id="select-options-modal">
          <h2>{props.header}</h2>

          <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="radio-buttons-group">
            {props.options.map((option) => (
              <FormControlLabel
                value={option}
                control={<Radio />}
                label={option}
                checked={option === selectedValue}
                onClick={() => setSelectedValue(option)}
              />
            ))}
          </RadioGroup>
        </div>
      </Modal>
    </>
  );
}
