import {
	Center,
	FormControl,
	FormLabel,
	chakra,
	Heading,
} from '@chakra-ui/react';
import CustomButton from './general/CustomButton';
import FormInput from './general/FormInput';
import { useMe } from '@/lib/hooks';
import { useState } from 'react';
import Head from 'next/head';

export default function OnBoard() {
	const { mutateUser } = useMe();
	const [loading, setLoading] = useState<boolean>(false);

	async function handleCreateName(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(true);

		const form = new FormData(e.target as HTMLFormElement);
		const formData = Object.fromEntries(form.entries());
		try {
			await mutateUser(formData);
		} catch (e) {
			console.log(e);
		}

		setLoading(false);
	}

	return (
		<>
			<Head>
				<title>Onboarding | DevMailer</title>
				<meta
					name='description'
					content='Create your username and signup to DevMailer'
				/>
			</Head>
			<Center minH='100vh' mt='-4rem'>
				<chakra.form
					onSubmit={handleCreateName}
					w='full'
					maxW={{ sm: '18rem' }}
					px={{ sm: '4' }}
					display='flex'
					flexDir='column'
					gap='1rem'
				>
					<Heading size={{ sm: 'md', md: 'lg' }} fontWeight='black'>
						Make a name for yourself
					</Heading>
					<FormControl>
						<FormLabel fontSize='xs'>Enter your name</FormLabel>
						<FormInput
							name='name'
							type='text'
							placeholder='eg: John Doe'
							otherProps={{}}
						/>
					</FormControl>
					<CustomButton
						mode='dark'
						type='submit'
						otherProps={{ isLoading: loading }}
					>
						Create
					</CustomButton>
				</chakra.form>
			</Center>
		</>
	);
}
