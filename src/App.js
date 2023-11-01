import SummaryPage from './pages/summary'

import { Toaster } from 'react-hot-toast';

const App = () => {
	return (
		<div>
			<div><Toaster /></div>
			<div className='p-4 md:px-8 md:py-4'>
				<SummaryPage />
			</div>
		</div>
	)
}

export default App