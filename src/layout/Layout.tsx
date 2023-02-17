import { PropsWithChildren } from 'react';
import { Box } from '@chakra-ui/react';

import Navbar from './Navbar';
import Head from 'next/head';

const Layout = ({ children }: PropsWithChildren) => {
	return (
		<Box px={{ sm: '2', md: '6', lg: '10' }}>
			<Head>
				<meta name='description' content='An API service' />
				<meta httpEquiv='X-UA-Compatible' content='ie=edge' />
				<meta
					name='keywords'
					content='api, mailapi, sendmail, apiservice, mailing, contactform, devmailer, mailer, bestapiservice, fastestwaytosendmail, sendemail, mail, email'
				/>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0'
				/>
				<link rel='icon' href='/icon.png' />
				<title>DevMailer</title>
			</Head>
			<Navbar />
			{children}
		</Box>
	);
};

export default Layout;
