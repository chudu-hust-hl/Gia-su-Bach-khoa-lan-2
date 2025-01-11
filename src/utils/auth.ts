import Cookies from "js-cookie";

const TokenKey = "TokenGSBK";
const UserZaloID = "UserZaloIDGSBK";
const PhoneNumber = "PhoneNumberGSBK";

const Name = "NameGSBK";
const Avatar = "AvatarGSBK";
const StudentID = "StudentIDGSBK"
const PageNumber = "PageNumberGSBK";
const RowspPage = "RowspPageGSBK";

// Token
export function setToken(token: string): void {
  Cookies.set(TokenKey, token, { expires: 356 });
}
export function getToken(): string | undefined {
  return Cookies.get(TokenKey);
}
export function removeToken(): void {
  Cookies.remove(TokenKey);
}

// UserName
export function setUserZaloID(id: string): void {
  Cookies.set(UserZaloID, id);
}
export function getUserZaloID(): string | undefined {
  return Cookies.get(UserZaloID);
}
export function removeUserZaloID(): void {
  Cookies.remove(UserZaloID);
}

// PhoneNumber
export function setPhoneNum(phoneNumber: string): void {
  Cookies.set(PhoneNumber, phoneNumber);
}
export function getPhoneNum(): string | undefined {
  return Cookies.get(PhoneNumber);
}
export function removePhoneNum(): void {
  Cookies.remove(PhoneNumber);
}

//StudentID
export function setStudentID(studentID: string): void {
  Cookies.set(StudentID, studentID);
}
export function getStudentID(): string | undefined {
  return Cookies.get(StudentID);
}
export function removeStudentID(): void {
  Cookies.remove(StudentID);
}

// Avatar
export function setAvatar(studentID: string): void {
  Cookies.set(Avatar, studentID);
}
export function getAvatar(): string | undefined {
  return Cookies.get(Avatar);
}
export function removeAvatar(): void {
  Cookies.remove(Avatar);
}

// Avatar
export function setName(studentID: string): void {
  Cookies.set(Name, studentID);
}
export function getName(): string | undefined {
  return Cookies.get(Name);
}
export function removeName(): void {
  Cookies.remove(Name);
}

// PageNumber
export function setPageNumber(pageNumber: string): void {
  Cookies.set(PageNumber, pageNumber);
}
export function getPageNumber(): string | undefined {
  return Cookies.get(PageNumber);
}
export function removePageNumber(): void {
  Cookies.remove(PageNumber);
}

// RowspPage
export function setRowspPage(rowspPage: string): void {
  Cookies.set(RowspPage, rowspPage);
}
export function getRowspPage(): string | undefined {
  return Cookies.get(RowspPage);
}
export function removeRowspPage(): void {
  Cookies.remove(RowspPage);
}