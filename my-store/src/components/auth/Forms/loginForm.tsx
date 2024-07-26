"use client";
import { LoginAction } from "@/actions/loginAction";
import DarkModeSwitcher from "@/components/DarkModeSwitcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();


  async function handleSubmit(formData: FormData) {
    try {

      const email: any = formData.get("email");
      const password: any = formData.get("password");

      const response = await LoginAction(email, password);
      if (response.ok) {
        router.push("/control-panel")
      }
      else {
        toast({
          className: cn(
            'top-2 right-0 w-5/6 md-w-full flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-red-700 text-white'
          ),
          title: "Error",
          description: response.message,
        })
      }
    } catch (error) {
      
      toast({
        className: cn(
          'top-2 right-0 w-5/6 md-w-full flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-red-700 text-white'
        ),
        title: "Error",
        description: "Something went wrong, please try again"
      })
    }
  }

  return (
    <>
      <header className=" py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-lg font-bold">Block</span>
          </div>
          <DarkModeSwitcher />
        </div>
      </header>
      <main className="py-12 flex justify-center">
        <div className="shadow-md rounded-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">Login</h1>

          <form className="space-y-4" action={handleSubmit}>
            <div>
              <label className="block text-sm font-medium " htmlFor="email">
                Email
              </label>
              <Input
                className="mt-1 block w-full rounded-md shadow-sm0 sm:text-sm"
                id="email"
                name="email"
                placeholder="you@example.com"
                type="email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium " htmlFor="password">
                Password
              </label>
              <Input
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                id="password"
                name="password"
                placeholder="Enter your password"
                type="password"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <a className="text-sm text-primary hover:text-primary-foreground" href="#">
                Forgot your password?
              </a>
              <Button
                className=" border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                type="submit"
              >
                Sign in
              </Button>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}