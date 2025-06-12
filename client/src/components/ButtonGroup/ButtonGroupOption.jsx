import React, { useState } from 'react';
import CONSTANTS from './../../constants';
import styles from './ButtonGroup.module.sass';

const { STATIC_IMAGES_PATH } = CONSTANTS;

const ButtonGroupOption = ({
  label,
  description,
  index,
  isActive,
  btnGroupActive,
}) => {
  return (
    <div
      className={`${styles.btnGroupOption} ${
        isActive === index ? styles.btnGroupOptionActive : ''
      }`}
      onClick={() => btnGroupActive(index)}
    >
      {index === 0 && <span className={styles.btnGroupLabel}>Recommended</span>}
      {isActive === index && (
        <img
          className={styles.btnGroupIconActive}
          src={`${STATIC_IMAGES_PATH}icon-check.svg`}
          alt="icon"
        />
      )}
      <h4 className={styles.btnGroupOptionLabel}>{label}</h4>
      <p className={styles.btnGroupOptionDescription}>{description}</p>
    </div>
  );
};

export default ButtonGroupOption;
