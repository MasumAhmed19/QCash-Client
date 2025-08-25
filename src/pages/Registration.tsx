import TravelRegister from "../assets/imgaes/travel-register.jpg";
import Logo from "@/assets/icons/Logo";
import { RegistrationForm } from "@/components/modules/Authentication/RegistrationForm";

export default function Register() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <img
          src={TravelRegister}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8]"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs flex flex-col items-center space-y-5">
            <Logo />

            <RegistrationForm />
          </div>
        </div>
      </div>
    </div>
  );
}
