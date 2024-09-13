import { IAddress } from "./address";
import { IRestrictions } from "./restrictions";
import { IReputeScore } from "./repute-score";
import { IUserSubmission } from "./user-submission";

export interface IUser {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  uid: string;
  firstName: string;
  lastName: string;
  restricted: boolean;
  reputationScore: number;
  reputationHistory: IReputeScore[];
  birthDate: Date;
  occupation: string;
  organisationName: string;
  bio: string;
  profileImage: string;
  address: IAddress;
  restrictions: IRestrictions[];
  ethnicity: string;
  createdAt: Date;
  updatedAt: Date;
  user_submissions: IUserSubmission[];
  dateOfBirth?: Date;
}
