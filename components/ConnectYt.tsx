"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const ConnectYTButton = () => {
  const [loading, setLoading] = useState(false);


  const handleAuth = () => {
    setLoading(true);
    // Redirect to the auth endpoint
    window.location.href = "/api/youtube/auth";
  };

  // Check for the code in the URL (after redirect)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      setLoading(false);
    }
  }, []);

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <h2 className="text-2xl font-bold">YouTube Authentication</h2>
      </CardHeader>
      <CardContent>
        <Button
          style={{ width: "full" }}
          onClick={handleAuth}
          disabled={loading}
        >
          {loading ? "Loading..." : "Authenticate with YouTube"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ConnectYTButton;
