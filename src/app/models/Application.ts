export interface Application {
  applicationId?: string;
  applicationName: string;
  accessControlModel: string;
  policy: string;
  others: string; // JSON data stored as string
}
