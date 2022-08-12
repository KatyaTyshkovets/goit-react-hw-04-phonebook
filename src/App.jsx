import  {useState} from 'react';
import  FeedbackOptions  from './components/FeedbackOptions';
import  Sections  from './components/Section';
import  Wrapper  from './components/Wrapper';
import Notification from './components/Notification';
import  Statistics  from './components/Statistics';


export function App ()  {
  const [feedback, setFeedback] = useState({
    good: 0,
    bad: 0,
    neutral: 0,
  });
  

 const onLeaveFeedback = option => {
    setFeedback(prevState => ({ ...prevState , [option]: prevState[option] + 1 }));
  };

  const countTotalFeedback = () => 
    
    Object.values(feedback).reduce((value, acc) => acc + value, 0);
  
  
   const countPositiveFeedbackPercentage = () => 
    
     Math.round((feedback.good / countTotalFeedback()) * 100);
  
  
  const options = Object.keys(feedback);
  
    return (
      <Wrapper>
        <Sections title="Please leave feedback">
        <FeedbackOptions
          options={options}
          onLeaveFeedback={onLeaveFeedback}
          />
        </Sections>
        {countTotalFeedback() <= 0 ? (
          <Notification message="There is no feedback" />
        ) : (
            <Sections title="Statistics">
              <Statistics
                options={options}
                values={feedback}
                total={()=>countTotalFeedback()}
                positivePercentage={()=> countPositiveFeedbackPercentage()}
              />
            </Sections>
        )}       

     </Wrapper>
    );
  }

