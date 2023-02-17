export const generateAvatar = (name: string) => {
	return `https://api.dicebear.com/5.x/initials/svg?seed=${name}&backgroundColor=ffb300,039be5&backgroundType=gradientLinear&backgroundRotation=-290&fontFamily=Helvetica,sans-serif&fontWeight=600`;
};

export const capitalize = (name: string) => {
	return name.replace(/\b(\w)/g, (s) => s.toUpperCase());
};

export const randomUser = async () => {
	const res = await fetch(
		'https://random-data-api.com/api/v2/users?response_type=json'
	);
	const jsonData = await res.json();

	return {
		firstName: jsonData.first_name,
		lastName: jsonData.last_name,
		avatar: jsonData.avatar,
	};
};
