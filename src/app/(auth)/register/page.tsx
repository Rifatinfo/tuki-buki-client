import RegisterForm from "@/components/modules/home/Auth/RegisterForm";
import RegisterIllustration from "@/components/modules/home/Auth/RegisterPage";

const RegisterPage = () => {
  return (
    <div className="min-h-[calc(100vh)] flex flex-col lg:flex-row bg-white">
      
      {/* Illustration */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%]">
        <RegisterIllustration />
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-12 xl:px-20 bg-white">
        <RegisterForm />
      </div>

    </div>
  );
};

export default RegisterPage;