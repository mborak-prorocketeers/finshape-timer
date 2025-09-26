import { ActionContext, type Effect } from "@alfons-app/pdk";
import { useContext, useEffect, useRef } from "react";
import type { Props } from "./editor";

const timerEffect: Effect<Props> = (props) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { getAction } = useContext(ActionContext);

  const setUpTimer = () => {
    intervalRef.current = setInterval(() => {
      getAction(props.onInterval?.__$ref)?.();
      console.log("trigger!");
      if (!props.repeat && intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }, props.interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  };

  useEffect(setUpTimer, [
    props.interval,
    props.repeat,
    props.onInterval,
    getAction,
  ]);
  return null;
};

export default timerEffect;
