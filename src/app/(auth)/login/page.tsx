
import ShoppingIllustration, { LoginPageProps } from "@/components/modules/home/Auth/LoginPage";
import LoginForm from "@/components/modules/home/Auth/LoginForm";

const LoginPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ redirect?: string }>;
}) => {
  
  const params = (await searchParams) || {};
  return (
    <div className="min-h-[calc(100vh)] flex flex-col lg:flex-row bg-white">

      {/* Illustration */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%]">
        <ShoppingIllustration />
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-12 xl:px-20 bg-white">
        <LoginForm  redirect={params.redirect} />
      </div>

    </div>
  )
}

export default LoginPage;