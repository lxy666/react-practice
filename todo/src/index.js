import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TodoApp from './App';


// class List extends React.Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             value: 'ooo'
//         }
//     }
//
//     render() {
//         const lists = ['JavaScript', 'Java', 'Node', 'Python'];
//
//         return (
//             <div>
//                 <div>{this.state.value}</div>
//                 <ul>
//                     {lists.map((result, index) => {
//                         return (<li key={index}>{result}</li>);
//                     })}
//                 </ul>
//             </div>
//         )
//     }
//
// }

//
// function BoilingVerdict(props) {
//     if (props.celsius >= 100) {
//         return <p>水会烧开</p>;
//     }
//     return <p>水不会烧开</p>;
// }
//
// class Calculator extends React.Component {
//     constructor(props) {
//         super(props);
//         this.handleChange = this.handleChange.bind(this);
//         this.state = {temperature: ''};
//
//     }
//
//     handleChange(e) {
//         this.setState({temperature: e.target.value});
//     }
//
//     render() {
//         const temperature = this.state.temperature;
//         return (
//             <fieldset>
//                 <legend>输入一个摄氏温度</legend>
//                 <input
//                     value={temperature}
//                     onChange={this.handleChange} />
//                 <BoilingVerdict
//                     celsius={parseFloat(temperature)} />
//             </fieldset>
//         );
//     }
// }


ReactDOM.render(<TodoApp />, document.getElementById('root'));

