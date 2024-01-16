import { getServerSession } from "next-auth";
import AuthForm from "@/components/app/auth-form";
import mailboxImg from "@/assets/mailbox.jpg";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await getServerSession();

  if (session?.user) redirect("/dashboard");

  return (
    <div className="min-h-screen grid bg-base-200">
      <div className="flex gap-8 items-center h-full">
        <div
          className="hidden h-full bg-cover bg-center bg-no-repeat max-w-2xl relative md:grid place-items-center"
          style={{
            backgroundImage: `url(${mailboxImg.src})`,
          }}
        >
          <div className="absolute inset-0 bg-primary bg-opacity-50"></div>
          <div className="relative z-20 text-left text-white px-4 md:px-20">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
        </div>
        <div className="w-full grid place-items-center">
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
