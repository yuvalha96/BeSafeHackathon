import { useState } from 'react';
import styles from './Home.module.css';

const Home = () => {
  const [name, setName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`Name: ${name}, ID: ${idNumber}, Age: ${age}`);
    
    const data = { name, idNumber, age };

    try {
      const response = await fetch('http://localhost:5000/api/ducks/demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log('Response from server:', result);
      
      
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div className={styles.home}>
      <h1 className={styles.headline}>Duck It</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="idNumber">ID Number:</label>
          <input
            type="text"
            id="idNumber"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>

  );
};

export default HomePage;
