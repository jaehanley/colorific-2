import React, { Component } from 'react';
import Chroma, { Color } from 'chroma-js';
import Results from '../results/results';
import Control from '../control/control';
import styles from './styles.module.css';
import { IAppState } from './types';

const defaultToDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

export default class App extends Component<{}, IAppState> {
  state = {
    foreground: defaultToDark ? Chroma('white') : Chroma('black'),
    background: defaultToDark ? Chroma('Black') : Chroma('white')
  }

  /**
   * Updates the foreground color
   * @param foreground a Chroma color object
   */
  private setForeground = (foreground: Color) => this.setState({ foreground });

  /**
   * Updates the background color
   * @param background a Chroma color object
   */
  private setBackground = (background: Color) => this.setState({ background });

  private swapColors = () => this.setState({
    foreground: this.state.background,
    background: this.state.foreground
  });

  render() {
    return (
      <div className={styles.appView}>
        <Results
          foreground={this.state.foreground}
          background={this.state.background}
        />
        <Control
          foreground={this.state.foreground}
          background={this.state.background}
          onSetForeground={this.setForeground}
          onSetBackground={this.setBackground}
          onSwapColors={this.swapColors}
        />
      </div>
    );
  }
}