import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Direction, getLinearGradient } from './helpers';

export module UseFadeoutScroll {
  /**
   * `useFadeoutScroll` hook options
   */
  export interface IOptions {
    /** 
     * horizontal fading rate, 0-1, set 0 to disable
     * @default 0
     */
    xFadingRate?: number;
    /** 
     * vertical fading rate, 0-1, set 0 to disable
     * @default 0
     */
    yFadingRate?: number;
  }
  /**
   * `useFadeoutScroll` hook result
   */
  export type TResult<T> = [
    /** the ref object to be attached to the scroll container */
    React.RefObject<T>,
    /** the style to be applied to the scroll container */
    React.CSSProperties
  ];
}

const useFadeoutScroll = <T extends HTMLElement> (options: UseFadeoutScroll.IOptions): UseFadeoutScroll.TResult<T> => {
  const { xFadingRate = 0, yFadingRate = 0 } = options;

  const ref = useRef<T>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleScroll = useCallback(() => {
    if (ref.current) {
      const { clientHeight, clientWidth, scrollTop, scrollLeft, scrollHeight, scrollWidth } = ref.current;
      const maskImages: string[] = [];
      /* horizontal */
      if (xFadingRate > 0) {
        const linearGradient = getLinearGradient(Direction.Horizontal, xFadingRate, scrollLeft, scrollWidth, clientWidth);
        if (linearGradient) {
          maskImages.push(linearGradient);
        }
      }
      /* vertical */
      if (yFadingRate > 0) {
        const linearGradient = getLinearGradient(Direction.Vertical, yFadingRate, scrollTop, scrollHeight, clientHeight);
        if (linearGradient) {
          maskImages.push(linearGradient);
        }
      }
      const maskImage = maskImages.join(', ');
      setStyle({
        WebkitMaskImage: maskImage,
        maskImage
      });
    } else {
      setStyle({});
    }
  }, [xFadingRate, yFadingRate]);

  useEffect(() => {
    ref.current?.addEventListener('scroll', handleScroll);
    return () => {
      ref.current?.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  /* apply the effect on mount */
  useEffect(() => {
    handleScroll();
  }, []);

  return [ref, style];
};

export default useFadeoutScroll;
