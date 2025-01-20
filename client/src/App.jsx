import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
// import orgData from '../../server/data/duckData';
import projectLogo2 from './assets/project-logo (2).png';
import Home from './pages/HomePage/HomePage';
import Questions from './pages/QuestionsPage/Questions';
import RecommendationPage from './pages/RecommendationPage/RecommendationPage.jsx';
import styles from './styles/App.module.css';

function App() {
  // const organizations = [
  //   {
  //     id: '105',
  //     name: 'מוקד 105',
  //     description: 'המטה הלאומי להגנה על ילדים ברשת',
  //     email: 'support@example.com',
  //     phone: '105',
  //     website: 'https://www.gov.il/he/pages/national_service_at_105_030422',
  //   },
  //   {
  //     id: '100',
  //     name: 'משטרה',
  //     description: 'תיאור קצר על הארגון',
  //     email: 'another@example.com',
  //     phone: '123-456-7890',
  //     website: 'https://example.com',
  //   },
  //   // הוספת עמותות נוספות אם צריך
  // ];

  return (
    <BrowserRouter>
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <img src={projectLogo2} alt="Logo" className={styles.appLogo} />
          <nav className={styles.appNav}>
            <Link to="/" className={styles.appLink}>דף הבית</Link>
          </nav>
        </header>
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/questions" element={<Questions />} />
            {/* הוספת הנתיב עם מזהים של העמותות */}
            <Route 
              path="/recommendation/:id" 
              // element={<RecommendationPage organizations={organizations} />} 
             element={<RecommendationPage />}
            />
          </Routes>
        </main>
        <footer className={styles.footer}>
          <p>&copy; 2025 My App</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
