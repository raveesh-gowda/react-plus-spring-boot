export const isObjectEmpty = (data = {}) => {
	if (!data) return true;
	if (data && Object.keys(data).length === 0) return true;
	return false;
};
