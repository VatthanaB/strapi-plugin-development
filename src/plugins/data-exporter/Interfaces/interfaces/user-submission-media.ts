import { SubmissionMediaEnum } from "../enums/submission-media-enum";

export interface IUserSubmissionMedia {
    type: SubmissionMediaEnum;
    file: string;
}