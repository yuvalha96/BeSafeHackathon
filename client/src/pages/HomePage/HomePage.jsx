import { useNavigate } from 'react-router-dom';
import bulling from '../../assets/bulling.png';
import StartQ from "../../components/StartQ/StartQ.jsx";
import styles from './Home.module.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    console.log('Start Question button clicked!');
    navigate('/questions');
  };

  return (
    <div className={styles.home}>

      <img src={bulling} alt="Bulling illustration" className={styles.image} />

      <div className={styles["text-container"]}>

        <h1 className={styles.headline}>מתמודדים עם פגיעות ברשת</h1>
        <p className={styles.subheading}>זיהוי פגיעות. מתן הכוונה. תמיכה אישית.</p>
        
        <p className={styles.description}>אם נתקלתם בתוכן ברשת שגרם לכם להרגיש לא בנוח,
       חוויתם חוויה לא נעימה,
        או שאתם מעוניינים לדווח ולבקש עזרה,
        התחילו בשיחה ותקבלו הכוונה למענה המתאים ביותר עבורכם.
        </p>

        <StartQ className={styles['start-button']} onClick={handleStartClick} />
        </div>


    </div>

  );
};

export default HomePage;
