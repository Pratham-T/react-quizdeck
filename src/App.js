import React from 'react';
import reload from './components/images/autorenew_white_24dp.svg';
import deck from './components/data.json'
import './App.css';

class Question extends React.Component{

  render(){
    return (
      <div id="Question">
        {this.props.question}
      </div>
    );
  }
}

class Answer extends React.Component {

  render(){
    return (
      <div id="Answer">
        {this.props.answer}
      </div>
    );
  }
}

class Button extends React.Component {
  render() {
    return (
        <div className='Button'>
            <button type={this.props.buttonType} className="button" onClick={this.props.onClick}>
              {this.props.buttonText}
            </button>
        </div>
    );
  }
}

class Deck extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id: Math.floor((Math.random()*deck.deck.length)),
      showAnswer: false,
    };
  }

  switchQuestion(event) {
    let newId = this.state.id;
    while(newId === this.state.id){
      newId = Math.floor((Math.random()*deck.deck.length))
    }
    this.setState({id: newId, showAnswer: false});
  }

  showAnswer(event) {
    this.setState({showAnswer: true});
  }

  render() {
    let set = deck.deck;

    let answerElement = <></>;
    if(this.state.showAnswer)
      answerElement = <Answer answer={set[this.state.id].answer}/>;
    else
      answerElement = <Button buttonType={"submit"} buttonText={"Show Answer"} onClick={this.showAnswer.bind(this)}/>;
    
    return (
      <div id="Deck">
        <div className='titlebar'>
          <button type='button' className='traffic-light traffic-light-red'></button>
          <button type='button' className='traffic-light traffic-light-yellow'></button>
          <button type='button' className='traffic-light traffic-light-green'></button>
        </div>
        <div className='deck-content'>
          <Question question={set[this.state.id].question}/>
          {answerElement}
          <img src={reload} className="refresh-logo" alt="logo" onClick={this.switchQuestion.bind(this)}/>
        </div>
      </div>
    );
  }
}



function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Deck />
    </div>
  );
}

export default App;
