export enum Direction {
  Horizontal,
  Vertical
}

const gradientSideMap = {
  [Direction.Horizontal]: 'to right',
  [Direction.Vertical]: 'to bottom'
};

export const getLinearGradient = (direction: Direction, fadingRate: number, scrollPosition: number, scrollSize: number, elementSize: number) => {
  const gradients: string[] = [];
  if (scrollPosition > 0) {
    gradients.push('transparent 0%');
    gradients.push(`black ${((scrollPosition / scrollSize) * fadingRate) * 100}%`);
  }
  if ((scrollSize - elementSize) > scrollPosition) {
    gradients.push(`black ${(1 - ((scrollSize - elementSize - scrollPosition) / scrollSize) * fadingRate) * 100}%`);
    gradients.push('transparent 100%');
  }
  if (gradients.length > 0) {
    const side = gradientSideMap[direction];
    return `linear-gradient(${side}, ${gradients.join(', ')})`;
  }
};
