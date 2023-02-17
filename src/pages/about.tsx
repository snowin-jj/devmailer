import Head from 'next/head';
import Image from 'next/image';
import { Flex, Grid } from '@chakra-ui/react';
import PageContents from '../components/general/PageContents';

const About = () => {
	const pageContent = `Dev mailer is an authentic API service designed to help developers. 
    Are you struggling to integrate the mail service into your application? 
    Dev mailer is here to solve the problem. Want to send emails to your clients? You can count on Dev mailer to help you with that too. 
    Dev mailer is a reliable API service that can help you integrate your mail.`;

	return (
		<>
			<Head>
				<title>About | DevMailer</title>
				<meta name='description' content={pageContent} />
			</Head>
			<Grid minHeight='100vh' mt={{ lg: '-4rem' }} placeItems='center'>
				<Flex
					flexDir={{ sm: 'column', lg: 'row' }}
					alignItems='center'
					textAlign='left'
					gap='8'
				>
					<Image
						src='/mailing.jpg'
						alt='a women sending mail'
						width={400}
						height={400}
						priority
						style={{
							width: '100%',
							height: '300px',
							objectFit: 'cover',
						}}
					/>
					<PageContents
						title='About'
						caption={pageContent}
						align='justify'
					/>
				</Flex>
			</Grid>
		</>
	);
};

export default About;
