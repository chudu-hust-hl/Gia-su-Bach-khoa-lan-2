	import React, { useState, useEffect, FC } from "react";
	import { useNavigate } from "react-router-dom";
	import { Page, Box, Text, Input, Select, Checkbox, Button, Radio, Header } from "zmp-ui";
	import { GSStudentInfo } from "types";
	import { locationApi } from "api/location";
	import { studentApi } from "api/student";
	import toast from "react-hot-toast";
	import { getConfig } from 'utils/config';
	import logo from "static/logo.png";
	import { GSZaloUserInfo } from "types";
	import { authApi } from "api/auth";
	import { setUserZaloID, setToken, setStudentID, setPhoneNum, getPhoneNum, getStudentID, getUserZaloID, getToken, getAvatar, getName, removeUserZaloID, removeToken } from "utils/auth";


	const { Option } = Select;

	const FormStudent: FC = () => {
	// State to hold form data
	const [formData, setFormData] = useState<GSStudentInfo>({
		ReqStudentID: "",
		StudentID: getStudentID() || "",
		StudentName: "",
		Phone: "",
		Address: "",
		FormTeach: "",
		SexStudent: "",
		SelectSchool: "",
		NameSupports: "",
		Subjects: "",
		TimeSupport: "",
		InfoMore: "",
		City: "Thành phố Hà Nội",
		District: "",
		Ward: "",
		Experience: "",
		Achievement: "",
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
	const navigate = useNavigate();

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
		ReqStudentID: formData.ReqStudentID || "",
		StudentID: formData.StudentID || "",
		StudentName: formData.StudentName || "",
		Phone: formData.Phone || "",
		SexStudent: formData.SexStudent || "",
		SelectSchool: formData.SelectSchool || "",
		NameSupports: formData.NameSupports || "",
		InfoMore: formData.InfoMore || "",
		City: formData.City || "Thành phố Hà Nội",
		District: formData.District || "",
		Ward: formData.Ward || "",
		Address: formData.Address || "",
		Subjects: formData.Subjects || "",
		FormTeach: formData.FormTeach || "",
		TimeSupport: formData.TimeSupport || "",
		Experience: formData.Experience || "",
		Achievement: formData.Achievement || "",
	};

	// Create the request body
	const requestBody = {
		StudentInfo: studentInfo
	};
		
	try {
			console.log("Sending data:", requestBody); // Log the data being sent
			setStudentID(requestBody.StudentInfo.StudentID);
			const result = await studentApi.createStudentInfo(requestBody);

			console.log("API Response:", result);

			if (result.RespCode === 0) {
				toast.success("Đã gửi thông tin thành công!");

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
		<Page className="p-4 bg-cover bg-[#AD493A]" hideScrollbar>																<div className="rounded-[8px] bg-[rgba(255,255,255,0.6)] p-3 text-[#050C33]">
			<Box className="flex justify-between items-center mb-4 p-2">
			<Text.Title className="font-bold text-lg">Phiếu tạo thông tin làm gia sư</Text.Title>
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
					name="StudentName"
					label="Tên sinh viên"
					placeholder="Nhập tên"
					value={formData.StudentName}
					onChange={handleChange}
					className="input-field"
				/>
				</Box>

				<Box>
				<Input
					type="text"
					name="Phone"
					label="SĐT của sinh viên"
					placeholder="Nhập số điện thoại"
					value={formData.Phone}
					onChange={handleChange}
					className="input-field"
				/>
				</Box>

				<Box>
				<Text>Giới tính của bạn:</Text>
				<Radio.Group
					value={formData.SexStudent}
					onChange={handleRadioChange("SexStudent")}
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
				<Text>Trường/Đại học bạn đang theo học:</Text>
				<Radio.Group
					value={formData.SelectSchool}
					onChange={handleRadioChange("SelectSchool")}
				>
					{["Đại học Bách khoa Hà Nội", "Không thuộc Đại học Bách khoa Hà Nội"].map((school) => (
					<Radio
						key={school}
						label={school}
						value={school}
					/>
					))}
				</Radio.Group>
				</Box>

				<Box>
				<Input
					type="text"
					name="StudentID"
					label="Mã số sinh viên"
					placeholder="Mã số sinh viên"
					defaultValue={getStudentID() || ""}
					value={formData.StudentID}
					onChange={handleChange}
					className="input-field"
				/>
				</Box>

				<Box>
				<Select
					closeOnSelect
					name="City"
					label="Tỉnh/Thành phố"
					placeholder="Chọn tỉnh/thành phố"
					value={formData.City}
					onChange={handleCityChange}
				>
					<Option value="">Chọn thành phố</Option>
					{cities.map((city) => (
					<Option key={city} value={city} title={city} />
					))}
				</Select>
				</Box>

				<Box>
				<Select
					closeOnSelect
					name="District"
					label="Quận/Huyện"
					placeholder="Chọn quận/huyện"
					value={formData.District}
					onChange={handleDistrictChange}
					disabled={!formData.City} // Disable if no city selected
				>
					{districts.map((district) => (
					<Option key={district} value={district} title={district} />
					))}
				</Select>
				</Box>

				<Box>
				<Select
					closeOnSelect
					name="Ward"
					label="Phường/Xã"
					placeholder="Chọn phường/xã"
					value={formData.Ward}
					onChange={handleWardChange}
					disabled={!formData.District} // Disable if no district selected
				>
					{communes.map((commune) => (
					<Option key={commune} value={commune} title={commune} />
					))}
				</Select>
				</Box>

				<Box>
				<Input
					type="text"
					name="Address"
					label="Địa chỉ"
					placeholder="Nhập địa chỉ"
					value={formData.Address}
					onChange={handleChange}
					className="input-field"
				/>
				</Box>

				<Box>
				<Input
					type="text"
					name="InfoMore"
					label="Thông tin thêm"
					placeholder="Nhập thông tin thêm"
					value={formData.InfoMore}
					onChange={handleChange}
					className="input-field"
				/>
				</Box>

				<Box>
				<Text>Kiến thức/Kỹ năng:</Text>
				<Checkbox.Group className="grid grid-cols-3 gap-4">
					{["Toán học", "Vật lý", "Hóa học", "Tin học", "Sinh học", "Ngoại ngữ", "Ngữ văn", "Giá tư duy Bách khoa", "Kĩ năng mềm", "STEM", "Tin học văn phòng", "Môn tiểu học"].map((subject) => (
					<Checkbox key={subject} value={subject} label={subject} className="checkbox" />
					))}
				</Checkbox.Group>
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
					<Input
						type="text"
						name="Experience"
						label="Kinh nghiệm"
						placeholder="VD: Đã dạy học sinh lớp 12 đỗ chuyên Toán"
						value={formData.Experience}
						onChange={handleChange}
						className="input-field"
					/>
				</Box>

				<Box>
					<Input
						type="text"
						name="Achievement"
						label="Thành tích"
						placeholder="VD: Giải nhì Toán cấp huyện lớp 11"
						value={formData.Achievement}
						onChange={handleChange}
						className="input-field"
					/>
				</Box>

				<Box>
					<Input
						type="text"
						name="NameSupports"
						label="Năng lực của bạn"
						placeholder="VD: Giúp học sinh tập trung"
						value={formData.NameSupports}
						onChange={handleChange}
						className="input-field"
					/>
				</Box>

				<hr className="mt-4" />
				<Box className="py-4">
					<Text className="font-semibold text-xl mb-4">Lịch có thể dạy:</Text>
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

export default FormStudent;