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

    getStudentInfo: async (UserID: string, Token: string, StudentID: string) => {
      const requestBody = {
          UserID: UserID,
          Token: Token,
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
          console.error("Error fetching class list:", error);
          throw error;
      }
  }
  };




  

  