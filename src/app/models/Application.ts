export interface Application {
  applicationId?: string;
  applicationName: string;
  accessControlModel: string;
  policies: string;
  others: string; // JSON data stored as string
}
