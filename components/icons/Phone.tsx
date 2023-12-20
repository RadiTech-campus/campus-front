import React from "react";

export default function Phone() {
  return (
    <svg
      width="43"
      height="30"
      viewBox="0 0 43 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="43" height="40" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_2_73"
            transform="matrix(0.0163934 0 0 0.017623 0 -0.0022541)"
          />
        </pattern>
        <image
          id="image0_2_73"
          width="61"
          height="57"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}
