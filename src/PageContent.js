import React, { useContext } from "react";
import { ThemeContext } from "./contexts/ThemeContext";

export default function PageContent(props) {
  const { isDarkMode } = useContext(ThemeContext);
  const styles = {
    background: isDarkMode
      ? "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(252,246,209,0.9878326330532213) 1%, rgba(146,170,255,1) 100%)"
      : "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(252,246,209,0.9878326330532213) 1%, rgba(255,238,115,1) 100%)",
    height: "200vh",
    width: "100vw",
  };
  return <div style={styles}>{props.children}</div>;
}
