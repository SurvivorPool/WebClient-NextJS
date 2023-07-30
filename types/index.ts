export type LeagueType = {
  id: string;
  name: string;
  description: string;
};

export type Team = {
  id: string;
  league_id: string;
  name: string;
  active: boolean;
  paid: boolean;
  streak: number;
  user_id: string;
};

export type League = {
  name: string;
  description: string;
  type_id: string;
  id: string;
  signup_active: boolean;
  pot: number;
  price: number;
  start_week: number;
  completed: boolean;
  teams: Array<Team>;
  league_type: LeagueType;
};
