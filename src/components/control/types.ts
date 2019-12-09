import { Color } from 'chroma-js';

export interface IControlProps {
  /** Input color value, a Chroma-js object */
  value: Color;
  /**
   * Fires when color value has change
   * @param value the new color value, as a Chroma-js object
   */
  onChange: (value: Color) => void;
}