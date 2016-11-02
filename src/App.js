import React, { Component } from 'react';
import './App.css';

import AppConfig from './AppConfig';
import Editor from './Editor';


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
    }

    this.handleResize = this.handleResize.bind(this)
  }

  handleResize(evt) {
    this.setState({
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
    })
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  render() {
    const editorHeight = this.state.windowHeight - AppConfig.HEADER_HEIGHT;
    const editorWidth = this.state.windowWidth;

    return (
      <div className='ui wrapper'>

        {/* header */}
        <div className="ui menu top-menu">
          <a className="item active">
            ホーム
          </a>
          <a className='item'>
             {this.state.windowWidth} x {this.state.windowHeight}
          </a>
        </div>

        <Editor editorHeight={editorHeight} editorWidth={editorWidth}/>
        <hr/>

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
