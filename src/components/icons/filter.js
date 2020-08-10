import * as React from "react";
import Svg, { Path } from "react-native-svg";

function FilterIcon(props) {
  return (
    <Svg viewBox="0 0 384 384" {...props}>
      <Path d="M0 277.333h128V320H0zM0 170.667h256v42.667H0zM0 64h384v42.667H0z" />
    </Svg>
  );
}

export default FilterIcon;
