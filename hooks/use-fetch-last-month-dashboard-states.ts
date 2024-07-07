import { getDashboardStates } from "@/actions/queries/dashboard-queries/get-states";
import { getCart } from "@/actions/queries/getCart";
import { useQuery } from "@tanstack/react-query";
import { useFilterModal } from "./use-filter-modal-store";
import { getBeforeMonthStates } from "@/actions/queries/dashboard-queries/get-before-month-states";

export const fetchLastMonthDashboardStates = () => {
  const { dashboardData } = useFilterModal();

  const { data, isPending, refetch } = useQuery({
    queryFn: () => getBeforeMonthStates({ timeline: dashboardData.timeline }),
    queryKey: [
      "dashboardBeforeMonthStates",
      dashboardData ?? {
        timeline: {
          from: new Date(),
          to: new Date(),
        },
      },
    ],
  });

  return {
    data,
    isPending,
    refetch,
  };
};
