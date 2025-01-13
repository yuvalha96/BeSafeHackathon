import { useState } from 'react';
import categories from './categories.json';
import './Questions.css';

function Questions() {
    const [answers, setAnswers] = useState({});

    const handleAnswer = (questionId, answer) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };

    const handleSubmit = () => {
        console.log(answers);
    };

    return (
        <div>
            {categories.questions.map((q) => (
                <div key={q.id} className="question-container">
                    <p>{q.question}</p>
                    <select
                        value={answers[q.id] || ''}
                        onChange={(e) => handleAnswer(q.id, e.target.value)}
                        className="select-input"
                    >
                        <option value="" disabled>
                            בחר/י תשובה
                        </option>
                        {q.options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.text}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
            <button onClick={handleSubmit} className="submit-button">
                סיום שאלון
            </button>
        </div>
    );
}

export default Questions;
