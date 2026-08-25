import { useEffect, useState } from "react";
import carrot from "../assets/images/carrot.png";
const VegetableCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <img
  src={carrot}
  alt=""
  className="fixed pointer-events-none z-[99999] w-10 h-10 object-contain"
  style={{
    left: position.x,
    top: position.y,
    transform: "translate(-80%, -80%)",
    background: "transparent",
  }}
/>
  );
};

export default VegetableCursor;