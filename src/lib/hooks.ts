import useSWR from 'swr';
import fetcher from './fetcher';

export const useMe = () => {
	const {
		data: user,
		error,
		isLoading,
		mutate,
		isValidating,
	} = useSWR('/user', fetcher);

	let loading = (!user && !error) || isLoading;

	async function mutateUser(data: unknown, options?: {}) {
		await mutate(fetcher('/user', data), {
			...options,
		});
	}

	return {
		user,
		error,
		isLoading: loading,
		isValidating,
		mutateUser,
	};
};
