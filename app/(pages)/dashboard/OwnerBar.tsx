"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRefreshStore } from "@/lib/stores/refresh";

const OwnerBar = ({ userId }: { userId: string }) => {
  const [loading, setLoading] = useState(false);
  const [refreshloading, setrefreshloading] = useState(false);
  const { triggerRefresh } = useRefreshStore();

  const handleRefresh = async () => {
    setrefreshloading(true);

    try {
      const response = await fetch("/api/youtube/channels/refresh", {
        method: "POST",
        headers: {
          userId: userId,
        },
      });

      if (!response.ok) throw new Error("Failed to refresh channels");
    } catch (err) {
      console.log(err);
    } finally {
      triggerRefresh();
      setrefreshloading(false);
    }
  };

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
    <Card className="w-full">
      <div className="items-center p-3 justify-between flex">
        <div>
          <p className="text-xl">
            My <span className="text-red-500">Channels</span>
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            variant="secondary"
            onClick={handleRefresh}
            disabled={refreshloading}
          >
            {refreshloading ? "Refreshing..." : "Refresh Channels"}
          </Button>
          <Button className="" onClick={handleAuth} disabled={loading}>
            {loading ? "Loading..." : "Connect A New Channel"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default OwnerBar;
