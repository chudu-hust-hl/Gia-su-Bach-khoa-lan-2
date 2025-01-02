	import React, { useState, useEffect, FC } from "react";
	import { Page, Box, Text, Input, Select, Checkbox, Button, Radio, Header } from "zmp-ui";
	import { GSStudentInfo } from "types";
	import { locationApi } from "api/location";
	import { studentApi } from "api/student";
	import toast from "react-hot-toast";

	const { Option } = Select;

	const FormStudent: FC = () => {
	// State to hold form data
	const [formData, setFormData] = useState<GSStudentInfo>({
	StudentID: "",
	StudentName: "",
	Phone: "",
	SexStudent: "",
	SelectSchool: "",
	InfoMore: "",
	City: "Thành phố Hà Nội",
	District: "",
	Ward: "",
	Address: "",
	Subjects: "",
	FormTeach: "",
	TimeSupport: "",
	Experience: "",
	Achivement: "",
	Apply: [],
	Teaching: [],
	Done: [],
	});

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

	const handleSelectChange = (name: keyof GSStudentInfo) => (value: string) => {
	setFormData(prev => ({
		...prev,
		[name]: value
	}));
	};

	// Handle checkbox changes
	const handleCheckboxChange = (name: keyof GSStudentInfo, value: string) => {
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

	const handleRadioChange = (name: keyof GSStudentInfo) => (value: string) => {
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
	if (!formData.StudentName || !formData.Phone || !formData.StudentID) {
		toast.error("Vui lòng điền đầy đủ thông tin bắt buộc!");
		setIsSubmitting(false);
		return;
	}

	// Phone number validation
	const phoneRegex = /^[0-9]{10}$/;
	if (!phoneRegex.test(formData.Phone)) {
		toast.error("Số điện thoại không hợp lệ!");
		setIsSubmitting(false);
		return;
	}

	const studentInfo: GSStudentInfo = {
		StudentID: formData.StudentID || "",
		StudentName: formData.StudentName || "",
		Phone: formData.Phone || "",
		SexStudent: formData.SexStudent || "",
		SelectSchool: formData.SelectSchool || "",
		InfoMore: formData.InfoMore || "",
		City: formData.City || "Thành phố Hà Nội",
		District: formData.District || "",
		Ward: formData.Ward || "",
		Address: formData.Address || "",
		Subjects: formData.Subjects || "",
		FormTeach: formData.FormTeach || "",
		TimeSupport: formData.TimeSupport || "",
		Experience: formData.Experience || "",
		Achivement: formData.Achivement || "",
		Apply: [],
		Teaching: [],
		Done: []
	};

	// Create the request body
	const requestBody = {
		StudentInfo: studentInfo
	};
		
	try {
			console.log("Sending data:", requestBody); // Log the data being sent
			
			const result = await studentApi.createStudentInfo(requestBody);

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
		<Page className="bg-cover bg-[#A5B4FC]" hideScrollbar>
		<Header className="absolute left-0" title="Yêu cầu tìm gia sư"/>
		<div className="rounded-[8px] m-4 bg-[rgba(255,255,255,0.6)] p-3 text-[#050C33]">
		<form onSubmit={handleSubmit}>
			<Box className="border border-[#050C33] p-2 rounded-lg mb-1">
				<Box mt={6}>
					<Text.Title className="font-bold pb-1">Thông tin liên hệ</Text.Title>
				</Box>
				<hr />
				<Box>
					<span className="font-semibold my-2">Tên sinh viên:</span>
					<Input
					  type="text"
					  name="NameParent"
					  placeholder="Nhập tên"
					  value={formData.StudentName}
					  onChange={handleChange}
					  className="input-field"
					/>
				</Box>

				<Box>
					<span className="font-semibold my-2">SĐT của bạn:</span>
					<Input
					  type="text"
					  name="PhoneEmail"
					  placeholder="Nhập số điện thoại"
					  value={formData.Phone}
					  onChange={handleChange}
					  className="input-field"
					/>
				</Box>

				<Box>
				<Text className="font-semibold my-2">Giới tính của bạn:</Text>
            <Radio.Group
              value={formData.SexStudent}
              onChange={handleRadioChange("SexStudent")}
			  className="grid grid-cols-3 gap-2 border p-2"
            >
              {["Nam", "Nữ"].map((sexStudent) => (
                <Radio
                  key={sexStudent}
                  label={sexStudent}
                  value={sexStudent}
                />
              ))}
            </Radio.Group>
				</Box>

				<Box>
				<Text className="font-semibold my-2">Trường/Đại học bạn đang theo học:</Text>
            <Radio.Group
              value={formData.SelectSchool}
              onChange={handleRadioChange("SelectSchool")}
			  className="border p-2"
            >
              {["Đại học Bách khoa Hà Nội","Không thuộc Đại học Bách khoa Hà Nội"].map((school) => (
                <Radio
                  key={school}
                  label={school}
                  value={school}
                />
              ))}
            </Radio.Group>
				</Box>

				<Box>
					<span className="font-semibold my-2">Mã số sinh viên:</span>
					<Input
						type="text"
						name="StudentID"
						placeholder="Mã số sinh viên"
						value={formData.StudentID}
						onChange={handleChange}
						className="input-field"
					/>
				</Box>

				<Box>
					<span className="font-semibold my-2">Tỉnh/Thành phố:</span>
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

				<Box>
					<span className="font-semibold my-2">Quận/Huyện:</span>
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

				<Box>
					<span className="font-semibold my-2">Phường/Xã:</span>
				<Select
					closeOnSelect
					name="Ward"
					label-none="Phường/Xã"
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
					<span className="font-semibold my-2">Địa chỉ:</span>
					<Input
						type="text"
						name="Address"
						label-none="Địa chỉ"
						placeholder="Nhập địa chỉ"
						value={formData.Address}
						onChange={handleChange}
					/>
				</Box>

				<Box>
					<span className="font-semibold my-2">Thông tin thêm:</span>
					<Input
						type="text"
						name="InfoMore"
						label-none="Thông tin thêm"
						placeholder="Nhập thông tin thêm"
						value={formData.InfoMore}
						onChange={handleChange}
					/>
				</Box>

				<Box>
  <Text className="col-span-3 my-2 font-semibold">Kiến thức/Kỹ năng:</Text>
  <div className="grid grid-cols-3 gap-4">
    {[
      "Toán học",
      "Vật lý",
      "Hóa học",
      "Tin học",
      "Sinh học",
      "Ngoại ngữ",
      "Ngữ văn",
      "Giá tư duy Bách khoa",
      "Kĩ năng mềm",
      "STEM",
      "Tin học văn phòng",
      "Các môn tiểu học",
    ].map((subject) => (
      <label
        key={subject}
        className={`flex items-center justify-center col-span-1 cursor-pointer rounded-md text-center text-black transition duration-300 ease-in-out h-[10vh] ${
          formData.Subjects.includes(subject)
            ? "bg-[#060f44] text-white font-bold transition duration-200"
            : "bg-white"
        }`}
      >
        <input
          type="checkbox"
          className="hidden"
          value={subject}
          onChange={() => handleCheckboxChange("Subjects", subject)}
        />
        {subject}
      </label>
    ))}
  </div>
</Box>


				<Box>
					<Text className="font-semibold my-2">Hình thức dạy:</Text>
					<Radio.Group
						value={formData.FormTeach}  
						onChange={handleRadioChange("FormTeach")}
						className="border p-2 w-full mb-2"
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
					<span className="font-semibold my-2"> Kinh nghiêm:</span>
					<Input
						type="text"
						name="Experience"
						label-none="Kinh nghiệm"
						placeholder="VD: Đã dạy học sinh lớp 12 đỗ chuyên Toán"
						value={formData.Experience}
						onChange={handleChange}
						className="input-field"
					/>
				</Box>

				<Box>
					<span className="font-semibold my-2">Thành tích:</span>
					<Input
						type="text"
						name="Achivement"
						label-none="Thành tích"
						placeholder="VD: Giải nhì Toán cấp huyện lớp 11"
						value={formData.Achivement}
						onChange={handleChange}
						className="input-field"
					/>
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

export default FormStudent;