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
        {this.state.result}
        </div>
    </div>
    );
}
}

export default App;
