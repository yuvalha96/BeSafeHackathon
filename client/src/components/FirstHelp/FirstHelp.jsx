// import React from 'react';
import PropTypes from 'prop-types';
import styles from './FirstHelp.module.css';
import Button from '@mui/material/Button'; // נוודא שאנחנו משתמשים ב-MUI Button אם זה לא נוסף עדיין

function FirstHelp({ items }) {
  return (
    <div className={styles.container}>
      {items.map((item, index) => (
        <div key={index} className={styles.card}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          {item.link && (
            <Button
              onClick={() => window.open(item.link, '_blank')}
            >
              צפה בסרטון
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}

FirstHelp.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      link: PropTypes.string, // נתון חדש שמוסיף אפשרות לסרטון
    })
  ).isRequired,
};

export default FirstHelp;