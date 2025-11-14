import { setCategories } from "@/models/actions/adminActions";
import { getAdminCategories } from "@/services/admin";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data: adminCategories, isSuccess } = useQuery({
    queryKey: ["get-admin-categories"],
    queryFn: getAdminCategories,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: true,
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCategories(adminCategories?.categories));
    }
  }, [isSuccess]);

  return <div>Dashboard</div>;
};

export default Dashboard;
