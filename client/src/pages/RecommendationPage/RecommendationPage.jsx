import { useParams } from 'react-router-dom';
import OrganizationCard from '../../components/OrganizationCard/OrganizationCard';
import styles from './RecommendationPage.module.css';

function RecommendationPage({ organizations }) {
  // Get the 'id' from the route params
  const { id } = useParams();

  // Find the organization that matches the id
  const organization = organizations.find((org) => org.id === id);

  // If no organization found, display a message
  if (!organization) {
    return <div>Organization not found.</div>;
  }

  return (
    <div className={styles.recommendationPage}>
      <h4>פרטי יצירת קשר</h4>
      <p>על סמך התשובות שלך, אנו ממליצים ליצור קשר עם הארגון הבא:</p>
      {/* Display the OrganizationCard with the found organization */}
      <OrganizationCard organization={organization} />
    </div>
  );
}

export default RecommendationPage;