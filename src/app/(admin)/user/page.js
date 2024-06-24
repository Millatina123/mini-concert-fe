import { useRegisterMutation } from "@/redux/services/auth";
import React from "react";

export default function UserPage() {
  const [register, { isLoading }] = useRegisterMutation();
  useEffect(() => {
    // Call the register mutation function when the component mounts for the first time
    register(localStorage.getItem("token"));
  }, []);
  return <div>UserPage</div>;
}
