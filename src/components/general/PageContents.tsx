import { Box, Heading, Text } from '@chakra-ui/react';

const PageContents = ({
	title,
	caption,
	align,
}: {
	title: string;
	caption: string;
	align?: any;
}) => {
	return (
		<Box
			display='flex'
			flexDir='column'
			alignItems='flex-start'
			textAlign={align}
		>
			<Heading size={{ sm: 'md', md: 'lg' }} w='full'>
				{title}
			</Heading>
			<Text my='2' fontSize={{ sm: 'smaller', md: 'sm', xl: 'md' }}>
				{caption}
			</Text>
		</Box>
	);
};

export default PageContents;
