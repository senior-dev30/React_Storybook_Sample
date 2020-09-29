import React, { useState, forwardRef, Ref } from 'react';
import classNames from 'classnames';

import styles from './Select.module.scss';
import ArrowDownIcon from '../Icons/ArrowDownIcon';
import ArrowUpIcon from '../Icons/ArrowUpIcon';
import CheckboxIcon from '../Icons/CheckboxIcon';

interface OptionProps {
  /**
   * Option Key
   */
  key: number;

  /**
   * Option label (value)
   */
  label: string;

  /**
   * Option type
   */
  type?: string;
}

export interface Props {

  /**
   * Option Label
   */
  label: string;

  /**
   * Selectable Options
   */
  items: OptionProps[];

  /**
   * Select Option Type: MultipleSelect or SingleSelect
   */
  type: 'single' | 'multi';

  /**
   * Disabled Flag => if true, Select will be disabled
   */
  disabled?: boolean;

  /**
   * Identifier for form submit
   */
  name?: string;

  /**
   * React ref passtrough to select node
   */
  ref?: Ref<HTMLSelectElement>;
}

const Select: React.FC<Props> = forwardRef((props, ref) => {
  const {
    items,
    label,
    type,
    disabled,
    name,
  } = props;
  const [open, onSelect] = useState(false);
  const [hoveredIndex, onHover] = useState();
  const [selectedOption, selectOption] = useState();

  return (
    <div className={classNames(styles.select, { [styles.disabled]: disabled })}>
      {type === 'single' && (
        <select
          name={name}
          className={styles.hidden}
          value={selectedOption && (selectedOption as OptionProps).label}
          ref={ref}
          onChange={() => {}}
        >
          {items.map((item: OptionProps) => (
            <option value={item.label} key={item.key}>
              {item.label}
            </option>
          ))}
        </select>
      )}
      {type === 'multi' && (
        <select
          multiple
          className={styles.hidden}
          name={name}
          value={
            selectedOption
            && (selectedOption as OptionProps[]).map((option: OptionProps) => option.label)
          }
          ref={ref}
          onChange={() => {}}
        >
          {items.map((item: OptionProps) => (
            <option value={item.label} key={item.key}>
              {item.label}
            </option>
          ))}
        </select>
      )}
      <div
        className={styles.selectBtn}
        onClick={() => {
          onSelect(!open && !disabled);
        }}
        onKeyDown={() => {}}
        role='menuitem'
        tabIndex={0}
        aria-label='Panel'
      >
        <div style={{ paddingLeft: 3 }}>{ (selectedOption && selectedOption.label) || label }</div>
        <span className={styles.arrow}>
          {!open && <ArrowDownIcon />}
          {open && <ArrowUpIcon />}
        </span>
      </div>
      {!disabled && open && (
        <div className={styles.content}>
          {type === 'single'
            && items.map((item: OptionProps, index: number) => (
              <div
                className={classNames(styles.link, styles.single, {
                  [styles.lastOne]: index + 1 === items.length,
                  [styles.highlight]: item.type === 'highlight',
                })}
                onClick={() => {
                  onSelect(false);
                  selectOption(item);
                }}
                onKeyDown={() => {}}
                role='menuitem'
                tabIndex={index}
                key={item.key}
              >
                {item.label}
              </div>
            ))}
          {type === 'multi'
            && items.map((item: OptionProps, index: number) => {
              let checkedOptions = (selectedOption as OptionProps[]) || [];
              const opIndex = checkedOptions.findIndex(
                (option: OptionProps) => option.key === item.key,
              );
              return (
                <div
                  className={classNames(styles.link, styles.multi, { [styles.lastOne]: index + 1 === items.length })}
                  onClick={() => {
                    if (opIndex === -1) {
                      checkedOptions = [...checkedOptions, item];
                    } else {
                      checkedOptions.splice(opIndex, 1);
                    }
                    selectOption([...checkedOptions]);
                  }}
                  onKeyDown={() => {}}
                  role='menuitem'
                  tabIndex={index}
                  key={item.label}
                >
                  <span
                    className={styles.multiOption}
                    onMouseEnter={() => {
                      onHover(index);
                    }}
                    onMouseLeave={() => {
                      onHover(index);
                    }}
                  >
                    <span className={styles.checkbox}>
                      <CheckboxIcon
                        isActive={opIndex !== -1}
                        hasHover={hoveredIndex === index}
                      />
                    </span>
                    <span className={styles.multiLabel}>{item.label}</span>
                  </span>
                </div>
              );
            })}
          <div
            className={styles.contentPanel}
            onClick={() => {
              onSelect(false);
            }}
            onKeyDown={() => {}}
            role='menuitem'
            tabIndex={0}
            aria-label='Panel'
          />
        </div>
      )}
    </div>
  );
});

export default Select;
