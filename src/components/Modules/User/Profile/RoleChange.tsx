import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRoleChangeRequestMutation } from "@/redux/features/user/user.api";
import type { IRole, IUser } from "@/types";
import React, { useState } from "react";
import { toast } from "sonner";

type Props = {
  user: IUser;
};

const RoleChange: React.FC<Props> = ({ user }) => {
  const [role, setRole] = useState<IRole>();
  const [changeRole, { isLoading }] = useRoleChangeRequestMutation();

  const onRoleSubmit = async (data: string) => {
    setRole(data as IRole);
  };

  const handelChange = async () => {
    if (!role) return toast.error("Must set a role");
    const toastId = toast.loading("Online status is chnagning...");
    try {
      const result = await changeRole({
        reqRole: role,
      }).unwrap();
      if (result.success) {
        toast.success(result.message, { id: toastId });
      }
    } catch (error) {
      console.log(error);
      toast.error((error as any).data?.message, { id: toastId });
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full sm:w-auto" variant={"default"}>
            Change Role
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Role</DialogTitle>
            <DialogDescription>
              Change your role to Driver or Admin
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-wrap items-center gap-2">
            <Select onValueChange={onRoleSubmit}>
              <SelectTrigger>
                <SelectValue placeholder={user.role} />
              </SelectTrigger>
              <SelectContent>
                {user.role !== "WRITER" && (
                  <SelectItem value="WRITER">WRITER</SelectItem>
                )}
                <SelectItem value="ADMIN">ADMIN</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            variant={"default"}
            onClick={handelChange}
            disabled={isLoading}
          >
            Request Change
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoleChange;
