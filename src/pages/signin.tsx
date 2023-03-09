import Head from 'next/head';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import AuthForm from '../components/AuthForm';
import { GetServerSidePropsContext } from 'next';

const SignIn = () => {
	return (
		<>
			<Head>
				<title>SignIn | DevMailer</title>
				<meta name='description' content='sign in to devmailer' />
			</Head>
			<AuthForm />;
		</>
	);
};

SignIn.authPage = true;

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getServerSession(
		context.req,
		context.res,
		authOptions
	);

	if (session) {
		return {
			redirect: {
				destination: '/dashboard',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
}

export default SignIn;
