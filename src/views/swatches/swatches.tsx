import React, { Component } from 'react';
import classnames from 'classnames';
import AddIcon from '../../assets/add-swatch-btn.svg';
import TrashIcon from '../../assets/trash.svg';
import { ISwatchesProps } from './types';
import styles from './styles.module.css';

export default class Swatches extends Component<ISwatchesProps> {
  
  private get swatchExists() {
    return this.props.swatches.filter(swatch => 
      swatch.foreground.hex() === this.props.foreground.hex() &&
      swatch.background.hex() === this.props.background.hex()
    ).length > 0;
  }

  private handleAddSwatch = () =>
    this.props.onAddSwatch(this.props.foreground, this.props.background);

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.swatchContainer}>
          {this.props.swatches.map((swatch, index) => {
            const activeSwatch = this.props.foreground.hex() === swatch.foreground.hex() &&
              this.props.background.hex() === swatch.background.hex();
            const handleSwatchClick = () => this.props.onSwatchClick(swatch.foreground, swatch.background);
            const handleSwatchDelete = () => this.props.onRemoveSwatch(index);
            return (
              <div
                key={`${swatch.foreground.hex()}-${swatch.background.hex()}`}
                className={classnames(
                  styles.swatch,
                  activeSwatch && styles.active
                )}
              >
                <button
                  disabled={activeSwatch}
                  className={styles.background}
                  onClick={handleSwatchClick}
                  style={{
                    background: swatch.background.hex()
                  }}
                >
                  <div
                    className={styles.foreground}
                    style={{
                      borderColor: `transparent transparent transparent ${swatch.foreground.hex()}`
                    }}
                  />
                </button>
                <div className={styles.deleteContainer}>
                  <button
                    className={styles.deleteBtn}
                    onClick={handleSwatchDelete}
                  >
                    <img
                      alt="Remove swatch"
                      src={TrashIcon}
                    />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
        <button
          disabled={this.swatchExists}
          className={styles.addBtn}
          onClick={this.handleAddSwatch}
        >
          <img
            alt='Save swatch'
            src={AddIcon}
          />
        </button>
      </div>
    );
  }
}