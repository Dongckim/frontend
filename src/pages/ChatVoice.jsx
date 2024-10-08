import { useNavigate } from 'react-router-dom';
import leftChevronIcon from '../assets/icons/left-chevron.svg';
import sendIcon from '../assets/icons/send-gray.svg';
import ChatbotMessage from '../components/chatbot/ChatbotMessage';
import { useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import UserMessage from '../components/chatbot/UserMessage';
import { postSendVoice, postSendMessage } from '../api/chats';
import useAuth from '../hooks/useAuth';

const firstMessage = `반가워요!
저는 인공지능 표준어 변환 봇이에요.
요양보호사 활동 중 음성으로 어르신의 목소리를 저에게 보내주면, 이해하기 쉽도록 표준어로 바꿔드려요.`;


const ChatVoice = () => {
    const [messageList, setMessageList] = useState([]);
    const navigate = useNavigate();
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
    const [form, setForm] = useState()
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
  

  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // const { mutate: createChatroom, createIsPending } = useMutation({
  //   mutationFn: (title) => postCreateChatRoom(title),
  //   onSuccess: (data) => {
  //     chatRoomId.current = data.chatRoomId;
  //     setMessageList((list) => [
  //       ...list,
  //       { content: data.content, isBot: data.bot },
  //     ]);
  //   },
  //   onError: (err) => console.log(err),
  // });

  const { mutate: sendMessage, sendIsPending } = useMutation({
    mutationFn: (content) => postSendVoice(content),
    onSuccess: (data) => {
      setMessageList((list) => [
        ...list,
        { content: data, isBot: true },
      ]);
    },
  });

  const handleSendMessage = ({audioUrl}) => {
    setMessageList((list) => [...list, { isBot: false, audio: audioUrl}]);
    sendMessage(form); // 채팅 메세지 전송
  };

    const startRecording = () => {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorderRef.current = mediaRecorder;
  
          mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              audioChunksRef.current.push(event.data);
            }
          };
  
          mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
            const newAudioUrl = URL.createObjectURL(audioBlob);
            setAudioUrl(newAudioUrl);
            uploadAudio(audioBlob);
       
            audioChunksRef.current = []; // Clear the chunks for next recording
          };

          mediaRecorder.start();
          setIsRecording(true);
        })
        .catch(err => {
          console.error('Error accessing microphone: ', err);
        });
    };
    
    const uploadAudio = async (audioBlob) => {
        const formData = new FormData();
        formData.append('file', audioBlob, 'recording.wav');
        setForm(formData)
        // try {
        //   const response = await axios.post('https://your-server-url.com/upload', formData, {
        //     headers: {
        //       'Content-Type': 'multipart/form-data',
        //     },
        //   });
    
        //   console.log('File uploaded successfully: ' + response.data);
        // } catch (error) {
        //   console.error('Error uploading file:', error);
        //   console.log('Error uploading file.');
        // }
      };
  
    const stopRecording = () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);

    };

  return (
    <div className='flex h-dvh flex-col'>
      <div className='flex w-full flex-row border-b px-5 py-4'>
        <button onClick={() => navigate(-1)}>
          <img className="cursor-pointer" src={leftChevronIcon} alt='back icon' />
        </button>
        <h1 className='mx-auto text-lg font-semibold'>음성으로 이해하기</h1>
      </div>
      <div className='flex grow flex-col gap-3 overflow-y-auto p-4'>
        <ChatbotMessage key={0} text={firstMessage} />
        {messageList.map((msg) =>
          msg.isBot ? (
            <ChatbotMessage key={msg.content} text={msg.content} />
          ) : (
            <UserMessage key={msg.audio} audio={msg.audio} />
          )
        )}
        {(sendIsPending) && (
          <ChatbotMessage key={-1} text={'...'} />
        )}
      </div>
      <div className='flex flex-row border-y p-3 bg-gray-200 rounded-3xl'>

        <div className='grid justify-items-center w-full space-y-3 bg-gray-200 rounded-3xl'>
                <div>
                    <h3 className='font-semibold mt-2'>어르신 목소리를 들려주세요</h3>
                </div>
                <div className='gird justify-center content-center space-x-4 space-y-3'>
                    {audioUrl && (
                        <audio className='w-[341px] bg-white rounded-lg p-2 [&::-webkit-media-controls-panel]:bg-white ' controls src={audioUrl} />
                    )}
                    {audioUrl&&(
                            <button onClick={() => {setAudioUrl(null);}}>
                                <div className='border-3 font-semibold text-gray-500'>
                                    다시 녹음해보기  
                                </div>
                            </button> 
                        )}
                    <button onClick={isRecording ? stopRecording : startRecording}>
                    {isRecording ? 
                    <div>
                        <h3 className='font-semibold mb-3'>녹음중...</h3>
                        <div className='w-[69px] h-[69px] border-2 bg-gray-300 rounded-full grid justify-center content-center'>
                            <div className='w-[35px] h-[35px] rounded-sm bg-blue'></div>
                        </div>

                    </div>
                    : 
                    <div className=' flex space-x-8'>
                        <div className='w-[69px] h-[69px] border-2 bg-gray-300 rounded-full grid justify-center content-center'>
                            <div className='w-[49px] h-[49px] rounded-full bg-red'></div>
                        </div>
                    </div>
                    }
                    </button>
                    {audioUrl&&(
                        <button onClick={() => handleSendMessage({audioUrl})}>
                            <div className='font-semibold text-gray-500'>
                                챗봇에게 보내기
                            </div>
                        </button> 
                    )}

                </div>
        </div>
      </div>
      
    </div>
  );
};

export default ChatVoice;