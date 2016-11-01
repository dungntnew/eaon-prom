import React, { Component } from 'react';
import './App.css';

import Editor from './Editor';

class App extends Component {
  render() {
    return (
      <div className='ui wrapper'>

        {/* header */}
        <div className="ui secondary  menu">
          <a className="item">
            Home
          </a>
          <a className="item active">
            Messages
          </a>
          <a className="item">
            Friends
          </a>
        </div>

        <Editor />

        {/* footer */}
        <div className="ui inverted vertical footer segment app-footer">
           <div className="ui container">
               Re-vue. All Rights Reserved
            </div>
        </div>

      </div>
    );
  }
}

export default App;
