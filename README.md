# react-use-fadeout-scroll
React hook to apply fadeout effect to scroll container

## Install

```bash
pnpm add @kitce/react-use-fadeout-scroll
```

## Usage

```ts
module UseFadeoutScroll {
  /**
   * `useFadeoutScroll` hook options
   */
  interface IOptions {
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
  type TResult<T> = [
    /** the ref object to be attached to the scroll container */
    React.RefObject<T>,
    /** the style to be applied to the scroll container */
    React.CSSProperties
  ];
}

const useFadeoutScroll: <T extends HTMLElement>(options: UseFadeoutScroll.IOptions) => UseFadeoutScroll.TResult<T>;
```

## Example
```tsx
import useFadeoutScroll from '@kitce/react-use-fadeout-scroll';

const ScrollContainer = () => {
  const [ref, style] = useFadeoutScroll<HTMLDivElement>({ yFadingRate: 0.3 });
  return (
    <div ref={ref} style={style}>
      {/* very long content */}
    </div>
  );
};
```

## License
MIT License