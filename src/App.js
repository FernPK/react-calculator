import './App.css';
import buttonInfo from './data';
import React from 'react';

class Calculator extends React.Component {
  constructor(){
    super();
    this.state = {
      input: '0', // number input
      value: 0, // realtime value
      expression: '' // string expression
    };
    this.handleClick = this.handleClick.bind(this);
  }
  calculate(expression){
    const clean = expression.match(/[\+\-\*\/]+/g);
    const separate = expression.split(/[\+\-\*\/]+/g);
    //console.log(clean);
    for (let i=0; i<clean.length; i++){
      if (clean[i].length > 2){
        if (clean[i][clean[i].length-1] === '-'){
          clean[i] = clean[i][clean[i].length-2] + clean[i][clean[i].length-1];
        }
        else {
          clean[i] = clean[i][clean[i].length-1];
        }
      }
      else if (clean[i].length === 2 && clean[i][1] !== '-'){
        clean[i] = clean[i][1];
      }
      separate.splice(i*2+1, 0, clean[i]);
    }
    //console.log(separate);
    return eval(separate.join(''));
  }
  handleClick(item) {
    if (item.value === 'clear'){
      this.setState({
        input: '0',
        expression: '',
        value: 0
      });
    }
    else if (item.value === 'operator'){
      this.setState((state) => {
        if (this.state.expression === ''){
          return {
            expression: state.input + item.icon
          };
        }
        else if (this.state.value !== 0) {
          return {
            input: '0',
            expression: state.value.toString() + item.icon
          };
        } 
        return {
          input: '0',
          expression: state.expression + item.icon
        };
      });
    }
    else if (item.value === 'equals'){
      const result = this.calculate(this.state.expression);
      this.setState((state) => {
        return {
          input: result.toString(),
          expression: state.expression + item.icon + result,
          value: result
        };
      })
    }
    else {
      this.setState((state) => {
        if (this.state.input === '0' && item.value==='decimal') {
          return {
            input: state.input + '.',
            expression: state.expression + state.input + item.icon
          };
        }
        else if(this.state.input === '0'){
          return {
            input: item.icon,
            expression: state.expression + item.icon
          };
        }
        else {
          if (/\./.test(state.input) && item.value==='decimal'){
            return {};
          }
          return {
            input: state.input + item.icon,
            expression: state.expression + item.icon
          };
        }
      });
    }
  }
  render() {
    const buttonMap = buttonInfo.map((item) => {
      return <button className={item.class} id={item.id} key={item.id} style={{gridArea: item.id}} onClick={()=>this.handleClick(item)}>{item.icon}</button>;
    });
    return (
      <div id='wrapper'>
        <div id='display-wrapper'>
          <div id='expression'>{this.state.expression}</div>
          <div id='display'>{this.state.input}</div>
        </div>
        <div id='click'>{buttonMap}</div>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <Calculator />
      <p id='credit'><a href='https://www.freepik.com/vectors/mountain-night'>Mountain night vector created by freepik - www.freepik.com</a></p>
    </div>
  );
}

export default App;
