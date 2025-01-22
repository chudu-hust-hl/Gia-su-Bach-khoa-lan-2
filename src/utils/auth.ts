
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
  localStorage.setItem(TokenKey, token);
}
export function getToken(): string | null {
  return localStorage.getItem(TokenKey);
}
export function removeToken(): void {
  localStorage.removeItem(TokenKey);
}

// UserName
export function setUserZaloID(id: string): void {
  localStorage.setItem(UserZaloID, id);
}
export function getUserZaloID(): string | null {
  return localStorage.getItem(UserZaloID);
}
export function removeUserZaloID(): void {
  localStorage.removeItem(UserZaloID);
}

// PhoneNumber
export function setPhoneNum(phoneNumber: string): void {
  localStorage.setItem(PhoneNumber, phoneNumber);
}
export function getPhoneNum(): string | null {
  return localStorage.getItem(PhoneNumber);
}
export function removePhoneNum(): void {
  localStorage.removeItem(PhoneNumber);
}

//StudentID
export function setStudentID(studentID: string): void {
  localStorage.setItem(StudentID, studentID);
}
export function getStudentID(): string | null {
  return localStorage.getItem(StudentID);
}
export function removeStudentID(): void {
  localStorage.removeItem(StudentID);
}

// Avatar
export function setAvatar(studentID: string): void {
  localStorage.setItem(Avatar, studentID);
}
export function getAvatar(): string | null {
  return localStorage.getItem(Avatar);
}
export function removeAvatar(): void {
  localStorage.removeItem(Avatar);
}

// Avatar
export function setName(studentID: string): void {
  localStorage.setItem(Name, studentID);
}
export function getName(): string | null {
  return localStorage.getItem(Name);
}
export function removeName(): void {
  localStorage.removeItem(Name);
}

// PageNumber
export function setPageNumber(pageNumber: string): void {
  localStorage.setItem(PageNumber, pageNumber);
}
export function getPageNumber(): string | null {
  return localStorage.getItem(PageNumber);
}
export function removePageNumber(): void {
  localStorage.removeItem(PageNumber);
}

// RowspPage
export function setRowspPage(rowspPage: string): void {
  localStorage.setItem(RowspPage, rowspPage);
}
export function getRowspPage(): string | null {
  return localStorage.getItem(RowspPage);
}
export function removeRowspPage(): void {
  localStorage.removeItem(RowspPage);
}