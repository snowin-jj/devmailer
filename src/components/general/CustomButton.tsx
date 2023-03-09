import { Button } from '@chakra-ui/react';
import Link from 'next/link';

interface IButtonProps {
	children: React.ReactNode;
	type?: 'button' | 'submit' | 'reset';
	isLink?: boolean;
	isLoading?: boolean;
	mode?: 'light' | 'dark';
	size?: {};
	handleClick?: React.MouseEventHandler<HTMLButtonElement>;
	otherProps?: any;
}

const CustomButton = ({
	children,
	mode = 'light',
	type = 'button',
	isLink = false,
	isLoading,
	size,
	handleClick,
	otherProps,
}: IButtonProps) => {
	const colorScheme = mode === 'light' ? 'primary' : 'black';

	return (
		<Button
			as={isLink && Link}
			type={type}
			onClick={handleClick}
			bgColor={colorScheme}
			color={mode === 'dark' ? 'white' : 'black'}
			size={size ?? { sm: 'sm' }}
			fontSize={{ sm: '18', md: '20' }}
			textDecoration='none !important'
			border='2px'
			borderColor={colorScheme}
			borderRadius='none'
			isLoading={isLoading}
			_loading={{
				bgColor: { colorScheme },
			}}
			_active={{
				bgColor: { colorScheme },
			}}
			_hover={{
				bgColor: 'transparent',
				color: `${mode === 'dark' && 'black'}`,
			}}
			{...otherProps}
		>
			{children}
		</Button>
	);
};

export default CustomButton;
