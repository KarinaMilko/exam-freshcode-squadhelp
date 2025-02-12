import React, { useState } from 'react';
import CONSTANTS from './../../constants';
import styles from './ButtonGroup.module.sass';

const { STATIC_IMAGES_PATH, ButtonGroupItems } = CONSTANTS;

function ButtonGroup() {
  const [isActive, setIsActive] = useState(false);

  const btnGroupActive = index => {
    setIsActive(index);
  };

  return (
    <>
      <div className={styles.btnGroupContainer}>
        <h3 className={styles.btnGroupTitle}>
          Do you want a matching domain (.com URL) with your name?
        </h3>
        <div className={styles.btnGroupOptions}>
          {ButtonGroupItems.map(({ label, description }, index) => (
            <div
              className={`${styles.btnGroupOption} ${
                isActive === index ? styles.btnGroupOptionActive : ''
              }`}
              key={index}
              onClick={() => btnGroupActive(index)}
            >
              {index === 0 && (
                <span className={styles.btnGroupLabel}>Recommended</span>
              )}
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
          ))}
        </div>
        <p className={styles.btnGroupNote}>
          If you want a matching domain, our platform will only accept those
          name suggestions where the domain is available.
        </p>
      </div>
    </>
  );
}

export default ButtonGroup;
