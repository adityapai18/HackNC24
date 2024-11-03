type UserType = "admin" | "normal";
type VerificationStatus = "banned" | "pass" | "fail" | "waiting";

interface User {
  id: number;
  name: string;
  email: string;
  userType: UserType;
  password: string;
  verificationStatus: VerificationStatus;
}
