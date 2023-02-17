import Head from 'next/head';
import Image from 'next/image';
import CustomButton from '@/components/general/CustomButton';
import { Center, Heading, Text, VStack } from '@chakra-ui/react';

export default function VerifyRequest() {
	return (
		<>
			<Head>
				<title>About | DevMailer</title>
				<meta
					name='description'
					content='verify email to sign to devmailer'
				/>
			</Head>
			<Center minH='100vh' mt='-4rem'>
				<VStack>
					<Image
						src='/mail-sent.png'
						alt='mail sent sucessfully'
						width={400}
						height={400}
					/>
					<Heading as='h2' size='md'>
						Check your email
					</Heading>
					<Text fontSize='smaller'>
						A sign in link has been sent to your email address.
					</Text>
					<CustomButton
						isLink={true}
						otherProps={{
							href: 'https://mail.google.com',
							target: '_blank',
						}}
					>
						Check Mail
					</CustomButton>
				</VStack>
			</Center>
		</>
	);
}
