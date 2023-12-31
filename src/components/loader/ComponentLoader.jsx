import React from 'react';
import ContentLoader from 'react-content-loader';

const ComponentLoader = (props) => {
	return (
		<ContentLoader viewBox="0 0 400 31" height={100} width={'100%'} {...props}>
			<rect height="5.5" rx="1" ry="1" width="340" x="31" y="5" />
			<rect height="5.5" rx="1" ry="1" width="340" x="31" y="15" />
			<circle cx="388" cy="12" r="12" />
			<rect height="24" rx="0" ry="0" width="24" x="0" y="0" />
		</ContentLoader>
	);
};

export default ComponentLoader;
