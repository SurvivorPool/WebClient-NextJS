export type LeagueType = {
  id: string;
  name: string;
  description: string;
};

export type User = {
  email: string;
  full_name: string;
  id: string;
  is_admin: boolean;
  receive_notifications: boolean;
  wins: number;
};

export type Team = {
  id: string;
  league_id: string;
  name: string;
  active: boolean;
  paid: boolean;
  streak: number;
  user_id: string;
  current_pick: string;
  user: User;
  league: League;
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

type GameTeamInfo = {
  id: number;
  abbreviation: string;
  city_state: string;
  full_name: string;
  nickname: string;
  conference: string;
  division: string;
};

export type Game = {
  id: number;
  home_team_name: string;
  home_team_score: number;
  away_team_name: string;
  away_team_score: number;
  day_of_week: string;
  game_date: string;
  quarter: string;
  quarter_time: string;
  week: number;
  stadium_id: string;
  odds: number | string | unknown; // TODO
  has_started: boolean;
  stadium: {
    id: number;
    city: string;
    name: string;
    state: string;
  };
  away_team_info: GameTeamInfo;
  home_team_info: GameTeamInfo;
};
