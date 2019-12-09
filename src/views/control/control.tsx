import React from 'react';
import ColorInput from '../../components/colorInput/colorInput';
import styles from './styles.module.css';
import { IControlProps } from './types';

const Control = (props: IControlProps) => (
  <div className={styles.view}>
    <ColorInput
      label='Foreground'
      color={props.foreground}
      onChange={props.onSetForeground}
    />
    <ColorInput
      label='Background'
      color={props.background}
      onChange={props.onSetBackground}
    />
  </div>
);

export default Control;