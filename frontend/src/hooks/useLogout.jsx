import { useAuthContext } from "./useAuthContext";
import { useWorkoutContext } from './useWorkoutsContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutsDispatch } = useWorkoutContext();

  const logout = () => {
    // remover usuario do arquivo
    localStorage.removeItem("user");

    // ação de logout do dispach
    dispatch({ type: "LOGOUT" });
    workoutsDispatch({ type: 'SET_WORKOUT', payload: null })
  };

  return { logout };
};
