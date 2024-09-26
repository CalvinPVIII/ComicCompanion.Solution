import "../../styles/IssueImg.css";
import { ReactZoomPanPinchRef, TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { useState } from "react";
import IssueImgPageControls from "./IssueImgPageControls";
import Loading from "./Loading";
import { errorAlert } from "../../helpers/alertCreators";
import { useDispatch } from "react-redux";
interface IssueImageProps {
  img: string;
  alt: string;
  leftCallback: () => void;
  middleCallback: () => void;
  rightCallback: () => void;
  imgLoading: boolean;
  loadEndCallback: () => void;
  loadStartCallback: () => void;
}
export default function IssueImage(props: IssueImageProps) {
  const [panStartX, setPanStartX] = useState(0);
  const dispatch = useDispatch();

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

  const loadStart = () => {
    props.loadStartCallback();
  };

  const handleError = () => {
    errorAlert(dispatch, "Error Loading Image");
    console.log("error loading image");
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
              <img
                src={import.meta.env.VITE_IMG_PROXY + props.img}
                alt={props.alt}
                id="issue-img"
                onLoad={loadEnd}
                onLoadStart={loadStart}
                onError={handleError}
              />
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>
    </>
  );
}
