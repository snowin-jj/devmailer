import { Grid, Heading, Image, Text, chakra, VStack } from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import CustomButton from './general/CustomButton';
import FormInput from './general/FormInput';

const AuthForm = () => {
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setIsLoading(true);

		const form = new FormData(e.target);
		const formData = Object.fromEntries(form.entries());
		const { email } = formData;

		if (email) {
			try {
				await signIn('email', {
					email,
					callbackUrl: '/dashboard',
				});
			} catch (e) {
				const error = e as Error;
				console.log(error.message);
			}
		}

		setIsLoading(false);
	};

	return (
		<Grid minHeight='100vh' placeItems='center'>
			<VStack
				gap={{ md: '1' }}
				w='full'
				maxW={{ sm: '14rem', md: '16rem' }}
				px={{ sm: '2' }}
			>
				<Heading
					display='flex'
					flexDir='column'
					alignItems='center'
					justifyContent='center'
					gap='0.8rem'
					textDecoration='none !important'
					fontSize={{ sm: '2xl', md: '3xl' }}
				>
					<Link href='/'>
						<Image
							src='/icon.png'
							alt='site logo'
							width={54}
							height={54}
						/>
					</Link>
					Sign In
				</Heading>
				<chakra.form
					display='flex'
					flexDir='column'
					gap='2'
					w='full'
					onSubmit={handleSubmit}
				>
					<FormInput name='email' type='email' />
					<CustomButton
						type='submit'
						mode='dark'
						otherProps={{
							isLoading: isLoading,
							w: 'full',
							fontWeight: '500',
						}}
					>
						Sign In With Email
					</CustomButton>
				</chakra.form>
				<Text m='0 !important' fontSize={{ sm: 'xs', md: 'sm' }}>
					or
				</Text>
				<CustomButton
					mode='light'
					otherProps={{ w: 'full', fontWeight: '500' }}
					handleClick={async () =>
						signIn('google', { callbackUrl: '/dashboard' })
					}
				>
					Sign In With Google
				</CustomButton>
			</VStack>
		</Grid>
	);
};

export default AuthForm;
