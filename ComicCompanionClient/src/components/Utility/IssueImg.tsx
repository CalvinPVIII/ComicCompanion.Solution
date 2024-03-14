import "../../styles/IssueImg.css";
import { ReactZoomPanPinchRef, TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { useState } from "react";
import IssueImgPageControls from "./IssueImgPageControls";
import Loading from "./Loading";
interface IssueImageProps {
  img: string;
  alt: string;
  leftCallback: () => void;
  middleCallback: () => void;
  rightCallback: () => void;
  imgLoading: boolean;
  loadEndCallback: () => void;
}
export default function IssueImage(props: IssueImageProps) {
  const [panStartX, setPanStartX] = useState(0);

  const panningStart = (e: ReactZoomPanPinchRef) => {
    setPanStartX(parseInt(e.state.positionX.toFixed()));
  };

  const panningStop = (e: ReactZoomPanPinchRef) => {
    const panStopX = parseInt(e.state.positionX.toFixed());
    if (panStartX - panStopX === 100) {
      props.rightCallback();
    } else if (panStartX - panStopX === -100) {
      props.leftCallback();
    }
  };

  const loadEnd = () => {
    props.loadEndCallback();
  };

  return (
    <>
      {props.imgLoading ? <Loading /> : null}
      <div className={props.imgLoading ? "issue-loading" : "issue"}>
        <TransformWrapper
          doubleClick={{ mode: "reset" }}
          onPanningStop={panningStop}
          onPanningStart={panningStart}
          minPositionX={1000}
          maxPositionX={1}
        >
          <TransformComponent>
            <IssueImgPageControls leftCallback={props.leftCallback} middleCallback={props.middleCallback} rightCallback={props.rightCallback} />
            <div id="issue-wrapper">
              <img src={props.img} alt={props.alt} id="issue-img" onLoad={loadEnd} />
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>
    </>
  );
}
