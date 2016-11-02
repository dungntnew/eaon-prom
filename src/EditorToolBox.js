import React, {Component} from 'react';

import Tabs from './Tabs';

import BGTool from './BGTool';
import FaceTool from './FaceTool';
import HairTool from './HairTool';
import GoodsTool from './GoodsTool';

class EditorToolBox extends Component {

  constructor() {
    super()
    this.state = {
      activeTab: 0
    }
    this.changeTab = this.changeTab.bind(this)
  }

  changeTab(index) {
    return (evt) => {
      this.setState({
        activeTab: index
      })
    }
  }

  render() {
    const titles = [
      this.props.assets.face.title,
      this.props.assets.hair.title,
      this.props.assets.background.title,
      this.props.assets.goods.title,
    ]

    const contents = [
      <FaceTool
        canvas={this.props.canvas}
        resource={this.props.assets.face}
        onStartProcess={this.props.onStartProcess}
        onFinishProcess={this.props.onFinishProcess}
        onError={this.props.onError}
       />,
      <HairTool
        canvas={this.props.canvas}
        resource={this.props.assets.hair}
        onStartProcess={this.props.onStartProcess}
        onFinishProcess={this.props.onFinishProcess}
        onError={this.props.onError}
      />,
      <BGTool
        canvas={this.props.canvas}
        resource={this.props.assets.background}
        onStartProcess={this.props.onStartProcess}
        onFinishProcess={this.props.onFinishProcess}
        onError={this.props.onError}
      />,
      <GoodsTool
       canvas={this.props.canvas}
       resource={this.props.assets.goods}
       onStartProcess={this.props.onStartProcess}
       onFinishProcess={this.props.onFinishProcess}
       onError={this.props.onError}
      />
    ]

    return (
      <div className='ui container'>
        <Tabs
          titles={titles}
          contents={contents}
          activeTab={this.state.activeTab}
          onTabSelect={this.changeTab}
        />
      </div>
    )
  }
}

export default EditorToolBox;
