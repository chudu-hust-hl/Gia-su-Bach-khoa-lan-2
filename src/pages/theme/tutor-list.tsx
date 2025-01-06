import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { Box, Header, Page } from 'zmp-ui';
import { excelTutorsState } from 'state';
import { TutorGrid } from 'components/tutor-grid';


const TutorListPage: FC = () => {
  const tutorsList = useRecoilValue(excelTutorsState); //Use the list of excel students whose status is 3 
  const filteredTutors = tutorsList;

  console.log("Danh sách gia sư", tutorsList);
  return (
    <Page className='bg-gradient-to-b from-[#bbc7ff] to-[#2F529B]'>
      <Header title='Danh sách gia sư' showBackIcon={false}/>
      <TutorGrid tutors={filteredTutors}/>
    </Page>  
  );
}

export default TutorListPage;