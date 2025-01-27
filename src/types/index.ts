
export enum DomainAvailabilityStatus {
  NOTAVAILABLE = 0,
  AVAILABLE = 1,
  UNKNOWN = 2
}

export interface Domain {
  label: string;
  tld: string;
  name: string;
  availabilityStatus?: DomainAvailabilityStatus;
}