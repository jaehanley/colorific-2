import React, { Component } from 'react';
import Chroma, { Color } from 'chroma-js';
import Results from '../results/results';
import styles from './styles.module.css';
import { IAppState } from './types';

export default class App extends Component {
  state: IAppState = {
    foreground: Chroma('black'),
    background: Chroma('white')
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
      </div>
    );
  }
}