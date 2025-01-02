import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { Box, Header, Page } from 'zmp-ui';
import { tutorsState } from 'state';
import { GSStudentInfo } from 'types';
import TransitionLink from 'components/transition-link';

export const TutorItem: FC<{ student: GSStudentInfo}> = ({ student }) => {
  return (
    <TransitionLink
      className="flex flex-col cursor-pointer group bg-white p-4 rounded-lg shadow-md"
      to={`/tutor/${student.RowID}`} // Link to the tutor's detail page
    >
      <div className="text-lg font-bold mb-2 text-center border rounded-md bg-[#465888] text-white p-1">
        {student.StudentName} {/* Display the tutor's name */}
      </div>
      <hr className='my-1'/>
      <div className="text-sm text-gray-600 mb-1">
        <b>Giới tính:</b> {student.SexStudent} {/* Display the tutor's gender */}
      </div>
      <div className="text-sm text-gray-600 mb-1">
        <b>Trường:</b> {student.SelectSchool} {/* Display the tutor's school */}
      </div>
      <div className="text-sm text-gray-600 mb-1">
        <b>Môn học:</b> {student.Subjects} {/* Display the subjects the tutor teaches */}
      </div>
      <div className="text-sm text-gray-600 mb-1">
        <b>Hình thức dạy:</b> {student.FormTeach} {/* Display the teaching method */}
      </div>
      <div className="text-sm text-gray-600 mb-1">
        <b>Địa chỉ:</b> {student.Address} {/* Display the tutor's address */}
      </div>
      <div className="text-sm text-gray-600 mb-1">
        <b>Kinh nghiệm:</b> {student.Experience} {/* Display the tutor's experience */}
      </div>
      <div className="text-sm text-gray-600">
        <b>Thành tích:</b> {student.Achivement} {/* Display the tutor's achievements */}
      </div>
    </TransitionLink>
  );
}

export const TutorGrid: FC<{tutors: GSStudentInfo[]}> = ({ tutors }) => {

  return(
    <Box className="grid grid-cols-1 px-4 py-2 gap-4">
      {tutors.map((student) => (
        <TutorItem key={student.RowID} student={student} />
      ))}
    </Box>
  );
}

const TutorListPage: FC = () => {
  const tutorsList = useRecoilValue(tutorsState);

  console.log("Danh sách gia sư", tutorsList);
  return (
    <Page className='bg-gradient-to-b from-[#bbc7ff] to-[#2F529B]'>
      <Header title='Danh sách gia sư' showBackIcon={false}/>
      <TutorGrid tutors={tutorsList}/>
    </Page>  
  );
}

export default TutorListPage;