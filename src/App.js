import React, { Component } from 'react';
import './App.css';

import {AppConfig, EditorConfig} from './Config';
import Editor from './Editor';

import titleImage from './navi/title_naomi_generator.png';
import logo from './navi/logo_aeon.png';
import howtoTitle from './navi/title_how-01.png';
import howtoImg from './navi/howto.png';


class EditorApp extends Component {
  render() {
    return (
      <div  style={this.props.style}>
      <div className="titleImage">
         <img className="ui" width={250} height={25} src={titleImage} alt="GENERATOR"/>
      </div>
      <div className="ui hidden divider"></div>

      <Editor editorHeight={this.props.editorHeight} editorWidth={this.props.editorWidth}/>
      </div>
    )
  }
}

class HowTo extends Component {
  render() {
    return (
      <div style={this.props.style} className="howto-wrapper">
          <div className="titleImage">
             <img className="ui" width={200} height={50} src={howtoTitle} alt="GENERATOR"/>
          </div>
          <div className="ui hidden divider"></div>
          <div className="ui howtoBody">
            <img className="howtoImgContent" src={howtoImg} alt="HOW-TO"/>
            <div className="ui hidden divider"></div>

            <div className="howto-text">
              渡辺直美の顔とハイパーな髪型を組み合わせてハイパーな渡辺直美を作成しましょう！
            </div>
　　　　　　　<div className="ui hidden divider"></div>

            <button className="ui large button pink"
                    onClick={this.props.startHandler}>
            開始する
            </button>
          </div>
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
      started: false,
    }

    this.handleResize = this.handleResize.bind(this)
    this.startHandler = this.startHandler.bind(this)
  }

  startHandler() {
    this.setState({started: true})
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
    const wrapperWidth = Math.max(Math.min(editorWidth, editorHeight), EditorConfig.EDITOR_MIN_H);
    const wrapperHeight = Math.max(this.state.windowHeight -
                                     (AppConfig.HEADER_HEIGHT + AppConfig.FOOTER_HEIGHT), AppConfig.CONTENT_MIN_H);
    const style = {
      size: {
        "minHeight": wrapperHeight + "px",
        "maxWidth": wrapperWidth + "px",
        "height": wrapperHeight + "px",
        "margin": '0px auto',
        "backgroundColor": "white",
      },
      header: {
        "height": AppConfig.HEADER_HEIGHT + "px"
      },
      footer: {
        "height": AppConfig.FOOTER_HEIGHT + "px"
      }
    }

    const screen = this.state.started
                 ? (<EditorApp style={style.size} editorWidth={editorWidth} editorHeight={editorHeight} />)
                 : (<HowTo style={style.size} startHandler={this.startHandler} />)


    return (
      <div className='ui wrapper'>

        {/* header */}
        <div style={style.header} className="ui inverted vertical header segment app-header">
          <div className="logo">
             <img width={90} height={15} src={logo} alt='LOGO'/>
          </div>
        </div>
        {screen}

        {/* footer */}
        <div style={style.footer} className="ui inverted vertical footer segment app-footer">
           <p className='copyright'>© 2016 AEON.com Co.,Ltd.</p>
        </div>

      </div>
    );
  }
}

export default App;
