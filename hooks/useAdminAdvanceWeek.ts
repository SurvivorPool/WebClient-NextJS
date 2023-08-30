// @ts-nocheck

import apiFetch from "@/utils/apiFetch";
import { useMutation } from "@tanstack/react-query";

const useAdminAdvanceWeek = () => {
  const advanceWeekFn = async () => {
    return await apiFetch("admin/advance_week", {
      method: "PUT",
    });
  };

  return useMutation({
    mutationKey: ["advanceWeek"],
    mutationFn: advanceWeekFn,
  });
};

export default useAdminAdvanceWeek;
