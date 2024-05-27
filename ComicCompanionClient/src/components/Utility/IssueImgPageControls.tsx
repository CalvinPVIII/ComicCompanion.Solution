import { useState } from "react";
import "../../styles/IssueImgPageControls.css";

interface IssueImgPageControlsProps {
  leftCallback: () => void;
  middleCallback: () => void;
  rightCallback: () => void;
}

export default function IssueImgPageControls(props: IssueImgPageControlsProps) {
  const [lastMouseDown, setLastMouseDown] = useState<number>(0);

  const handleMouseDown = () => {
    const mouseDownTime = new Date();
    setLastMouseDown(mouseDownTime.getTime());
  };

  const handleMouseUp = (pageSection: "left" | "middle" | "right") => {
    const mouseUpTime = new Date();
    const mouseClickTime = mouseUpTime.getTime() - lastMouseDown;
    // if the user clicks and doesn't hold
    if (mouseClickTime < 165) {
      pageSection === "left" ? props.leftCallback() : pageSection === "middle" ? props.middleCallback() : props.rightCallback();
    }
  };

  return (
    <div id="page-controls">
      <div id="page-left" onMouseDown={handleMouseDown} onMouseUp={() => handleMouseUp("left")}></div>
      <div id="page-middle" onMouseDown={handleMouseDown} onMouseUp={() => handleMouseUp("middle")}></div>
      <div id="page-right" onMouseDown={handleMouseDown} onMouseUp={() => handleMouseUp("right")}></div>
    </div>
  );
}
