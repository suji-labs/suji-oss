/**
 * Created by njir
 */
import React, { PropTypes, } from 'react'
import { Link, IndexLink, } from 'react-router'

import Toolbar from 'material-ui/lib/toolbar/toolbar'
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group'
import LeftNav from 'material-ui/lib/left-nav'
import IconButton from 'material-ui/lib/icon-button'
import FlatButton from 'material-ui/lib/flat-button'
import MenuItem from 'material-ui/lib/menus/menu-item'
import MenuIcon from 'material-ui/lib/svg-icons/navigation/menu'

import { white, } from 'material-ui/lib/styles/colors'
import * as style from './style.js'

export default class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  handleToggle = () => this.setState({
      open: !this.state.open,
  })
  handleClose = () => this.setState({
    open: false,
  })

  render() {
    return (
      <Toolbar style={style.navbar}>
        <ToolbarGroup firstChild>
          <IconButton style={style.navbarMenu} onClick={this.handleToggle}>
            <MenuIcon color={white}/>
          </IconButton>
          <LeftNav docked={false} width={200} open={this.state.open}
                   onRequestChange = { open => this.setState({open}) }>
            <Link to="/counter" style={style.popUpText}>
              <MenuItem onTouchTap={this.handleClose}>Store</MenuItem>
            </Link>
          </LeftNav>
        </ToolbarGroup>

        <ToolbarGroup>
          <FlatButton disabled label={<Link to="/counter" style={style.text}>Store</Link>}
                      style={style.linkButton} />
        </ToolbarGroup>

        <ToolbarGroup float="right">
          <FlatButton disabled label={<Link to="/counter" style={style.text}>About</Link>}
                      style={style.linkButton} />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}
