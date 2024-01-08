import { useEffect, ReactNode } from "react";
import Scrollbar from "smooth-scrollbar";
import OverscrollPlugin from "smooth-scrollbar/plugins/overscroll";

import "../../styles/VerticalScroll.css";

interface ScrollbarProps {
  children: ReactNode;
}

export default function VerticalScroll(props: ScrollbarProps) {
  const { children } = props;
  console.log(children);

  const overscrollOptions = {
    enable: true,
    effect: "bounce",
    damping: 0.15,
    maxOverscroll: 150,
    glowColor: "#fff",
  };
  const options = {
    damping: 0.07,
    plugins: {
      overscroll: { ...overscrollOptions },
    },
  };

  useEffect(() => {
    const element = document.getElementById("vertical-scroll");
    if (!element) return;
    Scrollbar.use(OverscrollPlugin);
    Scrollbar.init(element, options);

    return () => {
      if (Scrollbar) Scrollbar.destroy(document.body);
    };
  }, []);

  return <div id="vertical-scroll">{children}</div>;
}
