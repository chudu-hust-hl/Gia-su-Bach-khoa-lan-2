import { atom, selector, selectorFamily } from "recoil";
import { getLocation, getPhoneNumber, getUserInfo, authorize } from "zmp-sdk/apis";
import { classApi } from "api/class";
import { wait } from "utils/async";
import mockClasses from "../mock/classes.json";
import mockTutors from "../mock/tutors.json";
import mockParents from "../mock/parent.json";
import { GSClass, GSLesson, GSParentInfo, GSStudentInfo, UserCurrentType } from "types";

export const userState = selector({
  key: "user",
  get: async () => {
    {/*try {
      const { userInfo } = await getUserInfo({ autoRequestPermission: true });
      return userInfo;
    } catch (error) {*/}
      return {
        id: "Zalo123456",
        avatar: "",
        token: "example-token-code",
        name: "Người dùng Zalo",
        studentID: "20231001",
        phoneNumber: "0904485061"
      };
  }
});

//Write an API to await getZaloUserInfo 



export const userCurrentState = atom<UserCurrentType>({
  key: 'userCurrentState',
  default: (() => {
    const storedUser = localStorage.getItem('userType');
    return storedUser ? JSON.parse(storedUser) as UserCurrentType : { userCurrentType: null }; // Default value
  })(),
});

export const grantAuthorization =selector({
  key: 'grantAuthorization',
  get: async () => {
    try {
      const data = await authorize({
        scopes: ["scope.userLocation", "scope.userPhonenumber"],
      });
      return data; // Return the authorization data
    } catch (error) {
      console.error("Authorization failed:", error);
      throw error; // Rethrow the error for handling in the component
    }
  },
});


export const bannersState = selector({
  key: "bannersState",
  get: async () =>{
    await wait(2000);
    const lessons = (await import("../mock/banners.json")).default;
    return lessons;
  },
});

export const tabsState = atom({
  key: "tabsState",
  default: ["Lớp đang diễn ra", "Lớp đang yêu cầu", "Lớp đã kết thúc"],
});

export const selectedTabIndexState = atom({
  key: "selectedTabIndexState",
  default: "Lớp đang diễn ra",
});



// Define classesState using atom
{/*export const classesState = selector<GSClass[]>({
  key: "classesState",
  get: async () =>{
    await wait(2000);
    const classes = (await import("../mock/classes.json")).default;
    return classes;
  },
});*/}

export const classesState = selector<GSClass[]>({
  key: "classesState",
  get: async () => {
    try {
        const result = (await classApi.getClassList(1, 20,""));
        if (result.RespCode === 0) { // Assuming 0 indicates success
            console.log("Success", result.ClassList)
            return result.ClassList; // Return the ClassList from the response
        } else {
            console.error("Error fetching class list:", result.RespText);
            return []; // Return an empty array or handle the error as needed
        }
    } catch (error) {
        console.error("Error in classesState selector:", error);
        return []; // Return an empty array or handle the error as needed
    }
},
})

export const lessonsState = selector<GSLesson[]>({
  key: "lessonsState",
  get: async () =>{
    await wait(2000);
    const lessons = (await import("../mock/lessons.json")).default;
    return lessons;
  },
});

export const tutorsState = selector<GSStudentInfo[]>({
  key: "tutorsState",
  get: () => mockTutors,
});

export const parentsState = selector<GSParentInfo[]>({
  key: "parentsState",
  get: () => mockParents,
})

export const districtsState = atom({
  key: "districtsState",
  default: [
    "Quận Hai Bà Trưng",
    "Quận Hoàng Mai",
    "Quận Đống Đa",
    "Quận Hoàn Kiếm",
    "Quận Thanh Xuân",
    "Quận Ba Đình",
    "Quận Hà Đông",
    "Quận Cầu Giấy",
    "Quận Long Biên",
    "Quận Bắc Từ Liêm",
    "Quận Nam Từ Liêm",
    "Quận Tây Hồ",
    "Khác",
  ], // Default value (list of districts)
});

export const subjectsState = atom({
  key: "subjectsState",
  default: [
    "Toán học",
    "Vật lý",
    "Hóa học",
    "Tin học",
    "Sinh học",
    "Ngoại ngữ",
    "Ngữ Văn",
    "Đánh gia tư duy Bách khoa",
    "Kĩ năng mềm",
    "STEM",
    "Tin học văn phòng",
    "Các môn tiểu học",
    ],
})

export const selectedSubjectsState = atom<number[]>({
  key: "selectedSubjectsState",
  default: [],
});

export const selectedDistrictsState = atom<string[]>({
  key: "selectedDistrictsState", 
  default: [], 
});

export const levelsState = atom<string[]>({
  key: "levelsState",  
  default: ["Tiểu học", "THCS", "THPT", "Đại học"], // Default list of levels
});

export const selectedLevelsState = atom<string[]>({
  key: "selectedLevelsState",  
  default: [], // Default value
});

export const selectedFormTeachState = atom<string[]>({
  key: "selectedFormTeachState",  
  default: [], // Default value
});

export const classState = selectorFamily<GSClass | undefined, string>({
  key: "classState",
  get: (id) => ({ get }) => {
    const classes = get(classesState); // Get the classes state
    return classes.find((classItem) => classItem.ClassID === id); // Find the class by ID
  },
});

export const lessonState = selectorFamily({
  key: "lessonState",
  get: (id: string) => ({ get }) => {
    const lessons = get(lessonsState); // Access the lessons atom
    return lessons.find((lessonItem) => lessonItem.LessonID === id) || null; // Return the matching lesson or null
  },
});

export const tutorState = selectorFamily({
  key: "tutorState",
  get: (id: string) => ({ get }) => {
    const tutors = get(tutorsState); // Access the tutors atom
    return tutors.find((tutor) => tutor.StudentID === id) || null; // Return the matching tutor or null
  },
});


export const parentState = selectorFamily({
  key: "parentState",
  get: (id: string) => ({ get }) => {
    const parents = get(parentsState); // Access the tutors atom
    return parents.find((parent) => parent.PhoneEmail  === id) || null; // Return the matching tutor or null
  },
});




























