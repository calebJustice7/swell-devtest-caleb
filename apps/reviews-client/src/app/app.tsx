import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import WebFont from 'webfontloader';
import Header from './components/header/header';
import ReviewsList from './components/reviews-list/reviews-list';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { theme } from './theme';
import 'react-loading-skeleton/dist/skeleton.css';
import QueryClientWrapper from '../queries/query-client-wrapper';

WebFont.load({
	google: {
		families: ['Montserrat:500,600,700'],
	},
});

export function App() {
	return (
		<ThemeProvider theme={theme}>
			<QueryClientWrapper>
				<Header />
				<Container sx={{ mt: 2, typography: 'body1' }}>
					<ReviewsList />
				</Container>
			</QueryClientWrapper>
		</ThemeProvider>
	);
}

export default App;
