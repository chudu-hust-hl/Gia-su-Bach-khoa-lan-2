import { GSClass } from "types";
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
    }
};


  

  