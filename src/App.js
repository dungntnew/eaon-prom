import React, { Component } from 'react';
import './App.css';

import AppConfig from './AppConfig';
import Editor from './Editor';

import titleImage from './navi/title_naomi_generator.png';
import logo from './navi/logo_aeon.png';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
    }

    this.handleResize = this.handleResize.bind(this)

    this.onItemClick = (e) => {
      console.log('HIHI; ' + e)
    };
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
        <div className="ui inverted vertical header segment app-header">
          <div className="logo">
             <img width={90} height={15} src={logo} alt='LOGO'/>
          </div>
        </div>

        <div className="ui hidden divider"></div>
        <div className="titleImage">
           <img className="ui" width={250} height={25} src={titleImage} alt="GENERATOR"/>
        </div>
        <div className="ui hidden divider"></div>

        <Editor editorHeight={editorHeight} editorWidth={editorWidth}/>
        <div className="ui hidden divider"></div>

        {/* footer */}
        <div className="ui inverted vertical footer segment app-footer">
           <p className='copyright'>© 2016 AEON.com Co.,Ltd.</p>
        </div>
      </div>
    );

  }

}

export default App;
