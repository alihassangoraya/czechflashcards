import { useState } from "react";

export function useAccountCredentials() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  return {
    displayName,
    email,
    password,
    message,
    setDisplayName,
    setEmail,
    setPassword,
    setMessage
  };
}
