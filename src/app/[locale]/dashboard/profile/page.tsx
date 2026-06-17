import { getSession } from "@/lib/auth/session";
import { Users } from "@/lib/db/collections";
import { ProfileForm } from "@/components/forms/profile-form";

export default async function ProfilePage() {
  const session = await getSession();
  const user = (await Users.find((u) => u.id === session!.sub))!;

  return (
    <div className="max-w-2xl">
      <ProfileForm user={user} />
    </div>
  );
}
