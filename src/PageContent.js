import React, { useContext } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import Background1 from "./images/texture-wooden-boards_1249-132.jpg";
import Background2 from "./images/img2.jpg";

export default function PageContent(props) {
  const { isDarkMode } = useContext(ThemeContext);
  const styles = {
    backgroundImage: isDarkMode ? `url(${Background2}` : `url(${Background1})`,
    backgroundPosition: "left",
    backgroundSize: "contain",
    backgroundRepeat: "repeat-y",
  };
  return <div style={styles}>{props.children}</div>;
}
