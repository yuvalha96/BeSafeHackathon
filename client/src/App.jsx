import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/HomePage/HomePage';
import RecommendationPage from './pages/RecommendationPage/RecommendationPage.jsx';
import styles from './styles/App.module.css';
import Questions from './pages/QuestionsPage/Questions'
import projectLogo2 from './assets/project-logo (2).png';


function App() {
  // Mock organization data for demonstration
  const organizations = [
    {
      name: 'מוקד 105',
      description: 'המטה הלאומי להגנה על ילדים ברשת',
      email: 'support@example.com',
      phone: '105',
      website: 'https://www.gov.il/he/pages/national_service_at_105_030422',
    },
    {
      name: 'ארגון נוסף',
      description: 'תיאור קצר על הארגון',
      email: 'another@example.com',
      phone: '123-456-7890',
      website: 'https://example.com',
    },
  ];

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
            <Route 
              path="/recommendation" 
              element={<RecommendationPage organizations={organizations} />} 
            />
          </Routes>
          <Routes>
            <Route path="/questions" element={<Questions />} />
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
