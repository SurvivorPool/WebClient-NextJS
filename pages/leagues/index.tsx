import AvailableLeagues from "@/components/Leagues/AvailableLeagues";
import MyLeagues from "@/components/Leagues/MyLeagues";

// @ts-ignore
const Leagues = ({ session }) => {
  return (
    <>
      <MyLeagues />
      <AvailableLeagues />
    </>
  );
};

Leagues.auth = true;

export default Leagues;
