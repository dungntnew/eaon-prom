require('es6-shim');

import React, { Component } from 'react';
import './App.css';

import {AppConfig, EditorConfig} from './Config';
import Editor from './Editor';
import classNames from 'classnames';
import titleImage from './navi/title_naomi_generator.png';
import logo from './navi/logo_aeon.png';
import howtoTitle from './navi/title_how-01.png';
import howtoImg from './navi/howto.png';

import firebase from 'firebase/app';
import 'firebase/auth';

var config = {
  apiKey: "AIzaSyDfSa91HrDMjseR7TLaaWjZeipWsA4MWdo",
  authDomain: "ean-promotion.firebaseapp.com",
  databaseURL: "https://ean-promotion.firebaseio.com",
  storageBucket: "ean-promotion.appspot.com",
  messagingSenderId: "374098341515"
};
firebase.initializeApp(config);

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

class Login extends Component {
  constructor() {
    super()
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin(evt) {
    evt.preventDefault()

    const email = this.refs.email.value
    const password = this.refs.password.value
    this.props.authHandler(email, password)
  }

  render() {
    const loginButtonClasses = classNames({
      "ui fluid large teal submit button": true,
      "loading": this.props.authenticating
    })

    const errors = this.props.errorMessage ? (<div className="ui error message">
                   {this.props.errorMessage}
                  </div>) : ""
    const content = !this.props.authenticating ? (
      <form className="ui large form" onSubmit={this.handleLogin}>
        <div className="ui stacked segment">
          <div className="field">
            <div className="ui left icon input">
              <i className="user icon"></i>
              <input type="text" name="email" ref="email" placeholder="E-mail address"/>
            </div>
          </div>
          <div className="field">
            <div className="ui left icon input">
              <i className="lock icon"></i>
              <input type="password" name="password" ref="password" placeholder="Password"/>
            </div>
          </div>
          <button className={loginButtonClasses}>ログイン</button>
        </div>
      </form>
    ):
    (
      <div className="ui active dimmer">
        <div className="ui text loader">認証中</div>
      </div>
    )

    return (
      <div style={this.props.style} className="howto-wrapper">
          <div className="titleImage">
             <img className="ui" width={200} height={50} src={howtoTitle} alt="GENERATOR"/>
          </div>
          <div className="ui hidden divider"></div>
          <div className="ui authFormBody">
            {errors}
            {content}
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
      authenticated: !AppConfig.REQUIRE_LOGIN,
      authenticating: true,
      errorMessage: '',
    }

    this.handleResize = this.handleResize.bind(this)
    this.startHandler = this.startHandler.bind(this)
    this.authHandler = this.authHandler.bind(this)
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
    this.regsiterFireBaseAuth()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  regsiterFireBaseAuth() {
    firebase.auth()
            .onAuthStateChanged((user) => {
      this.setState({authenticated: user ? true: false,
                    authenticating: false})
      this.forceUpdate()
    });
  }

  authHandler(email, password) {
    this.setState({authenticating: true})
    try {
      firebase.auth()
         .signInWithEmailAndPassword(email, password)
         .catch((error) => {
           this.setState({
             errorMessage: error.message,
             authenticating: false,
           })
         });
    }
    catch(error) {
      this.setState({
        errorMessage: error.message,
        authenticating: false,
      })
    }
  }

  render() {
    const editorHeight = this.state.windowHeight - AppConfig.HEADER_HEIGHT;
    const editorWidth = this.state.windowWidth;

    const wrapperHeight = Math.max(this.state.windowHeight -
                                     (AppConfig.HEADER_HEIGHT + AppConfig.FOOTER_HEIGHT), AppConfig.CONTENT_MIN_H);

    const wrapperWidth = wrapperHeight * 3 / 4.0 + 80

    const style = {
      size: {
        "minHeight": wrapperHeight + "px",
        "maxWidth": wrapperWidth + "px",
        "height": "auto",
        "display": "block",
        "border": "1px solid white",
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

    const screen = this.state.authenticated ? ( this.state.started
                 ? (<EditorApp style={style.size} editorWidth={editorWidth} editorHeight={editorHeight} />)
                 : (<HowTo style={style.size} startHandler={this.startHandler} />)
               ): (<Login style={style.size}
                          authHandler={this.authHandler}
                          errorMessage={this.state.errorMessage}
                          authenticating={this.state.authenticating}/>)

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
