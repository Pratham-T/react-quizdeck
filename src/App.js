import React from 'react';
import reload from './components/images/autorenew_black_24dp.svg';
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
            <button type={this.props.buttonType} className={`button ${this.props.className}`} onClick={this.props.onClick}>
              {this.props.buttonText}
            </button>
        </div>
    );
  }
}

class Deck extends React.Component {
  constructor(props){
    super(props);
    let idTemp = Math.floor((Math.random()*deck.deck.length));
    let hintNumTemp = -1;
    if(deck.deck[idTemp].hints.length > 0){
      hintNumTemp = 0;
    }

    this.state = {
      id: idTemp,
      showAnswer: false,
      hintNum: hintNumTemp
    };
  }

  switchQuestion(event) {
    let newId = this.state.id;
    while(newId === this.state.id){
      newId = Math.floor((Math.random()*deck.deck.length))
    }
    let newHintNum = -1;
    if(deck.deck[newId].hints.length > 0){
      newHintNum = 0;
    }
    this.setState({id: newId, showAnswer: false, hintNum: newHintNum});
  }

  showHint(event) {
    this.setState({hintNum: this.state.hintNum+1});
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
      answerElement = (<Button 
          buttonType={"submit"} 
          buttonText={"Show Answer"} 
          className={"answer-button"} 
          onClick={this.showAnswer.bind(this)}
        />);
    
    let hintElement = <></>;
    if(set[this.state.id].hints.length > 0) {
      let hintButton = (<Button
          buttonType={"submit"}
          buttonText={"Show Hint #" + (this.state.hintNum+1)}
          className={"hint-button"}
          onClick={this.showHint.bind(this)}
        />);

      let hintText = <></>;
      hintText = set[this.state.id].hints.map((hint, i) => {
        if(i+1 <= this.state.hintNum){
          return (<div className={`hint-text hint-${i}`} key={i}>{hint}</div>);
        }
        return null;
      });
      if(this.state.hintNum>=0 && this.state.hintNum<set[this.state.id].hints.length){
        hintElement = <>{hintText}{hintButton}</>;
      }
      else if(this.state.hintNum >= set[this.state.id].hints.length){
        hintElement = <>{hintText}</>;
      }
    }
    
    return (
      <div id="Deck">
        <div className='titlebar'>
          <button type='button' className='traffic-light traffic-light-red'></button>
          <button type='button' className='traffic-light traffic-light-yellow'></button>
          <button type='button' className='traffic-light traffic-light-green'></button>
        </div>
        <div className='deck-content'>
          <Question question={set[this.state.id].question}/>
          {hintElement}
          {answerElement}
          <Button 
            buttonType={"submit"} 
            buttonText={<img src={reload} className="refresh-logo" alt='logo' onClick={this.switchQuestion.bind(this)} />} 
            className={"reload-button"}
            onClick={this.switchQuestion.bind(this)}
            />
          {/* <img src={reload} className="refresh-logo" alt="logo" onClick={this.switchQuestion.bind(this)}/> */}
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
