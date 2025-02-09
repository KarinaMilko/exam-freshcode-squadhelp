import React from 'react';
import CONSTANTS from './../../constants';
import styles from './ButtonGroup.module.sass';

const { STATIC_IMAGES_PATH } = CONSTANTS;
function ButtonGroup() {
  const btnSelect = [
    {
      label: 'Yes',
      description: 'But minor variations are allowed',
    },
    {
      label: 'Yes',
      description: 'The Domain should exactly match the name',
    },
    {
      label: 'No',
      description: 'I am only looking for a name, not a Domain',
    },
  ];

  return (
    <>
      <div className={styles.btnGroupContainer}>
        <h3 className={styles.btnGroupTitle}>
          Do you want a matching domain (.com URL) with your name?
        </h3>
        <div className={styles.btnGroupOptions}>
          {btnSelect.map((item, index) => (
            <div className={styles.btnGroupOption} key={index}>
              {index === 0 && (
                <span className={styles.btnGroupLabel}>Recommended</span>
              )}
              <img
                className={styles.btnGroupIcon}
                src={`${STATIC_IMAGES_PATH}icon-check.svg`}
                alt="icon"
              />
              <h4 className={styles.btnGroupOptionLabel}>{item.label}</h4>
              <p className={styles.btnGroupOptionDescription}>
                {item.description}
              </p>
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
