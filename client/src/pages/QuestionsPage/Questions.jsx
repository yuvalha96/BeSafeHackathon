import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import categories from './categories.json';
import './Questions.css';

function Questions() {
    const [answers, setAnswers] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const navigate = useNavigate();

    const questionsPerPage = 3;
    const totalPages = Math.ceil(categories.questions.length / questionsPerPage);

    const handleAnswer = (questionId, answer) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };

    const handleNext = () => {
        const currentQuestions = categories.questions.slice(
            currentPage * questionsPerPage,
            (currentPage + 1) * questionsPerPage
        );

        const allAnswered = currentQuestions.every((q) => answers[q.id]);
        if (allAnswered) {
            setCurrentPage(currentPage + 1);
        } else {
            alert('יש להשיב על כל השאלות לפני המעבר לעמוד הבא');
        }
    };

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleSubmit = () => {
        // המלצות (במקום לשלוח לשרת יש כאן את הלוגיקה פשוטה)
        let recommendation = 0;
        if (answers[1] === "under_18" || answers[6] === "yes") recommendation = 1;
        if ((answers[5] === "yes" || answers[7] === "physical") && answers[2] === 'female') recommendation = 2;
        if ((answers[5] === "yes" || answers[7] === "physical") && answers[2] === 'male') recommendation = 3;
        // המשך הלוגיקה כאן...

        // ניווט לדף המלצה
        navigate(`/recommendation/${recommendation}`);
    };

    const currentQuestions = categories.questions.slice(
        currentPage * questionsPerPage,
        (currentPage + 1) * questionsPerPage
    );

    const groupClasses = ['group-blue', 'group-yellow', 'group-pink', 'group-green'];

    return (
        <div>
            <div className={`questions-group ${groupClasses[currentPage % groupClasses.length]}`}>
                {currentQuestions.map((q) => (
                    <div key={q.id} className="question-container">
                        <p>{q.question}</p>
                        <select
                            value={answers[q.id] || ''}
                            onChange={(e) => handleAnswer(q.id, e.target.value)}
                            className="select-input"
                        >
                            <option value="" disabled>בחר/י תשובה</option>
                            {q.options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.text}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>

            <div className="button-container">
                {currentPage > 0 && (
                    <button onClick={handlePrevious} className="previous-button">
                        לעמוד הקודם
                    </button>
                )}
                {currentPage < totalPages - 1 ? (
                    <button onClick={handleNext} className="next-button">
                        לעמוד הבא
                    </button>
                ) : (
                    <button onClick={handleSubmit} className="submit-button">
                        סיום שאלון
                    </button>
                )}
            </div>
        </div>
    );
}

export default Questions;
