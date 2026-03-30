import {
  useEffect,
  useRef,
} from 'react';

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      // لو الضغطه كانت جوه العنصر → اعمل ignore
      if (ref.current && ref.current.contains(e.target)) return;

      // لو بره → نفذ ال handler
      handler();
    }

    document.addEventListener("click", handleClick, listenCapturing);

    return () => {
      document.removeEventListener("click", handleClick, listenCapturing);
    };
  }, [handler, listenCapturing]);

  return ref;
}
