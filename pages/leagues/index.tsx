import AvailableLeagues from "@/components/Leagues/AvailableLeagues";
import MyLeagues from "@/components/Leagues/MyLeagues";
import useAuthRedirect from "@/hooks/useAuthRedirect";

const Leagues = () => {
  useAuthRedirect();

  return (
    <>
      <MyLeagues />
      <AvailableLeagues />
    </>
  );
};

export default Leagues;
