import { useState, useRef, useLayoutEffect } from 'react'

/**
 * Custom react hook to get the normalized mouse position relative to the center of a reference element.
 * Returns 0 for the components if the mouse is not within the reference element.
 */
export function useMouse() : [{x: number, y: number}, React.RefObject<HTMLElement>] {
  const [state, setState] = useState({
    y: 0,
    x: 0,
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
            x: 0,
            y: 0,
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
        newState.x = 0;
        newState.y = 0;
      }
      else {
        newState.x = ((event.pageX - elementTopLeftX) / (width / 2)) - 1;
        newState.y = 1 - ((event.pageY - elementTopLeftY) / (height / 2));
      }

      setState((s) => {
        return {
          x: newState.x,
          y: newState.y,
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