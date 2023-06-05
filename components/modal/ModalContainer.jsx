import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

function ModalContainer({ children }) {
  const [target, setTarget] = useState(null);

  useEffect(() => {
    if (document) {
      setTarget(document.getElementById("modal"));
    }
  }, []);

  if (!target) return <></>;

  return createPortal(children, target);

  // return createPortal(<>{children}</>, document.getElementById("modal"));
}

export default ModalContainer;
