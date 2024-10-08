import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BottomTab from './components/common/BottomTab/BottomTab';
import HomeDetail from './pages/HomeDetail';
import Chatbot from './pages/Chatbot';
import ChatLog from './pages/ChatLog';
import ChatLogDetail from './pages/ChatLogDetail';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Mypage from './pages/Mypage';
import EditProfile from './pages/EditProfile';
import Login from './pages/Login';
import ApplyList from './pages/ApplyList';
import History from './pages/History';
import Scrap from './pages/Scrap';
import Signup from './pages/Signup';
import InitialSet from './pages/InitialSet';
import InitialSet2 from './pages/InitialSet2';
import InitialSet3 from './pages/InitialSet3';
import InitialSet4 from './pages/InitialSet4';
import InitialSet5 from './pages/InitialSet5';
import InitialSet6 from './pages/InitialSet6';
import Final from './pages/Final';
import ChatMenu from './pages/ChatMenu';
import ChatPhoto from './pages/ChatPhoto';
import PhotoLog from './pages/PhotoLog';
import ChatVoice from './pages/ChatVoice';
import ChatPhotoDetail from './pages/ChatPhotoDetail';

const queryClient = new QueryClient();

function App() {
  return (
    <div className='h-dvh w-full bg-black'>
      <div className='relative mx-auto h-dvh bg-white md:w-[375px]'>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/detail/:id' element={<HomeDetail />} />
              <Route path='/chatbot' element={<ChatMenu />} />
              <Route path='/chatbot/chat' element={<Chatbot />} />
              <Route path='/chatbot/photo' element={<ChatPhoto />} />
              <Route path='/chatlog' element={<ChatLog />} />
              <Route path='/chatlog/detail/:id' element={<ChatLogDetail />} />
              <Route path='/photolog' element={<PhotoLog />} />
              <Route
                path='/photolog/detail/:id'
                element={<ChatPhotoDetail />}
              />
              <Route path='/chatbot/voice' element={<ChatVoice />} />
              <Route path='/mypage' element={<Mypage />} />
              <Route path='/mypage/edit' element={<EditProfile />} />
              <Route path='/mypage/apply' element={<ApplyList />} />
              <Route path='/mypage/history' element={<History />} />
              <Route path='/mypage/scrap' element={<Scrap />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/signup/initial-nickname' element={<InitialSet />} />
              <Route path='/signup/initial-nation' element={<InitialSet2 />} />
              <Route path='/signup/initial-prof' element={<InitialSet3 />} />
              <Route
                path='/signup/initial-certification'
                element={<InitialSet4 />}
              />
              <Route
                path='/signup/initial-certification-number'
                element={<InitialSet5 />}
              />
              <Route
                path='/signup/initial-workhistory'
                element={<InitialSet6 />}
              />
              <Route path='/complete-page' element={<Final />} />
            </Routes>
            <BottomTab />
          </BrowserRouter>
        </QueryClientProvider>
      </div>
    </div>
  );
}

export default App;
