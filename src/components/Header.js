import React from 'react';
import { Link } from 'react-router';
import { Menu, Icon } from 'semantic-ui-react';

class Header extends React.Component {
	constructor(props) {
        super(props);
		this.addClass = this.addClass.bind(this);
    }
	addClass() {
        let element = document.getElementById('Commentview');
		element.classList.add('open');
    }
	render(){
		const loginButton = (
			<Menu.Item as={Link} to="/login" icon='privacy' className='vpn_key'/>
		);
		const logoutButton = (
			<div>
				<Menu.Item link icon='unlock' className='lock_open' onClick={this.props.onLogout}/>
			</div>
		);

		return (
			<Menu secondary size="massive">
				<Menu.Item header>
					<Link to="/">MEMOPAD</Link>
				</Menu.Item>
				<Menu.Item icon='talk outline' className='btn-comment' onClick={this.addClass}/>
				<Menu.Item link icon='search' className="material-icons"/>
				<Menu.Menu position='right'>
					{ this.props.currentUser }
					{ this.props.isLoggedIn ? logoutButton : loginButton }
				</Menu.Menu>
			</Menu>
			// <nav>
            //     <div className="nav-wrapper blue darken-1">
            //         <a className="brand-logo center">MEMOPAD</a>
			//
            //         <ul>
            //             <li><a><i className="material-icons">search</i></a></li>
            //         </ul>
			//
            //         <div className="right">
            //             <ul>
            //                 <li>
            //                     <a><i className="material-icons">vpn_key</i></a>
            //                 </li>
            //                 <li>
            //                     <a><i className="material-icons">lock_open</i></a>
            //                 </li>
            //             </ul>
            //         </div>
            //     </div>
            // </nav>
		);
	}
}

Header.propTypes = {
    isLoggedIn: React.PropTypes.bool,
    onLogout: React.PropTypes.func,
    currentUser: React.PropTypes.string
};

Header.defaultProps = {
    isLoggedIn: false,
    onLogout: () => { console.error("logout function not defined");},
    currentUser: "Guest"
};

export default Header;
