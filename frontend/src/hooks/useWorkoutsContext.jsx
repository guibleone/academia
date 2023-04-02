import { WorkoutContext } from "../context/WorkoutsContext";
import { useContext } from "react";

export const useWorkoutContext = () => {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw Error(
      "useWorkoutsContext deve ser usado dentro de um WorkoutsContextProvider"
    );
  }

  return context;
};
