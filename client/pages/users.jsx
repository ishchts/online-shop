import { useEffect } from "react";

export default function Index () {
  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch('/api/users');
      const json = await res.json();

      console.log('json', json);
    }

    getUsers();
  }, []);

  return <p>Route with path export</p>
}