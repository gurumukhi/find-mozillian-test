import React, { Component } from 'react';
import fm from 'find-mozillian';

class App extends Component {
constructor(props){
    super(props);
    this.state = {
        inputQuery: '',
        result: ''
    }
}

onInputChange = (event) => {
    const input = event.target.value
    this.setState({
        inputQuery: input
    });
}

/*
const outputObjectTemplate = {
  'matchingResults': [{
    'name': '',
    'details': {
      'mail': '',
      'citation': '',
      'dateAddedOnCreditPage': ''
    },
    'noDetailsReason': ''
  }],
  'moreMatchesAvailable': false
};
*/

getOutputForName = (obj) => {
    console.log(obj);
    if (obj.noDetailsReason) {
        return "Name: " + obj.name + " | " + obj.noDetailsReason;
    }
    return "Name: " + obj.name + " | " +
        "Mail: " + obj.details.mail + " | " +
        "Citation: " + obj.details.citation + " | " +
        "Mozillian since: " + obj.details.dateAddedOnCreditPage;
}

getOutputString = (obj) => {
    if(!obj.matchingResults) {
        return '';
    }
    if(obj.matchingResults.length === 0) {
        return "Not a Mozillian :-/";
    }
    if(obj.matchingResults.length === 1) {
        return this.getOutputForName(obj.matchingResults[0]);
    }
    let output = this.getOutputForName(obj.matchingResults[0]);
    for(let i=1; i<obj.matchingResults.length; i++){
        output += "_________" + this.getOutputForName(obj.matchingResults[i]);
    }
    if (obj.moreMatchesAvailable) {
        output += "_________ + many more";
    }
    return output;
}

clicked = () => {
    fm.findMozillian(this.state.inputQuery).then( (val) => {
        console.log('GOTCHA');
        console.log(val);
        this.setState({
            result: val
        });
    })
}

render() {
    return (
    <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'georgia' }}>
        IsMozillian?
        <br />
        <input style={{ margin: '20px' }}
        type="text" value={this.state.inputQuery} onChange={ this.onInputChange }/>
        
        <button onClick = { this.clicked }> Naam </button>

        <div>
        {this.getOutputString(this.state.result)}
        </div>
    </div>
    );
}
}

export default App;
