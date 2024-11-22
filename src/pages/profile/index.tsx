import { userState } from 'state';
import React, { FC, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from "react-router-dom";
import { Page, Button, Box } from 'zmp-ui';


interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeedbackModal: FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [feedback, setFeedback] = useState('');
  //const successFeedback = useSuccessFeedback();

  const handleSend = () => {
      // Handle sending feedback (e.g., send to an API or log it)
      console.log(feedback);
      //successFeedback();
      onClose(); // Close the modal after sending feedback
  };

  if (!isOpen) return null; // Don't render anything if not open

  return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white p-4 rounded-lg shadow-md w-3/5">
              <h2 className="text-lg mb-2">Đóng góp ý kiến</h2>
              <textarea
                  className="w-full h-24 border p-2"
                  placeholder="Nhập ý kiến của bạn..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
              />
              <div className="flex justify-end space-x-2 mt-4">
                  <Button onClick={onClose} className="bg-gray-300">
                      Đóng
                  </Button>
                  <Button onClick={handleSend} className="bg-blue text-white">
                      Gửi
                  </Button>
              </div>
          </div>
      </div>
  );
}

export const UserInfoBox: FC = () => {
  const user = useRecoilValue(userState);

  return (
    <Box className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
      {user.avatar && (
        <img src={user.avatar} alt="User  Avatar" className="w-16 h-16 rounded-full" />
      )}
      <div>
        <h2 className="text-lg font-semibold">{user.idByOA}</h2>
        {/*<p className="text-sm text-gray-600">
          {user.Type === 0 ? 'Bạn đang dùng giao diện cho phụ huynh/người học' : 'Bạn đang dùng giao diện cho sinh viên/gia sư'}
        </p>*/}
      </div>
    </Box>
  );
};

export const ActionButtons: FC = () => {
	const navigate = useNavigate();
	const [isModalOpen, setModalOpen] = useState(false);

	const handleChangeType = () => {
		navigate('/start');
	};

	const handleFeedback = () => {
		setModalOpen(true); // Open the feedback modal
	};

	const handleChat = () => {
		// Function to chat with the project
	};

	return (
		<Box className="bg-white p-4 rounded-lg shadow-md space-y-2">
			<Button onClick={handleChangeType} className="w-full">
				Đổi giao diện
			</Button>
			<Button onClick={handleFeedback} className="w-full">
				Đóng góp ý kiến, phản hồi
			</Button>
			<Button onClick={handleChangeType} className="w-full">
				Chat với Dự án
			</Button>
      <FeedbackModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
		</Box>
	);
}

export const PolicyButtons: FC = () => {
  const navigate=useNavigate();

  const handleContact = () => {
      navigate("/app-info")
    };
  
    const handleTerms = () => {
      navigate("/app-standards")
    };

  return (
      <Box className="bg-white p-4 rounded-lg shadow-md space-y-2">
        <Button onClick={handleContact} className="w-full">
          Liên hệ
        </Button>
        <Button onClick={handleTerms} className="w-full">
          Điều khoản
        </Button>
      </Box>
    );
}

const ProfilePage: React.FunctionComponent=() => {

  return (
    <Page>
      <UserInfoBox/>
      <ActionButtons />
      <PolicyButtons />
    </Page>
  );
}
export default ProfilePage;
