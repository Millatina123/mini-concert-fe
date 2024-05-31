"use client";
import { useRegisterMutation, useVerifyTokenMutation } from "@/redux/services/auth";
import React, { useEffect } from "react";

export default function Admin() {
  const [verifyToken, { isLoading }] = useVerifyTokenMutation();
  useEffect(() => {
    // Call the register mutation function when the component mounts for the first time
    verifyToken(localStorage.getItem("authToken"));
  }, []);
  return <div className="text-black">Admin</div>;
}
