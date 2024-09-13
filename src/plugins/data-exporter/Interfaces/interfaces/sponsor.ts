import { IContact } from "./contact";
import { OrganisationTypeEnum } from "../enums/organisation-type-enum";

export interface ISponsor {
  id: number;
  createdAt: Date;    
  updatedAt: Date;    
  publishedAt?: Date;    
  slug?: string;
  organisationName?: string;
  organisationType?: OrganisationTypeEnum;
  website?: string;
  nzbn?: string;
  bio?: string;
  profileImage?: string;
  contacts: IContact[];
}