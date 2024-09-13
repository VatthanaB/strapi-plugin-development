import { ISponsor } from "./sponsor";
import { IRewardTier } from "./reward-tier";

export interface IChallenge {
  id: number;
  sponsor: ISponsor;
  name: string;
  title: string;
  category: string; // TODO: Change to enum
  descriptionBody: string;
  heroMedia: object;
  challengeThumbnail: object;
  media: object[];
  startAt: Date;
  endAt: Date;
  rewardTiers: IRewardTier[];
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}
