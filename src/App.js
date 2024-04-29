import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/login';
import history from './history';
import SignUpPage from './pages/signup';
import DashboardPage from './pages/dashboard';
import EventPage from './pages/event';
import GroupPage from './pages/group';
import EditEventPage from './pages/editevent';
import Header from './components/header';
import EditGroupPage from './pages/editgroup';
import EventInvitePage from './pages/eventinvite';
import GroupInvitePage from './pages/groupinvite';

function App() {
    return (
        <Router history={history}>
            <Header />
            <Routes>
                <Route exact path='/login' element={<LoginPage />} />
                <Route exact path='/signup' element={<SignUpPage />} />
                <Route exact path='/invite/event/:id' element={<EventInvitePage />} />
                <Route exact path='/invite/group/:id' element={<GroupInvitePage />} />
                <Route exact path='/event/create' element={<EditEventPage newEvent={true} />} />
                <Route exact path='/event/edit/:id' element={<EditEventPage newEvent={false} />} />
                <Route exact path='/group/create' element={<EditGroupPage newGroup={true} />} />
                <Route exact path='/group/edit/:id' element={<EditGroupPage newGroup={false} />} />
                <Route exact path='/event/:id' element={<EventPage />} />
                <Route exact path='/group/:id' element={<GroupPage />} />
                <Route exact path='/' element={<DashboardPage />} />
            </Routes>
        </Router>
    );
}

export default App;
