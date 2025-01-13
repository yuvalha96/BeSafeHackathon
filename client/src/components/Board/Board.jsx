// A container for displaying multiple Card components.

import PropTypes from 'prop-types';
import OrganizationCard from '../OrganizationCard/OrganizationCard';
import styles from './Board.module.css';
import RelaxSection from '../button/RelaxSection'

function Board({ organizations }) {
  return (
    <><div className={styles.board}>
      {organizations.map((org, index) => (
        <OrganizationCard key={index} organization={org} />
      ))}
    </div><div className={styles.Board}>
      {RelaxSection && <RelaxSection />}
      </div></>
  );
}

Board.propTypes = {
  organizations: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      website: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Board;