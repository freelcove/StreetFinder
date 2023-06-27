"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();

  const handleSignIn = (provider) => {
    signIn(provider, { callbackUrl: `/` });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <button
          style={{
            width: "120px",
            height: "40px",
            border: "none",
            borderRadius: "5px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#000",
          }}
          onClick={() => handleSignIn("google")}
        >
          <span style={{ fontSize: "30px", marginRight: "10px" }}>
            <img
              src="/image/google.png"
              alt="Google Icon"
              style={{ width: "30px" }}
            />
          </span>
          <span>Sign in</span>
        </button>
        <button
          style={{
            width: "120px",
            height: "40px",
            border: "none",
            borderRadius: "5px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#000",
          }}
          onClick={() => handleSignIn("naver")}
        >
          <span
            style={{
              fontSize: "30px",
              marginRight: "10px",
              marginTop: "-1px",
              color: "lime",
            }}
          >
            N
          </span>
          <span>Sign in</span>
        </button>
      </div>
    </div>
  );
}
