import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { IUser } from "@/types";
import { formatDate } from "@/utils/formatdate";

import React from "react";

type Props = {
  user: IUser;
};

const ProfileCard: React.FC<Props> = ({ user }) => {
  return (
    <Card>
      <CardHeader className="flex items-center space-x-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.picture || ""} alt={user.name} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{user.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {user.isActive && (
              <Badge
                variant={
                  user.isActive === "ACTIVE"
                    ? "default"
                    : user.isActive === "BLOCKED"
                    ? "destructive"
                    : "secondary"
                }
              >
                {user.isActive}
              </Badge>
            )}
            {user.isVarified && <Badge variant="default">Verified</Badge>}
            <Badge
              variant={
                user.subscribe
                  ? "default"
                  : user.subscribe
                  ? "destructive"
                  : "secondary"
              }
            >
              {user.subscribe ? "Subscribed" : "Not Subscribed"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-start gap-2">
          <span className="font-semibold">Role:</span>
          <span>{user.role}</span>
        </div>
        <div className="flex justify-start gap-2">
          <span className="font-semibold">Phone:</span>
          <span>{user.phone}</span>
        </div>
        <div className="flex justify-start gap-2">
          <span className="font-semibold">Address:</span>
          <span>{user.address || "N/A"}</span>
        </div>
        <div className="flex justify-start gap-2">
          <span className="font-semibold">Auth Provider:</span>
          <span>{user.auth.map((a) => a.provider).join(", ")}</span>
        </div>
        <div className="flex justify-start gap-2">
          <span className="font-semibold">Joined:</span>
          <span>{formatDate(user.createdAt)}</span>
        </div>
        <Separator />
        {user.subscribe && (
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex justify-start gap-2">
              <span className="font-semibold">Subscrbed At:</span>
              <span>
                {user.subscriptionDate
                  ? formatDate(user?.subscriptionDate)
                  : "N/A"}
              </span>
            </div>
            <div className="flex justify-start gap-2">
              <span className="font-semibold">Subscriptio End:</span>
              <span>
                {user.subscriptionExpires
                  ? formatDate(user?.subscriptionExpires)
                  : "N/A"}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
