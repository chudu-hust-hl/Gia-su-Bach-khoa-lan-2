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
    }
  };
  