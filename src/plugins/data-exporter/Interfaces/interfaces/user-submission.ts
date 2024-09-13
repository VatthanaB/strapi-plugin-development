import { IUserSubmissionMedia } from "./user-submission-media";
import { SubmissionStateEnum } from "../enums/submission-state-enum";
import { IUser } from "./user";

export type IUserSubmission = {
  id: number;
  title: string;
  userId: number;
  state: SubmissionStateEnum;
  body: string;
  rewardTier: string;
  mediaItems: IUserSubmissionMedia[];
  challengeId: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  user: IUser;
  videoId: string;
  videoThumbnail: string;
  videoHLS: string;
  videoMP4: string;
  publicImageUrl: string;
  publicAudioUrl: string;
  publicDocumentUrl: string;
};
