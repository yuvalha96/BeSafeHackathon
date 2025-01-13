import FirstButton from '../common/FirstButton/FirstButton.jsx';
import PropTypes from 'prop-types';

const StartQ = ({ onClick }) => {
  return (
    <div>
      <FirstButton onClick={onClick}>התחל</FirstButton>
    </div>
  );

};
StartQ.propTypes = {
    onClick: PropTypes.func.isRequired,  
  };

export default StartQ;
