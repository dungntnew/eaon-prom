import React, {Component} from 'react';

import {
        Container,
        Image,
        List
} from 'semantic-ui-react';
import classNames from 'classnames';

class ItemList extends Component {
  render() {
    const items = this.props.items.map((item) => {
      return (
          <List.Item
               key={item.key}
               onClick={this.props.onItemClick(item.id)}
          >
            <Image
              width={80}
              height={80}
              src={item.src}
            />
          </List.Item>

      )
    })

    return (
      <List horizontal animated>
         {items}
      </List>
    )
  }
}

class Tabs extends Component {

  render() {
    const titles = this.props.titles.map((title, index) => {
      const itemClass = classNames({
        'item': true,
        'active': this.props.activeTab === index
      })

      return (
        <div key={'tab-item-' + index} className={itemClass}
             onClick={this.props.onTabSelect(index)}
        > {title} </div>
      )
    });

    const contents = this.props.contents.map((body, index) => {
      const itemClass = classNames({
        'ui attached tab bottom segment': true,
        'active': this.props.activeTab === index
      })

      return (
        <div key={'tab-' + index} className={itemClass}> {body}</div>
      )
    });

    return (
      <Container>
        <div className='ui top attached tabular menu'>
            {titles}
        </div>
        {contents}
      </Container>
    )
  }
}

class BaseTool extends Component {
  constructor() {
    super()
    this.onItemClick = this.onItemClick.bind(this)
  }

  onItemClick(id) {
    return (env) => {
      console.log('Item clicked..: ' + id)
    }
  }

  render() {

    const thumbnais = this.props.resource.thumbnails.map((src, index) =>  {
      return {
        id: index,
        key: 'thumbnail-' + index,
        src: src,
      }
    })

    return (
      <div><ItemList items={thumbnais} onItemClick={this.onItemClick}/></div>
    )
  }
}

class FaceTool extends BaseTool {
  onItemClick(id) {
    return (env) => {
      console.log('Face Item clicked..: ' + id)
    }
  }
}

class HairTool extends BaseTool {
  onItemClick(id) {
    return (env) => {
      console.log('Hair Item clicked..: ' + id)
    }
  }
}

class BackgroundTool extends BaseTool {
  onItemClick(id) {
    return (env) => {
      console.log('BG Item clicked..: ' + id)
    }
  }
}

class GoodsTool extends BaseTool {
  onItemClick(id) {
    return (env) => {
      console.log('Goods Item clicked..: ' + id)
    }
  }
}

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
      <FaceTool resource={this.props.assets.face}/>,
      <HairTool resource={this.props.assets.hair}/>,
      <BackgroundTool resource={this.props.assets.background}/>,
      <GoodsTool resource={this.props.assets.goods}/>
    ]

    return (
      <Container>
        <Tabs
          titles={titles}
          contents={contents}
          activeTab={this.state.activeTab}
          onTabSelect={this.changeTab}
        />
      </Container>
    )
  }
}

export default EditorToolBox;
