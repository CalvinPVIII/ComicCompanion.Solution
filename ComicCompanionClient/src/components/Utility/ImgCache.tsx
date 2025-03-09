import { useEffect, useState } from "react";
import loadImg from "../../helpers/loadImg";
interface ImgCacheProps {
  img: string;
}

export default function ImgCache(props: ImgCacheProps) {
  const [nonProxyLoadError, setNonProxyLoadError] = useState(false);

  const handleError = () => {
    setNonProxyLoadError(true);
  };

  useEffect(() => {
    setNonProxyLoadError(false);
    console.log("useEffect");
  }, [props.img]);

  return (
    <>
      {nonProxyLoadError ? (
        <img className="hidden-issue-img" src={loadImg(props.img)} referrerPolicy="no-referrer" onError={handleError} />
      ) : (
        <img className="hidden-issue-img" src={props.img} referrerPolicy="no-referrer" onError={handleError} />
      )}
    </>
  );
}
