import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contacts from './components/Contacts';
import AddContact from './components/AddContact';
import EditContact from './components/EditContact';

function App() {
	return (
		<div className="ui container">
			<div className="ui fixed menu">
				<div className="ui container center">
					<h2>Contact Manager</h2>
				</div>
			</div>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Contacts />} />
					<Route path="/add" element={<AddContact />} />
					<Route path="/edit/:id" element={<EditContact />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
