import React, { Component } from 'react';
import  FeedbackOptions  from './components/FeedbackOptions';
import  Sections  from './components/Section';
import  Wrapper  from './components/Wrapper';
import Notification from './components/Notification';
import  Statistics  from './components/Statistics';


export class App extends Component {

  state = {
    good: 0,
    neutral: 0,
    bad: 0
  };

  onLeaveFeedback = e => {
    const { id } = e.target;
    this.setState(prevState => ({ [id]: prevState[id] + 1 }));
  };

  countTotalFeedback = () => {
    const arr = Object.values(this.state);
    return arr.reduce((prev, current) => prev + current, 0);
  };
  
  countPositiveFeedbackPercentage = () => {
    const { good } = this.state;
    return good ? Math.round((good / this.countTotalFeedback()) * 100) : 0;
  };
  options = Object.keys(this.state);

  render() {
    const { good, neutral, bad } = this.state;
    
    return (
      <Wrapper>
        <Sections title="Please leave feedback">
        <FeedbackOptions
          options={this.options}
          onLeaveFeedback={this.onLeaveFeedback}
          />
        </Sections>
        {this.countTotalFeedback() <= 0 ? (
          <Notification message="There is no feedback" />
        ) : (
            <Sections title="Statistics">
              <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                total={this.countTotalFeedback()}
                positivePercentage={this.countPositiveFeedbackPercentage()}
              />
            </Sections>
        )}       

     </Wrapper>
    );
  }
}
