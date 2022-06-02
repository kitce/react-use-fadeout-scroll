import type React from 'react';
import { useMemo, useRef } from 'react';
import { useScroll } from 'react-use';

module UseFadeoutScroll {
  /**
   * `useFadeoutScroll` hook options
   */
  export interface IOptions {
    /** 
     * fading rate, 0-1
     * @default 1
     */
    fadingRate?: number;
  }
  /**
   * `useFadeoutScroll` hook result
   */
  export type TResult<T> = [
    /** the ref object to be attached to the target element */
    React.RefObject<T>,
    /** the style to be applied to the scroll container */
    React.CSSProperties
  ];
}

const useFadeoutScroll = <T extends HTMLElement> (options: UseFadeoutScroll.IOptions): UseFadeoutScroll.TResult<T> => {
  const { fadingRate = 1 } = options;

  const ref = useRef<T>(null);
  const { y } = useScroll(ref);

  const style = useMemo<React.CSSProperties>(() => {
    if (ref.current) {
      const { clientHeight, scrollHeight } = ref.current;
      const gradients: string[] = [];
      if (y > 0) {
        gradients.push('transparent 0%');
        gradients.push(`black ${((y / scrollHeight) * fadingRate) * 100}%`);
      }
      if ((scrollHeight - clientHeight) > y) {
        gradients.push(`black ${(1 - ((scrollHeight - clientHeight - y) / scrollHeight) * fadingRate) * 100}%`);
        gradients.push('transparent 100%');
      }
      if (gradients.length > 0) {
        const maskImage = `linear-gradient(${gradients.join(', ')})`;
        return { WebkitMaskImage: maskImage, maskImage };
      }
    }
    return {};
  }, [fadingRate, y]);

  return [ref, style];
};

export default useFadeoutScroll;
