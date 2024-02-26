import { useState } from "react";
import "../../styles/IssueImg.css";
interface IssueImageProps {
  img: string;
  alt: string;
}
export default function IssueImage(props: IssueImageProps) {
  const [scale, setScale] = useState(1);

  const handlePinchZoom = (e: React.TouchEvent) => {
    if (e.touches.length >= 2) {
      const distance = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);

      setScale(Math.min(2, Math.max(1, distance / 100)));
    }
  };

  return (
    <div onTouchMove={handlePinchZoom}>
      <img
        src={props.img}
        alt={props.alt}
        id="issue-img"
        style={{
          width: `${scale * 100}%`,
          height: `${scale * 100}%`,
          objectFit: "contain",
          transformOrigin: "0 0",
          transition: "transform 0.1s ease",
        }}
      />
    </div>
  );
}
