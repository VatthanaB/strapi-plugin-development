import { IStrapiBase } from './strapi-base';

export interface IReputeScore extends IStrapiBase{
    userId: number;
    value: number;
    date: Date;
    type: string;
    comment: string;
    assignee: string;
    targetId: number;
    targetType: string;
}