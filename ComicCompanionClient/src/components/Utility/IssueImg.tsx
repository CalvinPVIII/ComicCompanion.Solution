import "../../styles/IssueImg.css";
import { ReactZoomPanPinchRef, TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { useEffect, useState } from "react";
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
  loadStartCallback: () => void;
}
export default function IssueImage(props: IssueImageProps) {
  const [panStartX, setPanStartX] = useState(0);
  const [imgUrl, setImgUrl] = useState<string>(props.img);

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
    console.log("error");
    const backupUrl = props.img + "?backup";
    setImgUrl(backupUrl);
    // checkImage(backupUrl);
  };

  const checkImage = async (url: string) => {
    if (props.imgLoading) {
      await fetch(url)
        .then((r) => console.log(r))
        .catch((e) => {
          console.log(e);
          handleError();
        });
    }
  };

  useEffect(() => {
    checkImage(props.img);
  }, [props.img]);

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
              <img src={imgUrl} alt={props.alt} id="issue-img" onLoad={loadEnd} onLoadStart={loadStart} onError={handleError} />
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>
    </>
  );
}
