import { clientEnv } from "@/constants/client-env";
import { serverEnv } from "@/constants/server-env";
import { holidaySchema } from "@/schema";
import { ApplicationForm } from "./_components/application-form";

export default async function Home() {
  const apiUrl = `${clientEnv.API_URL}/holidays?country=PL`;
  const res = await fetch(apiUrl, {
    headers: {
      "X-Api-Key": serverEnv.API_KEY,
    },
  });
  if (!res.ok) throw Error;

  const data = await res.json();
  const holidays = holidaySchema.array().parse(data);

  return (
    <div>
      <ApplicationForm holidays={holidays} />
    </div>
  );
}
