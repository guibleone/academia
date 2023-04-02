import React from "react";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from '../hooks/useAuthContext'
// date fns

import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { ptBR } from "date-fns/locale";

function WorkoutDetails({ workout }) {
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext()

  const handleDelete = async () => {
    if (!user) {
      return
    }

    const response = await fetch(
      "http://localhost:4000/api/workouts/" + workout._id,
      {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${user.token}`,
        }

      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Carga (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Repetições : </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), {
          addSuffix: true,
          locale: ptBR,
        })}
      </p>
      <span className="material-symbols-outlined" onClick={handleDelete}>
        delete
      </span>
    </div>
  );
}

export default WorkoutDetails;
