import React, { useState, useEffect, FC } from "react";
import { Page, Box, Text, Input, Select, Checkbox, Button, Radio, Header } from "zmp-ui";
import { GSParentInfo } from "types";
import { locationApi } from "api/location";
import { parentApi } from "api/parrent";
import {toast} from "react-hot-toast";

const { Option } = Select;

const FormParrent: FC = () => {
  // State to hold form data
  const [formData, setFormData] = useState<GSParentInfo>({
    NameParent: "",
    PhoneEmail: "",
    City: "Thành phố Hà Nội",
    District: "",
    Ward: "",
    AddressParent: "",
    Subjects: "",
    Level: "",
    ValueClass: "",
    NameSupports: "",
    InfoMore: "",
    FormTeach: "",
    QuantityStudent: "",
    SexTeacher: "",
    TimeSupport: "",
    Apply: [],
    Teaching: [],
    Done: [],
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

  const handleSelectChange = (name: keyof GSParentInfo) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (name: keyof GSParentInfo, value: string) => {
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

  const handleRadioChange = (name: keyof GSParentInfo) => (value: string) => {
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

  

  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    // Basic validation
    if (!formData.NameParent || !formData.PhoneEmail) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc!");
      setIsSubmitting(false);
      return;
    }
  
    // Phone number validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.PhoneEmail)) {
      toast.error("Số điện thoại không hợp lệ!");
      setIsSubmitting(false);
      return;
    }

    const parentInfo: GSParentInfo = {
      NameParent: formData.NameParent || "",
      PhoneEmail: formData.PhoneEmail || "",
      City: formData.City || "Thành phố Hà Nội",
      District: formData.District || "",
      Ward: formData.Ward || "",
      AddressParent: formData.AddressParent || "",
      Subjects: formData.Subjects || "",
      Level: formData.Level || "",
      ValueClass: formData.ValueClass || "",
      NameSupports: formData.NameSupports || "",
      InfoMore: formData.InfoMore || "",
      FormTeach: formData.FormTeach || "",
      QuantityStudent: formData.QuantityStudent || "",
      SexTeacher: formData.SexTeacher || "",
      TimeSupport: formData.TimeSupport || "",
      Apply: [],
      Teaching: [],
      Done: [],
    };
  
    // Create the request body
    const requestBody = {
      ParentInfo: parentInfo
    };
      
    try {
      console.log("Sending data:", requestBody); // Log the data being sent
      
      const result = await parentApi.createParentInfo(requestBody);
  
      console.log("API Response:", result);
  
      if (result.RespCode === 0) {
        toast.success("Đã gửi thông tin thành công!");
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
    <Page className="p-4 bg-cover bg-[#050C33]" hideScrollbar>
      <div className="rounded-[8px] bg-[rgba(255,255,255,0.6)] p-3 text-[#050C33]">
      <form onSubmit={handleSubmit}>
      <Box className="border border-[#050C33] p-2 rounded-lg mb-1">
  <Box mt={6}>
    <Text.Title className="font-bold pb-1">Thông tin liên hệ</Text.Title>
  </Box>
  <hr />
  <Box>
    <span>Tên của bạn:</span>
    <Input
      type="text"
      name="NameParent"
      placeholder="Nhập tên"
      value={formData.NameParent}
      onChange={handleChange}
      className="input-field"
    />
  </Box>

  <Box>
    <span>SĐT của bạn:</span>
    <Input
      type="text"
      name="PhoneEmail"
      placeholder="Nhập số điện thoại"
      value={formData.PhoneEmail}
      onChange={handleChange}
      className="input-field"
    />
  </Box>

  <Box>
    <span>Tỉnh/Thành phố:</span>
    <Select
      name="City"
      placeholder="Chọn tỉnh/thành phố"
      value={formData.City}
      onChange={handleCityChange}
      defaultValue={"Thành phố Hà Nội"}
      className="input-field"
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
    <span>Quận/Huyện:</span>
    <Select
      name="District"
      placeholder="Chọn quận/huyện"
      value={formData.District}
      onChange={handleDistrictChange}
      disabled={!formData.City} // Disable if no city selected
      className="input-field"
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
    <span>Phường/Xã:</span>
    <Select
      name="Ward"
      placeholder="Chọn phường/xã"
      value={formData.Ward}
      onChange={handleWardChange}
      disabled={!formData.District} // Disable if no district selected
      className="input-field"
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
    <span className="block">Địa chỉ cụ thể:</span>
    <textarea
      rows={2}
      cols={44}
      name="AddressParent"
      placeholder="Nhập địa chỉ cụ thể"
      value={formData.AddressParent}
      onChange={handleChange}
      className="textarea-field"
    />
  </Box>
</Box>

        <Box className="border border-[#050C33] p-2 rounded-lg">
          <Box mt={6}>
            <Text.Title className="font-bold pb-1">Thông tin lớp học</Text.Title>
          </Box>
          <hr />
          <Box>
            <Text className="col-span-3 my-2">Kiến thức/Kỹ năng:</Text>
            <div className="grid grid-cols-3 gap-4">
              {["Toán học", "Vật lý", "Hóa học", "Tin học", "Sinh học", "Ngoại ngữ", "Ngữ văn", "Đánh giá tư duy", "Kĩ năng mềm", "STEM", "Tin học văn phòng", "Các môn tiểu học"].map((subject) => (
                <div
                  key={subject}
                  className={`flex items-center justify-center col-span-1 cursor-pointer rounded-md text-center text-black transition duration-300 ease-in-out h-[10vh] ${
                    formData.Subjects === subject ? "bg-[#060f44] text-white font-bold transition duration-200" : "bg-white"
                  }`}
                  onClick={() => handleRadioChange("Subjects")(subject)}
                >
                  {subject}
                </div>
              ))}
            </div>
          </Box>
          <br />
          <hr className="mb-2" />
          <Box className="block">
          <Box>
  <Text className="col-span-3 my-2 text-md font-semibold">Cấp học:</Text>
  <div className="grid grid-cols-4 gap-0">
    {["Tiểu học", "THCS", "THPT", "Đại học"].map((level) => (
      <div
        key={level}
        className={`flex items-center justify-center col-span-1 cursor-pointer rounded-none text-center  text-black transition duration-300 ease-in-out h-[5vh] ${
          formData.Level === level
            ? "bg-[#060f44] text-white font-bold"
            : "bg-white"
        }`}
        onClick={() => handleRadioChange("Level")(level)}
      >
        {level}
      </div>
    ))}
  </div>
</Box>

<Box className="block pr-2">
  <Text className="font-semibold text-md my-4">Lớp học:</Text>
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
            <Text className="my-2 font-semibold">Mục tiêu:</Text>
            <Checkbox.Group>
              {["Mục tiêu 1", "Mục tiêu 2", "Mục tiêu 3"].map((goal) => (
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
            <span className="block my-2 font-semibold">Thêm thông tin người học:</span>
            <textarea
              name="InfoMore"
              placeholder="Nhập thông tin thêm"
              value={formData.InfoMore}
              onChange={handleChange}
              rows={3}
              cols={44}
              className="textarea-field rounded-[8px] bg-white focus:bg-white"
            />
          </Box>

          <Box>
            <Text className="font-semibold my-2">Hình thức dạy:</Text>
            <Radio.Group
              value={formData.FormTeach}  
              onChange={handleRadioChange("FormTeach")}
              className="grid grid-cols-3 border p-2"
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
            <Text className="font-semibold my-2">Số lượng học sinh:</Text>
            <Radio.Group
              value={formData.QuantityStudent}
              onChange={handleRadioChange("QuantityStudent")}
              className="grid grid-cols-3 border p-2"
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
            <Text className="font-semibold my-2">Giới tính gia sư:</Text>
            <Radio.Group
              value={formData.SexTeacher}
              onChange={handleRadioChange("SexTeacher")}    
              className="grid grid-cols-3 gap-2 border px-2"          
            >
              {["Nam", "Nữ", "Không yêu cầu"].map((sex) => (
                <Radio
                  key={sex}
                  label={sex}
                  value={sex}
                />
              ))}
            </Radio.Group>
          </Box>
<hr className="mt-4" />
<Box className="py-4">
  <Text className="font-semibold text-xl mb-4">Lịch có thể học:</Text>
  <div className="space-y-6">
    {(["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 7", "Chủ nhật"] as DayOfWeek[]).map((day) => (
      <Box key={day} className="bg-white p-3 rounded-lg shadow-md">
        <Text className="font-medium text-lg mb-2 text-blue-600">{day}:</Text>
        <div className="grid grid-cols-3 gap-1"> {/* Chỉnh sửa tại đây */}
          {(["Buổi sáng", "Buổi chiều", "Buổi tối"] as TimeSlot[]).map((time) => (
            <div
              key={`${day}-${time}`}
              onClick={() => handleTimeChange(day, time, !formData.TimeSupport.split('; ').includes(`${time} ${day}`))}
              className={`flex items-center gap-2 px-2 py-3 rounded-lg cursor-pointer transition duration-200 ease-in-out ${
                formData.TimeSupport.split('; ').includes(`${time} ${day}`)
                  ? "bg-[rgb(5,12,51)] text-white"
                  : "bg-gray-100 text-gray-700"
              } hover:bg-[rgb(5,12,51,0.5)] hover:text-white`}
            >
              {/* Biểu tượng hoặc icon thay cho checkbox */}
              <i className={`fa ${formData.TimeSupport.split('; ').includes(`${time} ${day}`) ? "fa-check-circle" : "fa-circle"} text-xl`}></i>
              <span>{time}</span>
            </div>
          ))}
        </div>
      </Box>
    ))}
  </div>
</Box>



          <Box mt={6}>
            <div className="flex justify-center items-center">
              <Button className="!bg-[#FFB600]" variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
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