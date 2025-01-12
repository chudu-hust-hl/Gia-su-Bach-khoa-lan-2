import React, { FC, startTransition  } from 'react';
import { useRecoilValue } from 'recoil';
import { Box, Header, Page } from 'zmp-ui';
import { excelTutorsState, loadingState } from 'state';
import { TutorGrid } from 'components/tutor-grid';


const TutorListPage: FC = () => {
  const tutorsList = useRecoilValue(excelTutorsState); //Use the list of excel students whose status is 3 
  const filteredTutors = tutorsList;


  return (
    <Page className='bg-gradient-to-b from-[#bbc7ff] to-[#2F529B]'>
      <Header title='Danh sách gia sư' showBackIcon={false}/>
      <TutorGrid tutors={filteredTutors}/>
    </Page>  
  );
}

export default TutorListPage;