import { userState } from 'state';
import React, { FC, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from "react-router-dom";
import { Page, Button, Box } from 'zmp-ui';

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
