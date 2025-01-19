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
        const recommendations = [];
    
        // Extracting answers for easier access
        const {
            1: age,
            2: gender,
//            3: personal,
//            4: incidentTime,
            5: sexualAbuse,
            6: graphicContent,
            7: abuseType,
            8: familyViolence,
            9: culturalBackground,
            10: fearToShare,
//            11: recurringAbuse,
            12: urgency,
//            13: previousHelp,
        } = answers;
    
        // Logic for recommendations
        if (age === "under_18" || graphicContent === "yes") {
            recommendations.push("מוקד 105 - ילדים ונוער");
        }
        if ((sexualAbuse === "yes" || abuseType === "physical") & (gender=='female')) {
            recommendations.push("  האיגוד ומרכזי הסיוע לנפגעות ונפגעי תקיפה מינית-נשים");
        }
        if ((sexualAbuse === "yes" || abuseType === "physical")&(gender=='male')) {
            recommendations.push("איגוד ומרכזי הסיוע לנפגעות ונפגעי תקיפה מינית-גברים");
        }
        if (familyViolence === "yes" && gender === "female") {
            recommendations.push("עמותת ל.א. לאלימות נגד נשים");
        }
        if (culturalBackground === "muslim" && (familyViolence === "yes" || sexualAbuse === "yes")) {
            recommendations.push("ארגון נשים נגד אלימות");
        }
        if (culturalBackground === "religious" || culturalBackground === "ultra_orthodox") {
            recommendations.push("תהל - מרכז סיוע לנשים דתיות וחרדיות");
        }
        if (abuseType === "cyber_extortion" || abuseType === "content_distribution") {
            recommendations.push("מא'את - עמותת סייבר חברתית");
        }
        if (fearToShare === "yes" && gender === "female") {
            recommendations.push("עמותת לתת פה");
        }
        if (urgency === "immediate_danger") {
            recommendations.push("הרשות הלאומית לביטחון קהילתי");
        }
    
        // Remove duplicates and display recommendations
        const uniqueRecommendations = [...new Set(recommendations)];
    
        if (uniqueRecommendations.length > 0) {
            alert(`העמותות המומלצות עבורך הן:\n${uniqueRecommendations.join("\n")}`);
        } else {
            alert("לא הצלחנו לזהות עמותה מתאימה. נסה למקד אותנו יותר בתשובות.");
        }
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