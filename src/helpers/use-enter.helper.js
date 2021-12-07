export const onEnterPress = (callback) => {
	return (event) => {
		if (event.key === 'Enter') {
			callback();
		}
	}
};
