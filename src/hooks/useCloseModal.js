import { useEffect, useRef } from "react";

export function useCloseModal(close) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          close();
        }
      }
      function handleKey(e) {
        if (e.key === "Escape") close();
      }
      window.addEventListener("click", handleClick, true);
      window.addEventListener("keydown", handleKey);
      return () => {
        window.removeEventListener("click", handleClick, true);
        window.removeEventListener("keydown", handleKey);
      };
    },
    [close],
  );
  return { ref };
}
