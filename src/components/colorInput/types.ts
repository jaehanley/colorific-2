import { Color } from 'chroma-js';

export interface IColorInputProps {
  /** The foreground color chroma-js object */
  foreground: Color;
  /** The background color chroma-js object */
  background: Color;
  /**
   * Callback to set the foreground color
   * @param color a Chroma-js color object
   */
  onUpdateForeground: (color: Color) => void;
  /**
   * Callback to set the background color
   * @param color a Chroma-js color object
   */
  onUpdateBackground: (color: Color) => void;
}