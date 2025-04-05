export interface Campaign {
  _id: string;
  name: string;
  description: string;
  status: "active" | "inactive" | "deleted";
  leads: string[];
  accountIDs: string[];
}
