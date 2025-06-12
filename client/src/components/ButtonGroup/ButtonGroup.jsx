import React, { useState } from 'react';
import CONSTANTS from './../../constants';
import styles from './ButtonGroup.module.sass';
import ButtonGroupOption from './ButtonGroupOption';

const { ButtonGroupItems } = CONSTANTS;

function ButtonGroup() {
  const [isActive, setIsActive] = useState(0);

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
            <ButtonGroupOption
              key={index}
              index={index}
              label={label}
              description={description}
              isActive={isActive}
              btnGroupActive={btnGroupActive}
            />
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
