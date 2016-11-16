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
      <div className="content-wrapper">
      <div className="titleImage">
         <img className="ui" width={250} height={25} src={titleImage} alt="GENERATOR"/>
      </div>
      <div className="ui hidden divider"></div>
      <Editor/>
      </div>
    )
  }
}

class HowTo extends Component {
  render() {
    return (
      <div className="content-wrapper">
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
      started: true,
      errorMessage: '',
    }

    this.startHandler = this.startHandler.bind(this)
  }

  startHandler() {
    this.setState({started: true})
  }

  render() {
    const screen =  this.state.started
                 ? (<EditorApp />)
                 : (<HowTo startHandler={this.startHandler} />)

    return (
      <div className='wrapper'>
        {/* header */}
        <div className="ui inverted vertical header segment app-header">
          <div className="logo">
             <img width={90} height={15} src={logo} alt='LOGO'/>
          </div>
        </div>

        {screen}
        {/* footer */}
        <div className="ui inverted vertical footer segment app-footer">
           <p className='copyright'>© 2016 AEON.com Co.,Ltd.</p>
        </div>
      </div>
    );
  }
}

export default App;
