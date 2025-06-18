import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Header from '~/components/MainLayout/components/Header';
import Box from '@mui/material/Box';
import Banner from '../../assets/images/banner.jpg';

function Copyright() {
	return (
		<Typography
			variant='body2'
			color='textSecondary'
			align='center'>
			{'Copyright © '}
			<Link
				color='inherit'
				href='https://material-ui.com/'
				underline='hover'>
				My Store
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<>
			<Header />
			<main>
				<Container
					sx={{ pb: 8 }}
					maxWidth='md'>
					<div style={{ textAlign: 'center' }}>
						{' '}
						<img
							src={Banner}
							alt='image'
						/>
					</div>

					{children}
				</Container>
			</main>
			<Box
				component={'footer'}
				sx={{ bgcolor: (theme) => theme.palette.background.paper, padding: 6 }}>
				<Typography
					variant='subtitle1'
					align='center'
					color='textSecondary'
					component='p'>
					Thank you for your purchase!
				</Typography>
				<Copyright />
			</Box>
		</>
	);
};

export default MainLayout;
