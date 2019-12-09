import React from 'react';
import { ISwatchProps } from './types';

const Swatch = (props: ISwatchProps) => {
  const handleOnClick = () => props.onClick(props.foreground, props.background);
  return (
    <button
      onClick={handleOnClick}
      style={{
        backgroundColor: props.foreground.hex()
      }}
    >
      <span
        style={{
          backgroundColor: props.background.hex()
        }}
      />
    </button>
  );
};

export default Swatch;
