// Represents a single organization's contact details.

import PropTypes from 'prop-types';
import styles from './OrganizationCard.module.css';

const OrganizationCard = ({ organization }) => {
  return (
    <div className={styles.card}>
      <h3>{organization.name}</h3>
      <p>{organization.description}</p>
      <a href={`mailto:${organization.email}`}>{organization.email}</a>
      <a href={`tel:${organization.phone}`}>{organization.phone}</a>
      {/* <a href={organization.website} target="_blank" rel="noopener noreferrer">
        {organization.website}
      </a> */}
      <a href={organization.website} target="_blank" rel="noopener noreferrer">
        Visit Website
      </a>
    </div>
  );
};

// Add PropTypes validation
OrganizationCard.propTypes = {
  organization: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
  }).isRequired,
};

export default OrganizationCard;