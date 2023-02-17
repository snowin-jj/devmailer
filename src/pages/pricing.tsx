import Head from 'next/head';
import Link from 'next/link';
import { Flex, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import CustomButton from '@/components/general/CustomButton';
import PageContents from '@/components/general/PageContents';

const Pricing = () => {
	const pageContent = `
  Get your API keys and start hacking. 
  Ideal for individual developers working on personal sites, and client projects.
  `;

	return (
		<>
			<Head>
				<title>Pricing | DevMailer</title>
				<meta name='description' content={pageContent} />
			</Head>
			<Grid minHeight='100vh' mt='-4rem' placeItems='center'>
				<Flex
					flexDir={{ sm: 'column', lg: 'row' }}
					alignItems={{ sm: 'center' }}
					textAlign='left'
					gap={{ sm: '4', md: '8' }}
				>
					<PageContents
						title='Pricing'
						caption={pageContent}
						align={{ sm: 'center', lg: 'left' }}
					/>
					<VStack
						minW='fit-content'
						boxShadow='lg'
						borderTop='8px'
						borderColor='primary'
						p={{ sm: '4', md: '6' }}
					>
						<Heading size={{ sm: 'sm', md: 'lg' }}>Free</Heading>
						<Text
							color='secondary'
							fontSize={{ sm: 'xs', md: 'md' }}
							textAlign='center'
						>
							1000 requests per day
						</Text>
						<CustomButton
							size={{ sm: 'xs', md: 'sm' }}
							otherProps={{
								as: Link,
								href: '/signin',
							}}
						>
							Start For Free
						</CustomButton>
					</VStack>
				</Flex>
			</Grid>
		</>
	);
};

export default Pricing;
