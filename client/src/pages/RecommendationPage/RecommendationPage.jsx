// import PropTypes from 'prop-types';
// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import OrganizationCard from '../../components/OrganizationCard/OrganizationCard';
// import styles from './RecommendationPage.module.css';

// function RecommendationPage({ orgData }) {
//   // Get the 'id' from the route params
//   const { id } = useParams();
//   var [recData, setRecData] = useState({}) 
//   var [loading, setLoading] = useState(true) 
//   // const [organization, setOrganization] = useState(null);

//   const getRecData = async () => {
//     const res = await fetch(`http://localhost:5000/api/recommendation/${id}`, {
//       method: 'GET',
//       headers: {
//           'Content-Type': 'application/json',
//       },
//       //body: JSON.stringify({req.recommendations }), // sending the list of matching organization ids
//   })
//     const data = await res.json()
//     console.log('Fetched data:', data);
//     //console.log(data)
//     setRecData(data)
//     console.log('Rec data:', recData);
//     setLoading(false)
//   }

//   useEffect(() => {
//     getRecData()
//   }, [])

//   // // Find the organization that matches the id
//   // const organization = orgData.find((org) => org.id === id);

//   // If no organization found, display a message
//   if (loading == false && recData.name == null) {
//     return <div>Organization not found.</div>;
//   }

//   return (
//     <div className={styles.recommendationPage}>
//       <h4>פרטי יצירת קשר</h4>
//       <p>על סמך התשובות שלך, אנו ממליצים ליצור קשר עם הארגון הבא:</p>
//       {/* Display the OrganizationCard with the found organization */}
//       <OrganizationCard organization={recData} />
//     </div>
//   );
// }

// // Add PropTypes validation
// RecommendationPage.propTypes = {
//   orgData: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       description: PropTypes.string.isRequired,
//       email: PropTypes.string.isRequired,
//       phone: PropTypes.string.isRequired,
//       website: PropTypes.string.isRequired,
//     })
//   ).isRequired,
// };

// export default RecommendationPage;
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import OrganizationCard from '../../components/OrganizationCard/OrganizationCard';
import styles from './RecommendationPage.module.css';

function RecommendationPage() {
  const { id } = useParams();
  const [recData, setRecData] = useState({});
  const [loading, setLoading] = useState(true);

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

      const {data} = await res.json();
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

  useEffect(() => {
    console.log('Updated recData:', recData); // לוג של נתוני recData אחרי שהם משתנים
  }, [recData]);

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
