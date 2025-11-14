import { setCategories } from "@/models/actions/adminActions";
import { userLoggedIn } from "@/models/selectors/loginSelectors";
import { getAdminCategories } from "@/services/admin";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector(userLoggedIn);
  const { data: adminCategories, isSuccess } = useQuery({
    queryKey: ["get-admin-categories"],
    queryFn: () => getAdminCategories(loggedUser.token),
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
