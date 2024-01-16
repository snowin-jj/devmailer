import Image from "next/image";
import type { User } from "@prisma/client";

type SettingsSectionProps = {
  user: User;
};

export default function SettingsSection({ user }: SettingsSectionProps) {
  return (
    <section>
      <div className="flex gap-4 items-end">
        <div className="avatar">
          <div className="w-24 rounded">
            <Image
              src={user.image!}
              priority={true}
              alt="avatar"
              width={100}
              height={100}
            />
          </div>
        </div>
        <div>
          <p className="font-bold">{user.name}</p>
          <span className="text-base-content">{user.email}</span>
        </div>
      </div>
    </section>
  );
}
