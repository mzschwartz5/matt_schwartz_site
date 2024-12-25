import { useState, useRef, useLayoutEffect } from 'react'

/**
 * Custom react hook to get the mouse position (ratio) relative to the top-left corner of a reference element.
 * Returns -1 for the ratio components if the mouse is not within the reference element.
 */
export function useMouse() : [{elementX: number, elementY: number}, React.RefObject<HTMLElement>] {
  const [state, setState] = useState({
    elementX: -1,
    elementY: -1,
  });

  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      let newState = {
        ...state
      };

      if (ref.current?.nodeType !== Node.ELEMENT_NODE) {
        setState((s) => {
          return {
            elementX: -1,
            elementY: -1,
          };
        });

        return;
      }

      const { left, top, right, bottom, width, height } = ref.current.getBoundingClientRect();
      const elementTopLeftX = left + window.scrollX;
      const elementTopLeftY = top + window.scrollY;
      const elementBottomRightX = right + window.scrollX;
      const elementBottomRightY = bottom + window.scrollY;

      if (
        event.pageX < elementTopLeftX ||
        event.pageX > elementBottomRightX ||
        event.pageY < elementTopLeftY ||
        event.pageY > elementBottomRightY
      ) {
        newState.elementX = -1;
        newState.elementY = -1;
      }
      else {
        newState.elementX = (event.pageX - elementTopLeftX) / width;
        newState.elementY = (event.pageY - elementTopLeftY) / height;
      }

      setState((s) => {
        return {
          elementX: newState.elementX,
          elementY: newState.elementY,
        };
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return [state, ref];
}