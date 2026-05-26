import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForm from "./components/sign-in-form";
import SignUpForm from "./components/sign-up-form";
import Header from "@/components/common/header";

export default function Authentication() {
  return (
    <>
      <Header />

      <div className="flex w-full flex-col items-center gap-6 p-5 md:min-h-[calc(100vh-80px)] md:justify-center">
        <Tabs defaultValue="account" className="w-full max-w-md">
          <TabsList className="min-w-50 self-center">
            <TabsTrigger value="sign-in">Entrar</TabsTrigger>
            <TabsTrigger value="sign-up">Criar Conta</TabsTrigger>
          </TabsList>
          <TabsContent value="sign-in" className="w-full">
            <SignInForm />
          </TabsContent>
          <TabsContent value="sign-up" className="w-full">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
