// import PropTypes from 'prop-types';
// import { Typography, Button } from '@mui/material';
// import EmailIcon from '@mui/icons-material/Email';
// import PhoneIcon from '@mui/icons-material/Phone';
// import LanguageIcon from '@mui/icons-material/Language';
// import './RecommendationPage.css';

// function RecommendationPage({ organization }) {
//   return (
//     <div className="recommendationPage"> {/* Use the CSS class directly */}
//       <Typography variant="h4" gutterBottom>
//         פרטי יצירת קשר
//       </Typography>

//       {/* Organization details */}
//       <Typography variant="body1" paragraph>
//         על סמך התשובות שלך, אנו ממליצים ליצור קשר עם הארגון הבא:
//       </Typography>
//       <Typography variant="h5" gutterBottom>{organization.name}</Typography>
//       <Typography variant="body1" paragraph>{organization.description}</Typography>

//       {/* Contact details with icons */}
//       <Typography variant="body1" paragraph>
//         <EmailIcon style={{ verticalAlign: 'middle', marginRight: '8px' }} />
//         Email: <a href={`mailto:${organization.email}`} target="_blank" rel="noopener noreferrer">{organization.email}</a>
//       </Typography>
//       <Typography variant="body1" paragraph>
//         <PhoneIcon style={{ verticalAlign: 'middle', marginRight: '8px' }} />
//         Phone: <a href={`tel:${organization.phone}`} target="_blank" rel="noopener noreferrer">{organization.phone}</a>
//       </Typography>
//       <Typography variant="body1" paragraph>
//         <LanguageIcon style={{ verticalAlign: 'middle', marginRight: '8px' }} />
//         Website: <a href={organization.website} target="_blank" rel="noopener noreferrer">{organization.website}</a>
//       </Typography>

//       <Button
//         variant="contained"
//         color="primary"
//         onClick={() => alert('יצירת קשר...')}
//         style={{ marginTop: '16px' }}
//       >
//         ליצירת קשר
//       </Button>
//     </div>
//   );
// }

// // Prop validation for organization
// RecommendationPage.propTypes = {
//   organization: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//     phone: PropTypes.string.isRequired,
//     website: PropTypes.string.isRequired,
//   }).isRequired,
// };

// export default RecommendationPage;
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import Board from '../../components/Board/Board';
import styles from './RecommendationPage.module.css';

function RecommendationPage({ organizations }) {
  // Check if organizations is an array before rendering Board
  return (
    <div className={styles.recommendationPage}>
      <Typography variant="h4" gutterBottom>
        פרטי יצירת קשר
      </Typography>
      <Typography variant="body1" paragraph>
        על סמך התשובות שלך, אנו ממליצים ליצור קשר עם הארגונים הבאים:
      </Typography>
      {/* Pass organizations only if it's an array */}
      <Board organizations={Array.isArray(organizations) ? organizations : []} />
    </div>
  );
}

// Add PropTypes validation
RecommendationPage.propTypes = {
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

export default RecommendationPage;