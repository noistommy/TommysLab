import React from 'react';
import {BlogItem} from 'components';

class BlogList extends React.Component {

	render(){
		
		return (
			<ul className="blogList">
				<BlogItem/>
			</ul>
			)
	};
};

export default BlogList;