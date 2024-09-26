"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";


const ConnectYTButton = () => {
  const [authCode, setAuthCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = () => {
    setLoading(true);
    setError(null);
    // Redirect to the auth endpoint
    window.location.href = "/api/youtube/auth";
  };

  // Check for the code in the URL (after redirect)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      setAuthCode(code);
      setLoading(false);
    }
  }, []);

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <h2 className="text-2xl font-bold">YouTube Authentication</h2>
      </CardHeader>
      <CardContent>
        <Button onClick={handleAuth} disabled={loading}>
          {loading ? "Loading..." : "Authenticate with YouTube"}
        </Button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {authCode && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Retrieved Code:</h3>
            <p className="bg-gray-100 p-2 rounded break-all">{authCode}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ConnectYTButton;
