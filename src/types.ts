import { ReactNode } from "react";
  
  export interface UserCurrentType{
    userCurrentType: 0 | 1 | null; // Allowing only 0, 1, or null
    userStudentID?: string;
    userParrentID?: string;
  }

  export interface GSZaloUserInfo{
    PhoneNumber: string;
    Name: string;
    StudentID: string;
  }
  
  export interface GSParentBasicInfo{
    ParentID: string;
    NameParent: string;
    PhoneParent: string;
    Address: string;
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
    ReqStudentID: string;
    StudentID: string;
    StudentName: string;
    Phone: string;
    Address: string;
    FormTeach: string;
    InfoMore: string;
    SexStudent: string;
    SelectSchool: string;
    NameSupports: string;
    Subjects: string;
    TimeSupport: string;
    City: string;
    District: string;
    Ward: string;
    Experience: string;
    Achievement: string;
  }

  export interface GSStudentBasicInfo{
    StudentID: string;
    StudentName: string;
    Phone: string;
    Address: string;
    FormTeach: string;
    InfoMore: string;
    SexStudent: string;
    Subjects: string;
    TimeSupport: string;
    City: string;
    District: string;
    Ward: string;
    Experience: string;
    Achievement: string;
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
    ParentCmt: string;
    StudentCmt: string;
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
  