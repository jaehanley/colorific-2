import React, { Component} from 'react';
import { SketchPicker, ColorResult } from 'react-color';
import Chroma from 'chroma-js';
import styles from './styles.module.css';
import { IColorInputProps, IColorInputState } from './types';

export default class ColorInput extends Component<IColorInputProps, IColorInputState> {
  state = {
    showColorPicker: false
  }

  private pickerContainerElem: HTMLDivElement | undefined;
  private pickerContainerElemRef = (elem: HTMLDivElement) => (
    this.pickerContainerElem = elem
  );

  toggleShowPicker = () => this.setState({
    showColorPicker: !this.state.showColorPicker
  });

  handleColorChange = (color: ColorResult) =>
    this.props.onChange(Chroma(color.hex));

  handlePickerClick = (e: React.MouseEvent) => {
    if (e.target === this.pickerContainerElem) {
      this.toggleShowPicker();
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <label className={styles.buttonLabel}>
          <b className={styles.labelText}>
            {this.props.label}
          </b>
          <button
            className={styles.button}
            onClick={this.toggleShowPicker}
            style={{
              backgroundColor: this.props.color.hex()
            }}
          />
          <i className={styles.labelHex}>
            {this.props.color.hex()}
          </i>
        </label>
        {this.state.showColorPicker && (
          <div
            ref={this.pickerContainerElemRef}
            className={styles.pickerContainer}
            onClick={this.handlePickerClick}
          >
            <SketchPicker
              color={this.props.color.hex()}
              onChange={this.handleColorChange}
              disableAlpha
            />
          </div>
        )}
      </div>
    )
  }
};