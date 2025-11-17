import { setCategories, setDifficulties } from "@/models/actions/adminActions";
import { userLoggedIn } from "@/models/selectors/loginSelectors";
import { getAdminCategories, getAdminDifficulties } from "@/services/admin";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector(userLoggedIn);
  const { data: adminCategories, isSuccess: successCategories } = useQuery({
    queryKey: ["get-admin-categories"],
    queryFn: () => getAdminCategories(loggedUser.token),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: true,
  });

  const { data: adminDifficulties, isSuccess: successDifficulties } = useQuery({
    queryKey: ["get-admin-difficulties"],
    queryFn: getAdminDifficulties,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: true,
  });

  useEffect(() => {
    if (successCategories) {
      dispatch(setCategories(adminCategories?.categories));
    }
  }, [successCategories]);

  useEffect(() => {
    if (successDifficulties) {
      dispatch(setDifficulties(adminDifficulties?.difficulties));
    }
  }, [successDifficulties]);

  return <div>Dashboard</div>;
};

export default Dashboard;
