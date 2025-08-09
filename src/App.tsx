import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Header } from './components/layout/header';
import { FilesManager } from './components/sections/files-manager';
import './styles/globals.scss';

export const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<main className="base">
				<Routes>
					<Route path="/files/*" element={<FilesManager />} />
					<Route path="/" element={<Navigate to="/files" />} />
				</Routes>
				<ToastContainer />
			</main>
		</BrowserRouter>
	);
};
