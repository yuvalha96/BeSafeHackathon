// import PropTypes from 'prop-types';
// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import OrganizationCard from '../../components/OrganizationCard/OrganizationCard';
// import styles from './RecommendationPage.module.css';
// // import RelaxSection from '../../components/button/RelaxSection';
// import FirstHelp from '../../components/FirstHelp/FirstHelp';
// import firstHelpData from '../../components/FirstHelp/firstHelpData.json';

// function RecommendationPage() {
//   const { id } = useParams();
//   const [recData, setRecData] = useState({});
//   const [loading, setLoading] = useState(true);

//   const getRecData = async () => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/recommendation/${id}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!res.ok) {
//         throw new Error('Failed to fetch data');
//       }

//       const {data} = await res.json();
//       console.log('Fetched data:', data);

//       setRecData(data);
//       setLoading(false);
      
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getRecData();
//   }, []);

//   useEffect(() => {
//     console.log('Updated recData:', recData); // לוג של נתוני recData אחרי שהם משתנים
//   }, [recData]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!recData) {
//     return <div>Organization not found.</div>;
//   }

//   return (
//     <div className={styles.recommendationPage}>
//       <h4>פרטי יצירת קשר</h4>
//       <p>על סמך התשובות שלך, אנו ממליצים ליצור קשר עם הארגון הבא:</p>
//       <OrganizationCard organization={recData} />
//       עד שתקבל את העזרה מהגורם שפנית אליו, תוכלי/י להעזר באחד המענים
//       <FirstHelp items={firstHelpData} />
//     </div>
//   );
// }

// RecommendationPage.propTypes = {
//   orgData: PropTypes.objectOf(
//     PropTypes.shape({
//       name: PropTypes.string.isRequired,
//       description: PropTypes.string.isRequired,
//       email: PropTypes.string.isRequired,
//       phone: PropTypes.string.isRequired,
//       website: PropTypes.string.isRequired,
//     })
//   ).isRequired,
// };

// export default RecommendationPage;
import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FirstHelp from '../../components/FirstHelp/FirstHelp';
import firstHelpData from '../../components/FirstHelp/firstHelpData.json';
import OrganizationCard from '../../components/OrganizationCard/OrganizationCard';
import styles from './RecommendationPage.module.css';

function RecommendationPage() {
  const { id } = useParams();
  const [recData, setRecData] = useState({});
  const [loading, setLoading] = useState(true);
  const [improvement, setImprovement] = useState('');
  const [message, setMessage] = useState('');

  const getRecData = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/recommendation/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const { data } = await res.json();
      console.log('Fetched data:', data);

      setRecData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecData();
  }, []);

  const handleImprovementChange = (e) => {
    setImprovement(e.target.value);
  };

  const handleImprovementSubmit = async (e) => {
    e.preventDefault();

    try {
      // עדכון לנתיב הנכון
      await axios.post('http://localhost:5000/api/submit-improvement', { improvement });
      setMessage('השיפור נשמר בהצלחה!');
      setImprovement('');
    } catch (error) {
      console.error('שגיאה בשמירה:', error);
      setMessage('אירעה שגיאה בשמירה, נסה שוב מאוחר יותר.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!recData) {
    return <div>Organization not found.</div>;
  }

  return (
    <div className={styles.recommendationPage}>
      <h4>פרטי יצירת קשר</h4>
      <p>על סמך התשובות שלך, אנו ממליצים ליצור קשר עם הארגון הבא:</p>
      <OrganizationCard organization={recData} />
      עד שתקבל את העזרה מהגורם שפנית אליו, תוכלי/י להעזר באחד המענים
      <FirstHelp items={firstHelpData} />

      {/* מקום לשיפור */}
      <div className={styles.improvementSection}>
        <h2>יש לך שיפור להציע?</h2>
        <form onSubmit={handleImprovementSubmit}>
          <textarea
            value={improvement}
            onChange={handleImprovementChange}
            placeholder="הכנס את השיפור שלך כאן"
            rows="4"
            className={styles.improvementTextarea}
          />
          <button type="submit" className={styles.submitButton}>שלח שיפור</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

RecommendationPage.propTypes = {
  orgData: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      website: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default RecommendationPage;

