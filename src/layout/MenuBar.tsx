import Link from 'next/link';
import { HamburgerIcon } from '@chakra-ui/icons';
import {
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from '@chakra-ui/react';
import CustomButton from '@/components/general/CustomButton';

export default function MenuBar({ navItems, session }) {
	return (
		<Menu>
			<MenuButton
				as={IconButton}
				aria-label='Options'
				icon={<HamburgerIcon />}
				variant='link'
			/>
			<MenuList minW='8rem'>
				{navItems.map((item) => (
					<MenuItem
						key={item.name}
						as={Link}
						href={item.href}
						target={item.target}
						px='8'
						_hover={{
							bgColor: '#FDF97650',
						}}
						_focus={{
							bgColor: 'transparent',
						}}
						_activeLink={{
							bgColor: '#FDF97650',
						}}
						textDecoration='none !important'
					>
						{item.name}
					</MenuItem>
				))}
				<MenuItem
					_hover={{
						bgColor: 'transparent',
						cursor: 'default',
					}}
				>
					<CustomButton
						otherProps={{
							as: Link,
							href: session ? '/dashboard' : '/signin',
							w: 'full',
						}}
					>
						{session ? 'Dasboard' : 'Sign In'}
					</CustomButton>
				</MenuItem>
			</MenuList>
		</Menu>
	);
}
