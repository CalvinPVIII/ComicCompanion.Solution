import { useState } from "react";
import "../../styles/IssueImg.css";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
interface IssueImageProps {
  img: string;
  alt: string;
  leftCallback: () => void;
  middleCallback: () => void;
  rightCallback: () => void;
}
export default function IssueImage(props: IssueImageProps) {
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
    <div>
      <TransformWrapper>
        <TransformComponent>
          <div id="page-controls">
            <div className="page-left" onMouseDown={handleMouseDown} onMouseUp={() => handleMouseUp("left")}></div>
            <div className="page-middle" onMouseDown={handleMouseDown} onMouseUp={() => handleMouseUp("middle")}></div>
            <div className="page-right" onMouseDown={handleMouseDown} onMouseUp={() => handleMouseUp("right")}></div>
          </div>
          <div id="issue-wrapper">
            <img src={props.img} alt={props.alt} id="issue-img" />
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}
