import { AvatarProps } from "@radix-ui/react-avatar";
import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps extends AvatarProps {
  user: { email: string | null; name: string | null; image: string | null };
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.image ? (
        <AvatarImage alt="Picture" src={user.image} />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.name}</span>
          <User className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
