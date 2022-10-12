import { useAppSelector } from "../app/hook";

export default function Greeting()
{
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="container">
      <h2>Hi, {user?.name}</h2>
    </div>
  )
}