import { css, Global } from "@emotion/react";
import React from "react";

export const globalStyles = (
  <Global
    styles={css`
      html,
      body {
        margin: 0;
        background: white;
        font-family: Helvetica, Arial, sans-serif, -apple-system,
          BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
          "Open Sans", "Helvetica Neue";
      }
    `}
  />
);
