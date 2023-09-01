// @ts-nocheck

import AvailableLeagues from "@/components/Leagues/AvailableLeagues";
import MyLeagues from "@/components/Leagues/MyLeagues";
import useGetLeagues from "@/hooks/useGetLeagues";
import useGetLeaguesByUser from "@/hooks/useGetLeaguesByUser";
import { useMemo } from "react";
import { useSession } from "next-auth/react";

// @ts-ignore
const Leagues = () => {
  const { data: session, status } = useSession();
  const { data: getLeaguesByUserData, isLoading: getLeaguesByUserLoading } =
    useGetLeaguesByUser(session?.user_id || null);
  const { data: getAllLeaguesData, isLoading: getAllLeaguesLoading } =
    useGetLeagues();

  const availableLeagues = useMemo(() => {
    const leaguesByUser = getLeaguesByUserData?.leagues || [];
    const allLeagues = getAllLeaguesData?.leagues || [];
    if (!allLeagues?.length) return [];

    if (!leaguesByUser?.length) return allLeagues;

    const leaguesByUserIds = leaguesByUser.map((league) => league.id);

    return allLeagues.filter((league) => {
      return !leaguesByUserIds.includes(league.id);
    });
  });

  return (
    <>
      <MyLeagues
        leagues={getLeaguesByUserData?.leagues || []}
        isLoading={getLeaguesByUserLoading}
      />
      <AvailableLeagues
        leagues={availableLeagues}
        isLoading={getLeaguesByUserLoading || getAllLeaguesLoading}
      />
    </>
  );
};

Leagues.auth = true;

export default Leagues;
