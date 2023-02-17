import Link from 'next/link';
import { Grid, Heading, Text, VStack } from '@chakra-ui/react';
import CustomButton from '@/components/general/CustomButton';
import Head from 'next/head';

export default function Home() {
	return (
		<>
			<Head>
				<title>Home | DevMailer</title>
			</Head>
			<Grid
				maxW='80rem'
				minH='100vh'
				mx='auto'
				mt='-4rem'
				px={{ sm: '2', md: '6' }}
				placeItems='center'
			>
				<VStack textAlign='center' maxW='28rem'>
					<Heading size={{ sm: 'md', md: 'lg', lg: '2xl' }}>
						Trouble making forms work on the website?
					</Heading>
					<Text fontSize={{ sm: 'xs', md: 'md' }}>
						No worries. Send emails without any issues with Dev
						Mailer. An API built for developers and businesses.
					</Text>
					<CustomButton
						otherProps={{
							as: Link,
							href: '/dashboard',
						}}
					>
						Get start
					</CustomButton>
				</VStack>
			</Grid>
		</>
	);
}
