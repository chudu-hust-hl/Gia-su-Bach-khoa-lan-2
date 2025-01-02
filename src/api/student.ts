import { GSStudentInfo, GSStudentBasicInfo } from "types";
import { request } from "utils/request";

export const studentApi = {
  getStudentReqList: async (PageNumber: number, RowsPage: number, Search: string) => {
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
            StudentList: Array<GSStudentInfo>;
        }>("GSStudent/GetStudentReqList", {
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

  // getStudentExcelList: async (PageNumber: number, RowsPage: number, Search: string) => {
  //   const requestBody = {
  //       PageNumber: PageNumber,
  //       RowsPage: RowsPage,
  //       Search: Search,
  //   };
    
  //   try {
  //       const result = await request<{
  //           RespCode: number;
  //           RespText: string;
  //           TotalRows: number;
  //           StudentList: Array<GSStudentInfo>;
  //       }>("GSStudent/GetStudentReqList", {
  //           method: "POST", 
  //           headers: {
  //               "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify(requestBody),
  //       });

  //       return result;
  //   } catch (error) {
  //       console.error("Error fetching class list:", error);
  //       throw error;
  //   }
  // },

  
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
            StudentInfo: GSStudentBasicInfo;
        }>("GSStudent/GetStudentBasicInfo", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        return result;
    } catch (error) {
        console.error("Error fetching student basic info:", error);
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




  

  