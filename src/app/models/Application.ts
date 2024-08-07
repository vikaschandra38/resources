export interface Application {
  applicationId?: number;
  applicationName: string;
  accessControlModel: string;
  policies: string;
  others: string; // JSON data stored as string
}
