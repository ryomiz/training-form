import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div>
      <h1 className={"font-medium text-2xl"}>Personal info</h1>
      <form className={"mt-8 grid gap-y-6"}>
        <div>
          <p>First Name</p>
          <Input placeholder={"input"} />
        </div>

        <div>
          <p>Last Name</p>
          <Input placeholder={"input"} />
        </div>

        <div>
          <p>Email Address</p>
          <Input placeholder={"input"} />
        </div>
        <Button type={"submit"}>Send Application</Button>
      </form>
    </div>
  );
}
