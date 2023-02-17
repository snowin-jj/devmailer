import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../theme';
import Layout from '@/layout/Layout';

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	return (
		<ChakraProvider theme={theme}>
			<SessionProvider session={session}>
				{Component.authPage ? (
					<Component {...pageProps} />
				) : (
					<Layout>
						<Component {...pageProps} />
					</Layout>
				)}
			</SessionProvider>
		</ChakraProvider>
	);
}
