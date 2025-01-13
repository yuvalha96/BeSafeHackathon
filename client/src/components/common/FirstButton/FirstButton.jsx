import PropTypes from 'prop-types';
import styles from './FirstButton.module.css';

const FirstButton = ({ children, onClick, disabled }) => {
  return (
    <div className={styles['button-container']}>
      
    <button
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
    </div>

  );
};

FirstButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default FirstButton;