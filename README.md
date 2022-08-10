# react-use-fadeout-scroll
React hook to apply fadeout effect to scroll container

## Install

```bash
pnpm add @kitce/react-use-fadeout-scroll
```

## Documentation

[Documentation](https://kitce.github.io/react-use-fadeout-scroll/)

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
