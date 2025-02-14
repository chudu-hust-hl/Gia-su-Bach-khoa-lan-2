import React, { useState, useEffect, FC } from "react";
import { Page, Box, Text, Input, Select, Checkbox, Button, Radio, Header } from "zmp-ui";
import { GSParentReqInfo } from "types";
import { locationApi } from "api/location";
import { parentApi } from "api/parrent";
import {toast} from "react-hot-toast";
import { getConfig } from 'utils/config';
import logo from "static/logo.png";
import { useNavigate } from 'react-router'; // Import useNavigate
import { GSZaloUserInfo } from "types";
import { authApi } from "api/auth";
import { setUserZaloID, setToken, setStudentID, setPhoneNum, getPhoneNum, getStudentID, getUserZaloID, getToken, getAvatar, getName, removeUserZaloID, removeToken } from "utils/auth";


const { Option } = Select;

const FormParrent: FC = () => {
  const [formData, setFormData] = useState<GSParentReqInfo>({
    ParentID: "", 
    NameParent: "",
    PhoneParent: getPhoneNum() || "",
    AddressParent: "",
    FormTeach: "",
    InfoMore: "",
    Level: "",
    NeedMore: "",
    SexTeacher: "",
    QuantityStudent: "",
    SelectSchool: "",
    ValueClass: "",
    NameSupports: "",
    Subjects: "",
    TimeSupport: "",
    City: "Thành phố Hà Nội",
    District: "",
    Ward: "",
  });

  const levelToClasses: Record<string, string[]> = {
    "Tiểu học": ["Lớp 1", "Lớp 2", "Lớp 3", "Lớp 4", "Lớp 5"],
    "THCS": ["Lớp 6", "Lớp 7", "Lớp 8", "Lớp 9"],
    "THPT": ["Lớp 10", "Lớp 11", "Lớp 12"],
    "Đại học": ["Năm nhất", "Năm hai", "Năm ba"],
  };

  const [cities, setCities] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [communes, setCommunes] = useState<string[]>([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const fetchedCities = await locationApi.getCities();
        setCities(fetchedCities);
      } catch (error) {
        toast.error("Không thể tải danh sách tỉnh/thành phố");
      }
    };

    const fetchDistrictsForHanoi = async () => {
      try {
        const fetchedDistricts = await locationApi.getDistricts("Thành phố Hà Nội");
        setDistricts(fetchedDistricts);
      } catch (error) {
        toast.error("Không thể tải danh sách quận/huyện");
      }
    };

    fetchCities();
    fetchDistrictsForHanoi();
  }, []);

  const handleCityChange = async (city: string) => {
    setFormData(prev => ({
      ...prev,
      City: city,
      District: "",
      Ward: ""
    }));

    try {
      const fetchedDistricts = await locationApi.getDistricts(city);
      setDistricts(fetchedDistricts);
      setCommunes([]);
    } catch (error) {
      toast.error("Không thể tải danh sách quận/huyện");
    }
  };

  const handleDistrictChange = async (district: string) => {
    setFormData(prev => ({
      ...prev,
      District: district,
      Ward: ""
    }));
    console.log("Lay dc city")
    try {
      const fetchedCommunes = await locationApi.getCommunes(formData.City, district);
      console.log("Fetched Communes:", fetchedCommunes);
      setCommunes(fetchedCommunes);
    } catch (error) {
      toast.error("Không thể tải danh sách phường/xã");
    }
  };

  const handleWardChange = (ward: string) => {
    setFormData(prev => ({
      ...prev,
      Ward: ward
    }));
  };


  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: keyof GSParentReqInfo) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (name: keyof GSParentReqInfo, value: string) => {
    setFormData((prevData) => {
      const currentValues = prevData[name] as string;
      const valuesArray = currentValues ? currentValues.split(', ') : [];
      
      let newValuesArray;
      if (valuesArray.includes(value)) {
        newValuesArray = valuesArray.filter((item) => item !== value);
      } else {
        newValuesArray = [...valuesArray, value];
      }
      
      return {
        ...prevData,
        [name]: newValuesArray.join(', ')
      };
    });
  };

  const handleRadioChange = (name: keyof GSParentReqInfo) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  type TimeSlot = "Buổi sáng" | "Buổi chiều" | "Buổi tối";
  type DayOfWeek = "Thứ 2" | "Thứ 3" | "Thứ 4" | "Thứ 5" | "Thứ 7" | "Chủ nhật";  
  const handleTimeChange = (day: DayOfWeek, time: TimeSlot, checked: boolean) => {
    const timeString = `${time} ${day}`;
    setFormData(prev => {
      // Convert current string to array
      const currentTimeSupport = prev.TimeSupport ? prev.TimeSupport.split('; ') : [];
      
      let newTimeSupport: string[];
      if (checked) {
        // Add the time string if it's not already included
        newTimeSupport = [...currentTimeSupport, timeString];
      } else {
        // Remove the time string if unchecked
        newTimeSupport = currentTimeSupport.filter(t => t !== timeString);
      }
      
      // Join array back to string
      return { 
        ...prev, 
        TimeSupport: newTimeSupport.join('; ')
      };
    });
  };

  const generateRandomDigits = () => {
    return Math.floor(10000 + Math.random() * 90000).toString(); // Generates a 5-digit number
  };
  

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    // Basic validation
    if (!formData.NameParent || !formData.PhoneParent) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc!");
      setIsSubmitting(false);
      return;
    }
  
    // Phone number validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.PhoneParent)) {
      toast.error("Số điện thoại không hợp lệ!");
      setIsSubmitting(false);
      return;
    }


    const parentInfo: GSParentReqInfo = {
      ParentID: formData.PhoneParent,
      NameParent: formData.NameParent || "",
      PhoneParent: formData.PhoneParent || "",
      AddressParent: formData.AddressParent || "",
      FormTeach: formData.FormTeach || "",
      InfoMore: formData.InfoMore || "",
      Level: formData.Level || "",
      NeedMore: formData.NeedMore || "",
      SexTeacher: formData.SexTeacher || "",
      QuantityStudent: formData.QuantityStudent || "",
      SelectSchool: formData.SelectSchool || "",
      ValueClass: formData.ValueClass || "",
      City: formData.City || "Thành phố Hà Nội",
      District: formData.District || "",
      Ward: formData.Ward || "",
      Subjects: formData.Subjects || "",
      NameSupports: formData.NameSupports || "",
      TimeSupport: formData.TimeSupport || "",
    };

    // Create the request body
    const requestBody = {
      ParentInfo: parentInfo
    };
      
    try {
      console.log("Sending data:", requestBody); // Log the data being sent
      setPhoneNum(requestBody.ParentInfo.PhoneParent);
      const result = await parentApi.createParentInfo(parentInfo);
      // Store Zalo user info
      const userZaloID = getUserZaloID();
      const token = getToken();
      const zaloUserInfo: GSZaloUserInfo = {
        UserID: String(userZaloID),
        Token: String(token),
        Avatar: String(getAvatar()),
        Name: String(getName()),
        PhoneNumber: String(getPhoneNum()),
        StudentID: String(getStudentID()),
      };
      const storeResult = await authApi.storeZaloUserInfo(zaloUserInfo);
      console.log("Store user info result:", storeResult);
      console.log("API Response:", result);
  
      if (result.RespCode === 0) {
        toast.success("Đã gửi thông tin thành công!");
        navigate("/formSuccess");
      } else {
        toast.error("Có lỗi xảy ra");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Có lỗi xảy ra khi gửi thông tin!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Page className="p-4 bg-cover bg-[#AD493A]" hideScrollbar>
      <div className="rounded-[8px] bg-[rgba(255,255,255,0.6)] p-3 text-[#050C33]">
      <Box className="flex justify-between items-center mb-2">
        <Text.Title className="font-bold text-lg">Phiếu thông tin tìm gia sư</Text.Title>
        <img src={getConfig((c) => c.template.headerLogo) || logo} alt="Logo" className="w-10 h-10" />
      </Box>
      <form onSubmit={handleSubmit}>
      <Box className="border-[#AD493A] p-2 rounded-lg mb-1">
          <Box mt={6}>
            <Text.Title className="font-bold pb-1">Thông tin liên hệ</Text.Title>
          </Box>
          <hr />
          <Box>
            <Input
              type="text"
              name="NameParent"
              label="Tên của bạn"
              placeholder="Nhập tên"
              value={formData.NameParent}
              onChange={handleChange}
              className="input-field"
            />
          </Box>

          <Box>
            <Input
              type="text"
              name="PhoneParent"
              label="SĐT của bạn"
              placeholder="Nhập số điện thoại"
              value={formData.PhoneParent}
              onChange={handleChange}
              className="input-field"
            />
          </Box>

          <Box>
            <Select
              name="City"
              label="Tỉnh/Thành phố"
              placeholder="Chọn tỉnh/thành phố"
              value={formData.City}
              onChange={handleCityChange}
              defaultValue={"Thành phố Hà Nội"}
              className="input-field"
              closeOnSelect
            >
              {cities.map((city) => (
                <Option 
                  key={city} 
                  value={city} 
                  title={city} 
                />
              ))}
            </Select>
          </Box>

          {/* District Dropdown - Enabled only after City is selected */}
          <Box>
            <Select
              name="District"
              label="Quận/Huyện"
              placeholder="Chọn quận/huyện"
              value={formData.District}
              onChange={handleDistrictChange}
              disabled={!formData.City} // Disable if no city selected
              className="input-field"
              closeOnSelect
            >
              {districts.map((district) => (
                <Option 
                  key={district} 
                  value={district} 
                  title={district} 
                />
              ))}
            </Select>
          </Box>

          {/* Ward Dropdown - Enabled only after District is selected */}
          <Box>
            <Select
              name="Ward"
              label="Phường/Xã"
              placeholder="Chọn phường/xã"
              value={formData.Ward}
              onChange={handleWardChange}
              disabled={!formData.District} // Disable if no district selected
              className="input-field"
              closeOnSelect
            >
              {communes.map((commune) => (
                <Option 
                  key={commune} 
                  value={commune} 
                  title={commune} 
                />
              ))}
            </Select>
          </Box>

          <Box>
            <Input
              type="text"
              label="Địa chỉ cụ thể"
              name="AddressParent"
              placeholder="Nhập địa chỉ cụ thể"
              value={formData.AddressParent}
              onChange={handleChange}
              className="input-field"
            />
          </Box>
        </Box>

          <Box>
            <Box mt={6}>
              <Text.Title size="small">Thông tin lớp học</Text.Title>
            </Box>

            <Box>
              <Text className="col-span-3 my-2">Kiến thức/Kỹ năng</Text>
              <Radio.Group 
                value={formData.Subjects}
                onChange={handleRadioChange("Subjects")}
                className="grid grid-cols-3 gap-4"
              >
                {["Toán học", "Vật lý", "Hóa học", "Tin học", "Sinh học", "Ngoại ngữ", "Ngữ văn", "Đánh giá tư duy", "Kĩ năng mềm", "STEM", "Tin học văn phòng", "Các môn tiểu học"].map((subject) => (
                  <Radio
                    key={subject}
                    label={subject}
                    value={subject}
                    className="col-span-1"
                  />
                ))}
              </Radio.Group>
            </Box>
            <br />
            <hr className="mb-2" />
            <Box className="block">
            <Box>
          <Text className="col-span-3 my-2 text-md font-semibold">Cấp học</Text>
          <Box className="grid grid-cols-4 gap-0">
            {["Tiểu học", "THCS", "THPT", "Đại học"].map((level) => (
              <div
                key={level}
                className={`flex items-center justify-center col-span-1 cursor-pointer rounded-none text-center  text-black transition duration-300 ease-in-out h-[5vh] ${
                  formData.Level === level
                    ? "bg-[#AD493A] text-white font-bold"
                    : "bg-white"
                }`}
                onClick={() => handleRadioChange("Level")(level)}
              >
                {level}
              </div>
            ))}
          </Box>
        </Box>

        <Box className="block pr-2">
          <Text className="font-semibold text-md my-4">Lớp học</Text>
          {formData.Level ? (
            <Radio.Group
              value={formData.ValueClass}
              onChange={handleRadioChange('ValueClass')}
              className="flex flex-col space-y-3"
            >
              {levelToClasses[formData.Level]?.map((classValue) => (
                <Radio
                  key={classValue}
                  label={classValue}
                  value={classValue}
                  className="!w-full rounded-lg p-3 border border-gray-300 shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out"
                />
              ))}
            </Radio.Group>
          ) : (
            <Text className="text-gray-400">Vui lòng chọn cấp học trước</Text>
          )}
        </Box>
                  </Box>
        <br />
        <hr className="mb-1" />
          <Box>
            <Text className="my-2 font-semibold">Mục tiêu</Text>
            <Checkbox.Group>
              {["Thi học sinh giỏi quốc gia", "Thi học sinh giỏi tỉnh/thành phố", "Ôn thi cấp 3", "Lấy lại gốc", "Ôn chắc kiến thức", "Ôn thi đại học", "Đạt 8+ cho môn học"].map((goal) => (
                <Checkbox
                  key={goal}
                  label={goal}
                  value={goal}
                  onChange={() => handleCheckboxChange('NameSupports', goal)}
                />
              ))}
            </Checkbox.Group>
          </Box>

          <Box>
            <Input
              type="text"
              label="Thêm thông tin người học"
              name="InfoMore"
              placeholder="Nhập thông tin thêm"
              value={formData.InfoMore}
              onChange={handleChange}
              className="input-field"
            />
          </Box>

          <Box>
            <Text className="font-semibold my-2">Hình thức dạy</Text>
            <Radio.Group
              value={formData.FormTeach}  
              onChange={handleRadioChange("FormTeach")}
              className="grid grid-cols-3 p-2"
              defaultValue={"Offline"}
            >
              {["Online", "Offline", "Cả 2"].map((mode) => (
                <Radio
                  key={mode}
                  label={mode}
                  value={mode}
                />
              ))}
            </Radio.Group>
          </Box>

          <Box>
            <Text className="font-semibold my-2">Số lượng học sinh</Text>
            <Radio.Group
              value={formData.QuantityStudent}
              onChange={handleRadioChange("QuantityStudent")}
              className="grid grid-cols-3 p-2"
              defaultValue={"Học 1-1"}
            >
              {["Học 1-1", "Học nhóm"].map((quantity) => (
                <Radio
                  key={quantity}
                  label={quantity}
                  value={quantity}
                />
              ))}
            </Radio.Group>
          </Box>

          <Box>
            <Text className="font-semibold my-2">Giới tính gia sư</Text>
            <Radio.Group
              value={formData.SexTeacher}
              defaultValue={"Không yêu cầu"}
              onChange={handleRadioChange("SexTeacher")}    
              className="grid grid-cols-3 gap-2 px-2"          
            >
              {["Nam", "Nữ", "Không yêu cầu"].map((sex) => (
                <Radio
                  key={sex}
                  label={sex}
                  value={sex}
                />
              ))}
            </Radio.Group>
          <Box>
            
          <Input
            type="text"
            name="NeedMore"
            label="Yêu cầu thêm với gia sư"
            placeholder="Yêu cầu với gia sư"
            value={formData.NeedMore}
            onChange={handleChange}
            className="input-field"
          />
          </Box>

          </Box>
          <hr className="mt-4" />
          <Box className="py-4">
            <Text className="font-semibold text-xl mb-4">Lịch có thể học:</Text>
            <div className="space-y-6">
              {(["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 7", "Chủ nhật"] as DayOfWeek[]).map((day) => (
                <Box key={day} className="bg-white p-3 rounded-lg shadow-md">
                  <div className="flex items-center gap-4"> {/* Flex layout for day and time slots */}
                    <Text className="font-medium text-lg text-600 whitespace-nowrap w-20">{day}:</Text> {/* Prevent day text from wrapping */}
                    <div className="flex gap-2 flex-1"> {/* Time slots take up remaining space */}
                      {(["Buổi sáng", "Buổi chiều", "Buổi tối"] as TimeSlot[]).map((time) => (
                        <div
                          key={`${day}-${time}`}
                          onClick={() => handleTimeChange(day, time, !formData.TimeSupport.split('; ').includes(`${time} ${day}`))}
                          className={`flex-1 flex items-center justify-center gap-2 px-2 py-3 rounded-lg cursor-pointer transition duration-200 ease-in-out ${
                            formData.TimeSupport.split('; ').includes(`${time} ${day}`)
                              ? "bg-[#AD493A] text-white"
                              : "bg-gray-100 text-gray-700"
                          } `}
                        >
                          {/* Biểu tượng hoặc icon thay cho checkbox */}
                          <i className={`fa ${formData.TimeSupport.split('; ').includes(`${time} ${day}`) ? "fa-check-circle" : "fa-circle"} text-xl`}></i>
                          <span>{time}</span> {/* Text is now centered both horizontally and vertically */}
                        </div>
                      ))}
                    </div>
                  </div>
                </Box>
              ))}
            </div>
          </Box>
          <Box mt={6}>
            <div className="flex justify-center items-center">
              <Button className="!bg-[#3a65ad]" variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Đang gửi..." : "Gửi thông tin"}
              </Button>
            </div>
          </Box>
        </Box>
      </form>
      </div>
    </Page>
  );
};

export default FormParrent;