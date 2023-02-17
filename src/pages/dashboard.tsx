import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { getServerSession } from 'next-auth';
import { signOut } from 'next-auth/react';
import {
	Box,
	Center,
	Heading,
	IconButton,
	Text,
	VStack,
	useDisclosure,
	SlideFade,
	Flex,
	FormLabel,
} from '@chakra-ui/react';
import { CopyIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useMe } from '@/lib/hooks';
import { generateAvatar } from '@/utils/helper';
import { authOptions } from './api/auth/[...nextauth]';
import LoadingScreen from '@/layout/LoadingScreen';
import OnBoard from '@/components/OnBoard';
import CustomButton from '@/components/general/CustomButton';
import FormInput from '@/components/general/FormInput';

const Dashboard = () => {
	const { isOpen, onClose, onOpen } = useDisclosure();
	const [visible, setVisible] = useState(false);
	const { user, isLoading } = useMe();

	if (isLoading) return <LoadingScreen />;
	if (!user.name) return <OnBoard />;

	const handleView = () => setVisible((prev) => !prev);

	const copyToClipboard = () => {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(user?.apikey);
			onOpen();
			setTimeout(() => onClose(), 2000);
		}
	};

	return (
		<>
			<Head>
				<title>Dashboard | DevMailer</title>
				<meta
					name='description'
					content='Get your DevMailer api key and start sending mails'
				/>
			</Head>
			<Center
				minH='100vh'
				maxW={{ sm: 'fit-content', md: '28rem' }}
				gap={{ sm: '2', md: '2rem' }}
				mx='auto'
				mt='-4rem'
				flexDir={{ sm: 'column', md: 'row' }}
			>
				<Box
					boxShadow='2xl'
					width='full'
					maxWidth={{ sm: '20', md: '40' }}
					overflow='hidden'
				>
					<Image
						src={`${user.image ?? generateAvatar(user.name)}`}
						alt='profile photo'
						width={400}
						height={400}
						priority
					/>
				</Box>
				<VStack
					w='full'
					align={{ sm: 'center', md: 'flex-start' }}
					justify='center'
				>
					<Heading size={{ sm: 'md', md: 'xl' }}>{user.name}</Heading>
					<Text fontSize={{ sm: 'xs', md: 'md' }}>{user.email}</Text>
					<Box
						w='full'
						display='flex'
						flexDir={{ sm: 'column', md: 'row' }}
						alignItems={{ sm: 'center', md: 'flex-end' }}
						gap={{ sm: '1', md: '2' }}
					>
						<FormLabel
							htmlFor='apikey'
							textAlign={{ sm: 'center', md: 'left' }}
						>
							<Text
								as='span'
								fontWeight='bold'
								fontSize={{ sm: 'xs', md: 'md' }}
							>
								Api Key
							</Text>
							<FormInput
								name='apikey'
								type={`${visible ? 'text' : 'password'}`}
								otherProps={{
									value: user.apikey,
									h: 'fit-content',
									w: '100%',
									px: '2',
									py: '1',
									fontSize: '0.6em',
									readOnly: true,
								}}
							/>
						</FormLabel>
						<Flex gap='2'>
							<IconButton
								aria-label='view icon'
								size={{ sm: 'xs' }}
								variant='ghost'
								transition='all 0.3s ease-in-out'
								_hover={{
									bgColor: '#FDF97650',
								}}
								_active={{
									bgColor: '#FDF976',
								}}
								icon={
									visible ? (
										<ViewIcon boxSize='2.5' />
									) : (
										<ViewOffIcon boxSize='2.5' />
									)
								}
								onClick={handleView}
							/>
							<IconButton
								aria-label='copy icon'
								size={{ sm: 'xs' }}
								variant='ghost'
								transition='all 0.3s ease-in-out'
								_hover={{
									bgColor: '#FDF97650',
								}}
								_active={{
									bgColor: '#FDF976',
								}}
								icon={<CopyIcon boxSize='2.5' />}
								onClick={copyToClipboard}
							/>
						</Flex>
					</Box>
					<CustomButton
						mode='light'
						handleClick={() => signOut({ callbackUrl: '/signin' })}
					>
						Sign Out
					</CustomButton>
				</VStack>
				<SlideFade
					in={isOpen}
					style={{
						width: 'full',
						position: 'absolute',
						bottom: '5%',
					}}
					offsetY='20px'
				>
					<Text
						fontSize={{ sm: '0.6em', md: '0.8em' }}
						bg='#FFF85B90'
						color='#1b1a09'
						px='2'
						py='1'
						rounded='md'
						width='fit-content'
					>
						copied to the clipboard!
					</Text>
				</SlideFade>
			</Center>
		</>
	);
};

export async function getServerSideProps(context) {
	const session = await getServerSession(
		context.req,
		context.res,
		authOptions
	);

	if (session) {
		return {
			props: {
				data: session,
			},
		};
	}

	return {
		redirect: {
			destination: '/signin',
			permanent: false,
		},
	};
}

export default Dashboard;
