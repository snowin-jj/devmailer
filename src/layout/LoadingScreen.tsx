import { Center, Spinner } from '@chakra-ui/react';

const LoadingScreen = () => {
	return (
		<Center minH='100vh' mt='-4rem'>
			<Spinner color='secondary' />
		</Center>
	);
};

export default LoadingScreen;
