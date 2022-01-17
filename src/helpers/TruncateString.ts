const TruncateString = (string: string, limit: number) => {
	const splited = string.split(' ');
	const splitedLength = splited.length;
	if (splitedLength <= limit) {
		return string;
	}

	return splited.join(' ').slice(0, limit) + '...';
};

export default TruncateString;
