import { SignIn } from "@clerk/nextjs"


export default function Page() {
  return (
    <div className="bg-gradient-to-t from-yellow to-strawberry h-[100vh] flex flex-col items-center p-10">
      <h1 className="text-4xl font-bold sm:text-8xl text-center mb-10 text-white">
        Welcome to Shelph
      </h1>
      <h2 className="text-3xl italic font-semibold md:text-4xl lg:text-6xl text-center mb-20 text-white sm:w-1/2">
        Manage your reading and watch list
      </h2>

      <SignIn
        appearance={{
          elements: {
            formFieldInput:
              "hover:border-black focus:border-sky focus:outline-none  border-2 border-gray shadow-lg rounded-xl w-[100%] h-10",
            formButtonPrimary:
              "sm:px-6 sm:py-3 bg-sky text-white px-5 py-2 rounded-xl",
          },
        }}
      />
    </div>
  );
}