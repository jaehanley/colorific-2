import React, { Component} from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import Chroma from 'chroma-js';
import styles from './styles.module.css';
import { IColorInputProps, IColorInputState } from './types';

export default class ColorInput extends Component<IColorInputProps, IColorInputState> {
  state = {
    showColorPicker: false
  }

  /**
   * Ref for div containing the react color picker
   */
  private pickerContainerElem: HTMLDivElement | undefined;
  /**
   * Function for setting the picker container ref
   */
  private pickerContainerElemRef = (elem: HTMLDivElement) => (
    this.pickerContainerElem = elem
  );

  /**
   * Toggles if the color picker is visible,
   * Adds or removes event handler for outside of div clicks
   */
  private toggleShowPicker = () => this.setState({
    showColorPicker: !this.state.showColorPicker
  }, () => setTimeout(() => {
      if (this.state.showColorPicker) {
        window.addEventListener('click', this.handlePickerClick);
      } else {
        window.removeEventListener('click', this.handlePickerClick);
      }
    }, 0)
  );

  private hidePicker = () => this.setState({
    showColorPicker: false,
  }, () => window.removeEventListener('click', this.handlePickerClick));

  /**
   * Sends the updated color value to the parent as a Chroma color object
   */
  private handleColorChange = (color: ColorResult) =>
    this.props.onChange(Chroma(color.hex));

  /**
   * Handles outside element clicks to hide the color picker modal
   */
  private handlePickerClick = (e: MouseEvent) => {
    if (e.target !== this.pickerContainerElem && !(e.target && this.pickerContainerElem && this.pickerContainerElem.contains(e.target as Element))) {
      this.toggleShowPicker();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handlePickerClick);
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
          >
            <ChromePicker
              color={this.props.color.hex()}
              onChange={this.handleColorChange}
              disableAlpha
            />
            <button
              className={styles.doneBtn}
              onClick={this.hidePicker}
            >
              Done
            </button>
          </div>
        )}
      </div>
    )
  }
};