import { Button, Typography } from '@mui/material';
//import React from 'react';
import styles from './RelaxSection.module.css';

const RelaxSection = () => {
return (
    <div className={styles.relaxSection}>
    <Typography variant="h6" gutterBottom>
        כרגע אתן יכולות לקחת נשימה ארוכה
    </Typography>
    <Button
        variant="contained"
        color="secondary"
        onClick={() => window.open('https://www.youtube.com/results?search_query=relaxing+videos', '_blank')}
    >
        לחץ כאן לסרטונים להרגע
    </Button>
    </div>
);
};

export default RelaxSection;
