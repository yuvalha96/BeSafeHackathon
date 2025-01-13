import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/HomePage/HomePage';
import styles from './styles/App.module.css';
import Questions from './pages/QuestionsPage/Questions'
import projectLogo2 from './assets/project-logo (2).png';


function App() {
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
