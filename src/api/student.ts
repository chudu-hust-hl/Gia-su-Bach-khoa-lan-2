import { GSStudentInfo } from "types";
import { request } from "utils/request";

export const studentApi = {
    createStudentInfo: async (studentInfo: { StudentInfo: GSStudentInfo }) => {
      try {
        const result = await request<{ RespCode: number; RespText: string }>("GSStudent/GSCreateStudent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(studentInfo),
        });
  
        return result;
      } catch (error) {
        console.error("Error creating student info:", error);
        throw error;
      }
    },

    getStudentInfo: async (StudentID: string) => {
      const requestBody = {
          StudentID: StudentID,
      };
      
      try {
          const result = await request<{
              RespCode: number;
              RespText: string;
              TotalRows: number;
              StudentInfo: GSStudentInfo;
          }>("GSClass/GetClassList", {
              method: "POST", 
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(requestBody),
          });

          return result;
      } catch (error) {
          console.error("Error fetching student info:", error);
          throw error;
      }
    },

    studentApplyClass: async (StudentID: string, ClassID: string) => {
      const requestBody = {
          StudentID: StudentID,
          ClassID: ClassID,
      };
      
      try {
          const result = await request<{
              RespCode: number;
              RespText: string;
          }>("GSStudent/StudentApplyClass", {
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
    }

  };




  

  