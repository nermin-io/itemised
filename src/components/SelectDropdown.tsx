import React from 'react';
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import styles from './SelectDropdown.module.scss';

export type SelectItemValue = {
  value: string;
  label: string;
}
export type SelectOnChangeHandler = (val: string) => void;

interface Props {
  items: Array<SelectItemValue>;
  placeholder?: string;
  ariaLabel?: string;
  value: string;
  onChange: SelectOnChangeHandler;
}

const SelectDropdown: React.FC<Props> = ({ value, onChange, items, placeholder = "Select an item", ariaLabel = "Select Dropdown" }) => (
  <Select.Root value={value} onValueChange={onChange}>
    <Select.Trigger className={styles.SelectTrigger} aria-label={ariaLabel}>
      <Select.Value placeholder={placeholder} />
      <Select.Icon className={styles.SelectIcon}>
        <ChevronDownIcon />
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className={styles.SelectContent}>
        <Select.ScrollUpButton className={styles.SelectScrollButton}>
          <ChevronUpIcon />
        </Select.ScrollUpButton>
        <Select.Viewport className={styles.SelectViewport}>
          { items.map(item => (
            <Select.Item key={item.value} value={item.value} className={styles.SelectItem}>
              <Select.ItemText>{item.label}</Select.ItemText>
              <Select.ItemIndicator className={styles.SelectItemIndicator}>
                <CheckIcon />
              </Select.ItemIndicator>
            </Select.Item>
          ))}
        </Select.Viewport>
        <Select.ScrollDownButton className={styles.SelectScrollButton}>
          <ChevronDownIcon />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);

export default SelectDropdown;
