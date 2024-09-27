"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const ConnectYTButton = () => {
  const [loading, setLoading] = useState(false);

  const handleAuth = () => {
    setLoading(true);
    window.location.href = "/api/youtube/auth";
  };

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
        <h2 className="text-2xl text-center font-bold">
          Connect your channels
        </h2>
      </CardHeader>
      <CardContent>
        <Button className="w-full" onClick={handleAuth} disabled={loading}>
          {loading ? "Loading..." : "Authenticate with YouTube"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ConnectYTButton;
