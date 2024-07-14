import Form from "./form";




export default function Reprint() {
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex fixed overflow-auto flex-col gap-10 bg-white md:w-3/5 sm:w-full h-screen items-center py-12 px-7">
        <Form />
      </div>
    </main>
  );
}
