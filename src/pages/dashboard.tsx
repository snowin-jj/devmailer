import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
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
} from '@chakra-ui/react';
import { CopyIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useMe } from '@/lib/hooks';
import { generateAvatar } from '@/utils/helper';
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
				gap={{ sm: '2', md: '1rem' }}
				mx='auto'
				mt='-4rem'
				flexDir={{ sm: 'column' }}
			>
				<Box boxShadow='2xl' width='fit-content' overflow='hidden'>
					<Image
						src={`${user.image ?? generateAvatar(user.name)}`}
						alt='profile photo'
						width={120}
						height={120}
						quality={100}
						priority
					/>
				</Box>
				<VStack w='full' align={{ sm: 'center' }} justify='center'>
					<Box textAlign={{ sm: 'center' }}>
						<Heading size={{ sm: 'md', md: 'xl' }}>
							{user.name}
						</Heading>
						<Text fontSize={{ sm: 'xs', md: 'sm' }}>
							{user.email}
						</Text>
					</Box>
					<Text
						as='span'
						fontWeight='bold'
						fontSize={{ sm: 'xs', md: 'md' }}
					>
						Api Key
					</Text>
					<Box
						w='full'
						display='flex'
						flexDir={{ sm: 'column', md: 'row' }}
						alignItems='center'
						justifyContent='center'
						gap={{ sm: '1', md: '2' }}
						pos='relative'
					>
						<FormInput
							name='apikey'
							type={`${visible ? 'text' : 'password'}`}
							w={{ sm: 'full', md: 'fit-content' }}
							otherProps={{
								value: user.apikey,
								h: 'fit-content',
								px: '2',
								py: '1',
								fontSize: '0.6em',
								readOnly: true,
							}}
						/>
						<Flex
							gap='2'
							pos={{ md: 'absolute' }}
							right={{ md: '10' }}
						>
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
										<ViewIcon boxSize='3' />
									) : (
										<ViewOffIcon boxSize='3' />
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
								icon={<CopyIcon boxSize='3' />}
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

export default Dashboard;
