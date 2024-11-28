import React, { useState, useEffect, FC } from "react";
import { Page, Box, Text, Input, Select, Checkbox, Button, Radio } from "zmp-ui";
import { GSParentInfo } from "types";
import { parentApi, locationApi } from "api/location";
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    <Page className="p-6 bg-cover bg-[url('https://i.pinimg.com/736x/84/ec/db/84ecdb6ff0b560c9621f491adf58067e.jpg')]" hideScrollbar>
      <div className="rounded-[8px] bg-[rgba(255,255,255,0.8)] p-4">
      <form onSubmit={handleSubmit}>
        <Box>
          <Box mt={6}>
            <Text.Title size="small">Thông tin liên hệ</Text.Title>
          </Box>

          <Box>
          <Input
            type="text"
            name="NameParent"
            label="Tên của bạn"
            placeholder="Nhập tên"
            value={formData.NameParent}
            onChange={handleChange}
          />
          </Box>

          <Box>
            <Input
              type="text"
              name="PhoneEmail"
              label="SĐT của bạn"
              placeholder="Nhập số điện thoại"
              value={formData.PhoneEmail}
              onChange={handleChange}
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
              name="AddressParent"
              label="Địa chỉ cụ thể"
              placeholder="Nhập địa chỉ cụ thể"
              value={formData.AddressParent}
              onChange={handleChange}
            />
          </Box>
        </Box>

        <Box>
          <Box mt={6}>
            <Text.Title size="small">Thông tin lớp học</Text.Title>
          </Box>

          <Box>
            <Text className="text-black col-span-3">Kiến thức/Kỹ năng:</Text>
            <Radio.Group 
              value={formData.Subjects}
              onChange={handleRadioChange("Subjects")}
              className="grid grid-cols-3 gap-4"
            >
              {["Toán học", "Vật lý", "Hóa học", "Tin học", "Sinh học", "Ngoại ngữ", "Ngữ văn", "Giá tư duy Bách khoa", "Kĩ năng mềm", "STEM", "Tin học văn phòng", "Các môn tiểu học"].map((subject) => (
                <Radio
                  key={subject}
                  label={subject}
                  value={subject}
                  className="col-span-1"
                />
              ))}
            </Radio.Group>
          </Box>

          <Box className="flex flex-row">
            <Box className="flex-1 pr-2">
              <Text>Cấp học:</Text>
              <Radio.Group
                value={formData.Level}
                onChange={handleRadioChange('Level')}
                className="grid grid-cols-4"
              >
                {["Tiểu học", "THCS", "THPT", "Đại học"].map((level) => (
                  <Radio
                    key={level}
                    label={level}
                    value={level}
                  />
                ))}
              </Radio.Group>
            </Box>

            <Box className="flex-1 pl-2">
              <Text>Lớp học:</Text>
              {formData.Level ? (
                <Radio.Group
                  value={formData.ValueClass}
                  onChange={handleRadioChange('ValueClass')}
                  className="grid grid-cols-4"
                >
                  {levelToClasses[formData.Level]?.map((classValue) => (
                    <Radio
                      key={classValue}
                      label={classValue}
                      value={classValue}
                    />
                  ))}
                </Radio.Group>
              ) : (
                <Text className="text-gray-400">Vui lòng chọn cấp học trước</Text>
              )}
            </Box>
          </Box>

          <Box>
            <Text>Mục tiêu:</Text>
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
            <Input
              type="text"
              name="InfoMore"
              label="Thông tin thêm về người học"
              placeholder="Nhập thông tin thêm"
              value={formData.InfoMore}
              onChange={handleChange}
            />
          </Box>

          <Box>
            <Text>Hình thức dạy:</Text>
            <Radio.Group
              value={formData.FormTeach}  
              onChange={handleRadioChange("FormTeach")}
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
            <Text>Số lượng học sinh:</Text>
            <Radio.Group
              value={formData.QuantityStudent}
              onChange={handleRadioChange("QuantityStudent")}
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
            <Text>Giới tính gia sư:</Text>
            <Radio.Group
              value={formData.SexTeacher}
              onChange={handleRadioChange("SexTeacher")}              
            >
              {["Nam", "Nữ", "Không yêu cầu về giới tính"].map((sex) => (
                <Radio
                  key={sex}
                  label={sex}
                  value={sex}
                />
              ))}
            </Radio.Group>
          </Box>

          <Box>
          <Text>Lịch có thể học:</Text>
          <div className="space-y-4">
            {(["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 7", "Chủ nhật"] as DayOfWeek[]).map((day) => (
              <Box key={day}>
                <Text>{day}:</Text>
                <div className="flex flex-wrap gap-4">
                  {(["Buổi sáng", "Buổi chiều", "Buổi tối"] as TimeSlot[]).map((time) => (
                    <Checkbox
                      key={`${day}-${time}`}
                      label={time}
                      value={`${time} ${day}`}
                      checked={formData.TimeSupport.split('; ').includes(`${time} ${day}`)}
                      onChange={(e) => handleTimeChange(day, time, e.target.checked)}
                    />
                  ))}
                </div>
              </Box>
            ))}
          </div>
          </Box>

          <Box mt={6}>
            <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Đang gửi..." : "Gửi thông tin"}
            </Button>
          </Box>
        </Box>
      </form>
      </div>
    </Page>
  );
};

export default FormParrent;