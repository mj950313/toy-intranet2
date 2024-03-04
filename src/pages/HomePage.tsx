import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, incrementByAmount } from "../store/counterSlice";

type State = {
  counter: {
    value: number;
  };
};

export default function HomePage() {
  const count = useSelector((state: State) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <h1>HomePage</h1>
      <p>Counter: {count}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>더하기 5</button>
    </>
  );
}
