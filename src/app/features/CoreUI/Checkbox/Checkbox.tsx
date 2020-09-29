import React, { useState, forwardRef, Ref, useCallback } from 'react';
import classNames from 'classnames';

import styles from './Checkbox.module.scss';
import CheckboxIcon from '../Icons/CheckboxIcon';

export interface Props {
  /**
   * Identifier for form submit
   */
  name?: string;

  /**
   * Label of Checkbox
   */
  label?: string;

  /**
   * Disabled status
   */
  disabled?: boolean;

  /**
   * Checkbox click event
   */
  onChange?: (newChecked: boolean) => void;

  /**
   * React ref passtrough to input node
   */
  ref?: Ref<HTMLInputElement>;
}

const Checkbox: React.FC<Props> = forwardRef((props, ref) => {
  const { onChange, disabled, label, ...otherProps } = props;
  const labelClasses = classNames(styles.label, { [styles.disabled]: disabled });
  const [hover, onHover] = useState(false);
  const [checked, setCheck] = useState(false);

  const check = useCallback(() => {
    const newValue = !checked;
    setCheck(newValue);

    if (onChange) {
      onChange(newValue);
    }
  }, [checked, onChange]);

  return (
    <div>
      <label>
        <input
          type='checkbox'
          className={styles.hidden}
          ref={ref}
          checked={checked}
          disabled={disabled}
          onChange={check}
          {...otherProps}
        />
        <span
          className={styles.styledCheckbox}
          onMouseEnter={() => {
            onHover(true);
          }}
          onMouseLeave={() => {
            onHover(false);
          }}
        >
          <span className={styles.checkBoxIcon}>
            <CheckboxIcon
              isActive={checked}
              disabled={disabled}
              hasHover={!disabled && hover}
            />
          </span>
          <span className={labelClasses}>{label}</span>
        </span>
      </label>
    </div>
  );
});

export default Checkbox;
