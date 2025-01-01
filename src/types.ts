import { ReactNode } from "react";
  
  export interface UserCurrentType{
    userCurrentType: 0 | 1 | null; // Allowing only 0, 1, or null
    userStudentID?: string;
    userParrentID?: string;
  }
  
  export interface GSParentInfo{
    NameParent: string;
    PhoneEmail: string;
    City: string;
    District: string;
    Ward: string;
    AddressParent: string;
    Subjects: string;
    Level: string;
    ValueClass: string;
    NameSupports: string;
    InfoMore: string;
    FormTeach: string;
    QuantityStudent: string;
    SexTeacher: string;
    TimeSupport: string;
    Apply: string[];
    Teaching: string[];
    Done: string[];
  }
  
  export interface GSParentReqInfo{
    ParentID: string;
    NameParent: string;
    PhoneParent: string;
    AddressParent: string;
    FormTeach: string;
    InfoMore: string;
    Level: string;
    NeedMore: string;
    SexTeacher: string;
    QuantityStudent: string;
    SelectSchool: string;
    ValueClass: string;
    NameSupports: string;
    Subjects: string;
    TimeSupport: string;
    City: string;
    District: string;
    Ward: string;
  }

  export interface GSStudentInfo{
    StudentID: string;
    StudentName: string;
    Phone: string;
    SexStudent: string;
    SelectSchool: string;
    InfoMore: string;
    City: string;
    District: string;
    Ward: string;
    Address: string;
    Subjects: string;
    FormTeach: string;
    TimeSupport: string;
    Experience: string;
    Achivement: string;
    Apply: string[];
    Teaching: string[];
    Done: string[];
  }

  export interface GSStudentInfo{
    StudentID: string;
    StudentName: string;
    Phone: string;
    Address: string;
    FormTeach: string;
    InfoMore: string;
    SexStudent: string;
    SelectSchool: string;
    City: string;
    District: string;
    Ward: string;
    Subjects: string;
    TimeSupport: string;
    Experience: string;
    Achivement: string;
    Apply: string[];
    Teaching: string[];
    Done: string[];
  }
  
  export interface GSClass {
    ClassID: string;
    ReqParentID: string;
    NameParent: string;
    PhoneParent: string;
    AddressParent: string;
    StudentID: string;
    StudentName: string;
    PhoneStudent: string; //Phone number of teacher
    FormTeach: string;
    InfoMore?: string;
    Level: string;
    ValueClass: string; 
    NameSupports: string;
    Subjects: string;
    Money: string;
    MoneyStatus: string;
    Apply: string;
    NumberApply: number;
    City: string;
    District: string;
    Ward: string;
  }
  
  export interface GSLesson {
    ClassID: string;
    LessonID: string;
    Date: string;
    Status: string;
    Comment: string;
  }
  
  export interface Category {
    id: number;
    name: string;
    image: string;
  }
  
  export interface Subject {
    id: number;
    name: string;
    image: string;
  }
  
  export interface Detail {
    title: string;
    content: string;
  }
  export type Size = string;
  
  export interface Color {
    name: string;
    hex: string;
  }
  
  export type SelectedOptions = {
    size?: Size;
    color?: Color["name"];
  };
  

  export interface MenuItem {
    label: string;
    icon: ReactNode;
    activeIcon?: ReactNode;
  }
  