export interface IUsersPerMonth {
  totalUsers: string;
  users: {
    month: string;
    userCount: string;
  }[];
}
