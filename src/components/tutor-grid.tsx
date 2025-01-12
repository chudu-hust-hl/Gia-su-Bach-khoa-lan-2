import { GSStudentInfo } from "types";
import React ,{ FC} from "react";
import { Box } from "zmp-ui";
import TransitionLink from "./transition-link";

export const TutorItem: FC<{ student: GSStudentInfo}> = ({ student }) => {
    return (
      <TransitionLink
        className="flex flex-col cursor-pointer group bg-white p-4 rounded-lg shadow-md"
        to={`/tutor/${student.StudentID}`} // Link to the tutor's detail page
      >
        <div className="text-lg font-bold mb-2 text-center border rounded-md bg-[#AD493A] text-white p-1">
          {student.StudentName} {/* Display the tutor's name */}
        </div>
        <hr className='my-1'/>
        <div className="text-sm text-gray-600 mb-1">
          <b>Giới tính:</b> {student.SexStudent} {/* Display the tutor's gender */}
        </div>
        <div className="text-sm text-gray-600 mb-1">
          <b>Môn học:</b> {student.Subjects} {/* Display the subjects the tutor teaches */}
        </div>
        <div className="text-sm text-gray-600 mb-1">
          <b>Kinh nghiệm:</b> {student.Experience} {/* Display the tutor's experience */}
        </div>
        <div className="text-sm text-gray-600">
          <b>Thành tích:</b> {student.Achievement} {/* Display the tutor's achievements */}
        </div>
      </TransitionLink>
    );
  }
  
  export const TutorGrid: FC<{tutors: GSStudentInfo[]}> = ({ tutors }) => {
  
    return(
      <Box className="grid grid-cols-1 px-4 py-2 gap-4">
        {tutors.map((propStudent) => (
          <TutorItem key={propStudent.ReqStudentID} student={propStudent} />
        ))}
      </Box>
    );
  }