"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useRefreshStore } from "@/lib/stores/refresh";

interface Channel {
  id: string;
  youtubeId: string;
  name: string;
  image?: string;
  subscriberCount: number;
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
  ownerId: string;
}

const OwnedChannels = ({ userId }: { userId: string }) => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { triggerChannelRefresh } = useRefreshStore();

  useEffect(() => {
    const fetchOwnedChannels = async () => {
      setLoading(true)
      try {
        const response = await fetch("/api/youtube/channels/owned", {
          headers: {
            userId: userId,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch owned channels");
        const data: { channels: Channel[] } = await response.json();
        setChannels(data.channels);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOwnedChannels();
  }, [triggerChannelRefresh, userId]);

  if (loading)
    return (
      <div className="my-4 mx-8 border-secondary border-[1px] p-4 rounded-md w-full min-h-[10rem] text-muted-foreground">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="my-4 mx-8 border-red-700 border-[1px] p-4 rounded-md w-full min-h-[10rem] text-red-500">
        Error: {error}
      </div>
    );

  return (
    <div className="flex w-full mt-4">
      {channels.map((channel) => (
        <div className="p-3 w-1/3" key={channel.id}>
          <Card className="w-full hover:border-red-700 cursor-pointer transition">
            <CardHeader>
              <CardTitle>{channel.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                className="rounded-full mb-2"
                width={32}
                height={32}
                src={channel.image || `/default.png`}
                alt={channel.name}
              />
              <p>Subscribers: {channel.subscriberCount}</p>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default OwnedChannels;
