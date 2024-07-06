import { getDashboardStates } from "@/actions/queries/dashboard-queries/get-states";
import { getCart } from "@/actions/queries/getCart";
import { useQuery } from "@tanstack/react-query";
import { useFilterModal } from "./use-filter-modal-store";

export const fetchDashboardStates = () => {
  const { dashboardData } = useFilterModal();

  const { data, isPending, refetch } = useQuery({
    queryFn: () => getDashboardStates({ timeline: dashboardData.timeline }),
    queryKey: [
      "dashboardStates",
      dashboardData ?? { timeline: { from: new Date(), to: new Date() } },
    ],
  });

  return {
    data,
    isPending,
    refetch,
  };
};
