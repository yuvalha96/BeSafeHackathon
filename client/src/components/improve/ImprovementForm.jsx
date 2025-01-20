import React, { useState } from 'react';
import axios from 'axios';
import styles from'./ImprovementForm.css'; // ייבוא קובץ ה-CSS

const ImprovementForm = () => {
  const [improvement, setImprovement] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setImprovement(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (improvement.trim() === '') {
      setErrorMessage('שדה זה לא יכול להיות ריק');
      return;
    }

    try {
      const response = await axios.post('/api/improvement', { improvement });
      setSuccessMessage('השיפור הוסף בהצלחה!');
      setImprovement('');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('קרה שגיאה, נסה שנית מאוחר יותר');
    }
  };

  return (
    <div className="form-container">
      <h2 className="heading">הוסף שיפור</h2>
      <form onSubmit={handleSubmit} className="form">
        <textarea
          value={improvement}
          onChange={handleChange}
          placeholder="כתוב את השיפור שלך כאן"
          className="textarea"
        />
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button type="submit" className="button">שלח</button>
      </form>
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
};

export default ImprovementForm;

