import React, { FC } from 'react';
import {  useRecoilValue } from 'recoil';
import { Box, Header, Page } from 'zmp-ui';
import { tutorsState } from 'state';
import { GSStudentInfo } from 'types';
import TransitionLink from 'components/transition-link';

export const TutorItem: FC<{ student: GSStudentInfo}> = ({ student }) => {
  return (
    <TransitionLink
      className="flex flex-col cursor-pointer group bg-white p-4 rounded-lg shadow-md"
      to={`/tutor/${student.StudentID}`} // Link to the tutor's detail page
    >
      <div className="text-lg font-semibold mb-2">
        {student.StudentName} {/* Display the tutor's name */}
      </div>
      <div className="text-sm text-gray-600 mb-1">
        Giới tính: {student.SexStudent} {/* Display the tutor's gender */}
      </div>
      <div className="text-sm text-gray-600 mb-1">
        Trường: {student.SelectSchool} {/* Display the tutor's school */}
      </div>
      <div className="text-sm text-gray-600 mb-1">
        Môn học: {student.Subjects} {/* Display the subjects the tutor teaches */}
      </div>
      <div className="text-sm text-gray-600 mb-1">
        Hình thức dạy: {student.FormTeach} {/* Display the teaching method */}
      </div>
      <div className="text-sm text-gray-600 mb-1">
        Địa chỉ: {student.Address} {/* Display the tutor's address */}
      </div>
      <div className="text-sm text-gray-600 mb-1">
        Kinh nghiệm: {student.Experience} {/* Display the tutor's experience */}
      </div>
      <div className="text-sm text-gray-600">
        Thành tích: {student.Achivement} {/* Display the tutor's achievements */}
      </div>
    </TransitionLink>
  );
}

export const TutorGrid: FC = () => {
  const tutors = useRecoilValue(tutorsState); // Get the tutors data from the Reco

  return(
    <Box className="grid grid-cols-1 px-4 py-2 gap-4">
      {tutors.map((student) => (
        <TutorItem key={student.StudentID} student={student} />
      ))}
    </Box>
  )
}

export const TutorListPage: FC = () => {
  return (
    <Page>
      <Header title='Danh sách gia sư' showBackIcon={false}/>
      <TutorGrid/>
    </Page>  
  );
}