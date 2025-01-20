import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ייבוא הפונקציה
import categories from './categories.json';
import './Questions.css';

function Questions() {
    const [answers, setAnswers] = useState({});
    const navigate = useNavigate(); // יצירת הפונקציה navigate

    const handleAnswer = (questionId, answer) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };

    const handleSubmit = async () => {
        var recommendation = 0;
    
        // Extracting answers for easier access
        const {
            1: age,
            2: gender,
            5: sexualAbuse,
            6: graphicContent,
            7: abuseType,
            8: familyViolence,
            9: culturalBackground,
            10: fearToShare,
            12: urgency,
        } = answers;
    
        // Logic for recommendation
        if (age === "under_18" || graphicContent === "yes") {
            //recommendation.push("1");
            recommendation = 1;
        }
        if ((sexualAbuse === "yes" || abuseType === "physical") && gender === 'female') {
            //recommendation.push("האיגוד ומרכזי הסיוע לנפגעות ונפגעי תקיפה מינית-נשים");
            //recommendation.push("2");
            recommendation = 2;
        }
        if ((sexualAbuse === "yes" || abuseType === "physical") && gender === 'male') {
            //recommendation.push("איגוד ומרכזי הסיוע לנפגעות ונפגעי תקיפה מינית-גברים");
            //recommendation.push("3");
            recommendation = 3;
        }
        if (familyViolence === "yes" && gender === "female") {
            //recommendation.push("עמותת ל.א. לאלימות נגד נשים");
            //recommendation.push("4");
            recommendation = 4;
        }
        if (culturalBackground === "muslim" && (familyViolence === "yes" || sexualAbuse === "yes")) {
            //recommendation.push("ארגון נשים נגד אלימות");
            //recommendation.push("5");
            recommendation = 5;
        }
        if (culturalBackground === "religious" || culturalBackground === "ultra_orthodox") {
            //recommendation.push("תהל - מרכז סיוע לנשים דתיות וחרדיות");
            //recommendation.push("6");
            recommendation = 6;
        }
        if (abuseType === "cyber_extortion" || abuseType === "content_distribution") {
            //recommendation.push("מא'את - עמותת סייבר חברתית");
            //recommendation.push("7");
            recommendation = 7;
        }
        if (fearToShare === "yes" && gender === "female") {
            //recommendation.push("עמותת לתת פה");
            //recommendation.push("8");
            recommendation = 8;
        }
        if (urgency === "immediate_danger") {
            //recommendation.push("הרשות הלאומית לביטחון קהילתי");
            //recommendation.push("9");
            recommendation = 9;
        }
    
        // Remove duplicates and display recommendations
        //const uniqueRecommendations = [...new Set(recommendations)];
    
        
                // try {
                //     // Send the recommendations to the server
                //     const response = await fetch('http://localhost:5000/recommendation', {
                //     method: 'GET',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     //body: JSON.stringify({ recommendations }), // sending the list of matching organization ids
                // });
    
                //     if (!response.ok) {
                //         const errorText = await response.text();
                //         throw new Error(`Server Error: ${response.status} - ${errorText}`);
                //     }
        
                //     const result = await response.json();
                //     console.log('Response from server:', result);
        
                //     // Now navigate to the recommendation page with the returned data
                    navigate(`/recommendation/${recommendation}`);
                // } catch (error) {
                //     console.error('Error sending data:', error);
                // }
        /*if (uniqueRecommendations.length > 0) {
            // Sending data to the server (use `answers` instead of `data`)
            try {
                // Send the recommendations to the server
                const response = await fetch('http://localhost:5000/recommendation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    //body: JSON.stringify({ recommendations: uniqueRecommendations }), // sending the list of matching organization ids
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Server Error: ${response.status} - ${errorText}`);
                }
    
                const result = await response.json();
                console.log('Response from server:', result);
    
                // Now navigate to the recommendation page with the returned data
                navigate(`/recommendation`, { state: { organizations: result.organizations } });
            } catch (error) {
                console.error('Error sending data:', error);
            }
        } else {
            alert("לא הצלחנו לזהות עמותה מתאימה. נסה למקד אותנו יותר בתשובות.");
        }*/
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
