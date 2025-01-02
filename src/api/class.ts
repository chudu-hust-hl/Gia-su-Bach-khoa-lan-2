import { GSClass, GSLesson } from "types";
import { request } from "utils/request";

export const classApi = {
    getClassList: async (PageNumber: number, RowsPage: number, Search: string) => {
        const requestBody = {
            PageNumber: PageNumber,
            RowsPage: RowsPage,
            Search: Search,
        };
        
        try {
            const result = await request<{
                RespCode: number;
                RespText: string;
                TotalRows: number;
                ClassList: Array<GSClass>;
            }>("GSClass/GetClassList", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            return result;
        } catch (error) {
            console.error("Error fetching class list:", error);
            throw error;
        }
    },

    createStudentComment: async (StudentID: string, ClassID: string, StudentComment: string) => {
        const requestBody = {
            StudentID: StudentID,
            ClassID: ClassID,
            StudentComment: StudentComment,
        }
        try{
            const result = await request<{
                RespCode: number;
                RespText: string;
            }>("GSClass/CreateStudentComment", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            return result;
        }catch (error) {
            console.error("Error creating Student comment:", error);
            throw error;
        }
    },

    createParentComment: async (ParentPhone: string, ClassID: string, ParentComment: string) => {
        const requestBody = {
            ParentPhone: ParentPhone,
            ClassID: ClassID,
            ParentComment: ParentComment,
        }
        try{
            const result = await request<{
                RespCode: number;
                RespText: string;
            }>("GSClass/CreateParentComment", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            return result;
        }catch (error) {
            console.error("Error creating Parent comment:", error);
            throw error;
        }
    },

    createStudentDailyComment: async (StudentID: string, ClassID: string, Date: string, Comment: string) => {
        const requestBody = {
            StudentID: StudentID,
            ClassID: ClassID,
            Date: Date,
            Comment: Comment,
        }
        try{
            const result = await request<{
                RespCode: number;
                RespText: string;
            }>("GSClass/CreateStudentDailyComment", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            return result;
        }catch (error) {
            console.error("Error creating Student daily comment:", error);
            throw error;
        }
    },

    getStudentDailyComment: async (PhoneParent: string, Month: string, ClassID: string) => {
        const requestBody = {
            PhoneParent: PhoneParent,
            Month: Month,
            ClassID: ClassID,
        }
        try{
            const result = await request<{
                RespCode: number;
                RespText: string;
                LessonList: Array<GSLesson>;
            }>("GSClass/GetStudentDailyComment", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            return result;
        }catch (error) {
            console.error("Error getting list of student daily comments:", error);
            throw error;
        }
    },
};


  

  