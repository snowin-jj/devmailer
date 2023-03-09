import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { HStack, Show, Spinner } from '@chakra-ui/react';
import CustomButton from '../components/general/CustomButton';
import MenuBar from './MenuBar';

const Navbar = () => {
	const { data: session, status } = useSession();

	const navItems = [
		{
			name: 'About',
			href: '/about',
			target: '_self',
		},
		{
			name: 'Pricing',
			href: '/pricing',
			target: '_self',
		},
		{
			name: 'Docs',
			href: 'https://docs-devmailer.netlify.app',
			target: '_blank',
		},
	];

	return (
		<HStack
			as='header'
			w='full'
			justify='space-between'
			align='center'
			h='4rem'
			fontSize='0.8em'
			zIndex='10'
		>
			<Link href='/'>
				<Image
					src='/icon.png'
					alt='site icon'
					priority
					width={54}
					height={54}
				/>
			</Link>

			<Show above='md'>
				<HStack gap='8'>
					{navItems.map((item) => (
						<Link
							href={item.href}
							key={`nav-link-${item.name}`}
							target={item.target}
						>
							{item.name}
						</Link>
					))}
					{status === 'loading' ? (
						<Spinner color='secondary' size='xs' />
					) : (
						<CustomButton
							isLink={true}
							otherProps={{
								href: session ? '/dashboard' : '/signin',
							}}
						>
							{session ? 'Dashboard' : 'Sign In'}
						</CustomButton>
					)}
				</HStack>
			</Show>

			<Show below='md'>
				<MenuBar navItems={navItems} session={session} />
			</Show>
		</HStack>
	);
};

export default Navbar;
