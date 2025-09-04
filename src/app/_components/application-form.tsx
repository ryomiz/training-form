"use client";
import { useRouter } from "next/navigation";
import {
  type FormEvent,
  Fragment,
  useContext,
  useMemo,
  useState,
  useTransition,
} from "react";
import type { MonthChangeEventHandler } from "react-day-picker";
import { ZodError } from "zod";
import { InformationIcon, WarningIcon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { FormControl, FormControlContext } from "@/components/ui/form-control";
import { ImageUploader } from "@/components/ui/image-uploader";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { useDate } from "@/lib/date/use-date";
import { cn } from "@/lib/utils";
import { useZodError } from "@/lib/zod/use-zod-error";
import { type Holiday, holidaySchema } from "@/schema";
import { submitApplicationAction } from "./actions";
import { ApplicationFormCalendar } from "./application-form-calendar";
import { type ApplicationFormInput, applicationFormSchema } from "./schema";

const MIN_AGE = 8;

type Props = {
  initialHolidays: Holiday[];
};
export const ApplicationForm = ({ initialHolidays }: Props) => {
  const [holidays, setHolidays] = useState<Holiday[]>(initialHolidays);
  // It works with valid API Key
  const onMonthChange: MonthChangeEventHandler = async (month) => {
    const selectedMonth = new Date(month).getMonth();
    if (selectedMonth !== 0 && selectedMonth !== 11) return;

    const year = new Date(month).getFullYear();
    const hasAlreadyFetched = holidays.some((holiday) => holiday.year === year);
    if (hasAlreadyFetched) return;

    const res = await fetch(`/api?year=${year}`);
    if (res.status !== 200) {
      throw new Error("Failed to fetch holidays");
    }
    const data = await res.json();
    const newHolidays = holidaySchema.array().parse(data);
    setHolidays([...holidays, ...newHolidays]);
  };

  const [firstName, setFirstName] =
    useState<ApplicationFormInput["firstName"]>("");
  const [lastName, setLastName] =
    useState<ApplicationFormInput["lastName"]>("");
  const [email, setEmail] = useState<ApplicationFormInput["email"]>("");
  const [age, setAge] = useState<ApplicationFormInput["age"]>([MIN_AGE]);
  const [file, setFile] = useState<ApplicationFormInput["file"]>(null);
  const [date, setDate] = useState<ApplicationFormInput["date"]>(undefined);
  const [timeSlot, setTimeSlot] =
    useState<ApplicationFormInput["timeSlot"]>("");
  const { setZodError, getErrorMessage } =
    useZodError<keyof ApplicationFormInput>();

  const { push } = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setZodError(null);
    const data: ApplicationFormInput = {
      firstName,
      lastName,
      email,
      age,
      file,
      date,
      timeSlot,
    };
    try {
      const parsed = applicationFormSchema.parse(data);
      startTransition(async () => {
        await submitApplicationAction(parsed);
        await push("/complete");
      });
    } catch (e) {
      if (e instanceof ZodError) {
        setZodError(e);
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      } else {
        throw e;
      }
    }
  };

  const { isSameDay } = useDate();
  // biome-ignore lint/correctness/useExhaustiveDependencies: isSameDay is a pure func
  const observanceDay = useMemo(() => {
    if (!date) return undefined;
    return holidays.find((holiday) => isSameDay(new Date(holiday.date), date));
  }, [holidays, date]);

  const isSubmitButtonDisabled =
    !firstName || !lastName || !email || !file || !date || !timeSlot;

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="font-medium text-2xl">Personal info</h1>
      <div className="mt-8 grid gap-y-6">
        <FormControl
          label="First Name"
          errorMessage={getErrorMessage("firstName")}
        >
          <Input
            name="firstName"
            placeholder="Ryosuke"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </FormControl>

        <FormControl
          label="Last Name"
          errorMessage={getErrorMessage("lastName")}
        >
          <Input
            name="lastName"
            placeholder="Mizuno"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormControl>

        <FormControl
          label="Email Address"
          errorMessage={getErrorMessage("email")}
        >
          <Input
            name="email"
            placeholder="address@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl
          label={<div>Age</div>}
          errorMessage={getErrorMessage("age")}
        >
          <Slider
            value={age}
            min={MIN_AGE}
            max={100}
            step={1}
            onValueChange={setAge}
          />
        </FormControl>

        <FormControl label="Photo" errorMessage={getErrorMessage("file")}>
          <ImageUploader
            file={file}
            onChange={setFile}
            onDelete={() => setFile(null)}
          />
        </FormControl>
      </div>

      <div>
        <h2 className="mt-12 font-medium text-2xl">Your workout</h2>
        <div className="mt-8 grid gap-y-6 sm:grid-cols-[auto_76px] sm:items-start sm:gap-x-6">
          <FormControl
            label={<div>Date</div>}
            errorMessage={
              (getErrorMessage("date") || getErrorMessage("timeSlot")) && (
                <>
                  {getErrorMessage("date") && (
                    <div className={"mt-2 grid grid-cols-[auto_1fr] gap-x-2"}>
                      <WarningIcon />
                      <div>
                        <p className={"whitespace-pre-line text-sm"}>
                          {getErrorMessage("date")}
                        </p>
                      </div>
                    </div>
                  )}
                  {getErrorMessage("timeSlot") && (
                    <div
                      className={
                        "mt-2 hidden grid-cols-[auto_1fr] gap-x-2 sm:grid"
                      }
                    >
                      <WarningIcon />
                      <p className={"whitespace-pre-line text-sm"}>
                        {getErrorMessage("timeSlot")}
                      </p>
                    </div>
                  )}
                </>
              )
            }
          >
            <ApplicationFormCalendar
              mode={"single"}
              selected={date}
              onSelect={(date) => {
                setDate(date);
                setTimeSlot("");
              }}
              holidays={holidays}
              onMonthChange={onMonthChange}
            />
            {observanceDay && (
              <div className={"mt-2 grid grid-cols-[auto_1fr] gap-x-2"}>
                <InformationIcon />
                <p className={"whitespace-pre-line text-sm"}>
                  It is {observanceDay.name}.
                </p>
              </div>
            )}
          </FormControl>

          {date && !observanceDay && (
            <FormControl
              label={<div>Time</div>}
              errorMessage={
                getErrorMessage("timeSlot") && (
                  <div
                    className={
                      "mt-2 grid grid-cols-[auto_1fr] gap-x-2 sm:hidden"
                    }
                  >
                    <WarningIcon />
                    <p className={"whitespace-pre-line text-sm"}>
                      {getErrorMessage("timeSlot")}
                    </p>
                  </div>
                )
              }
            >
              <RadioGroup
                className="grid grid-cols-4 gap-2 sm:mt-0 sm:grid-cols-1"
                value={timeSlot}
                onValueChange={setTimeSlot}
              >
                {timeSlotOptions.map((option) => (
                  <TimeSlotRadioGroupItem
                    key={option.value}
                    option={option}
                    isSelected={timeSlot === option.value}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          )}
        </div>
      </div>
      <Button
        type="submit"
        className={cn("mt-8 w-full", date && "mt-12")}
        disabled={isSubmitButtonDisabled}
        isLoading={isPending}
      >
        Send Application
      </Button>
    </form>
  );
};

const timeSlotOptions = [
  { value: "1200", label: "12:00" },
  { value: "1400", label: "14:00" },
  { value: "1630", label: "16:30" },
  { value: "1830", label: "18:30" },
  { value: "2000", label: "20:00" },
] as const;
const TimeSlotRadioGroupItem = ({
  option,
  isSelected,
}: {
  option: (typeof timeSlotOptions)[number];
  isSelected: boolean;
}) => {
  const context = useContext(FormControlContext);
  return (
    <Fragment>
      <RadioGroupItem
        id={option.value}
        value={option.value}
        className={"sr-only"}
        aria-invalid={context?.isInvalid}
      />
      <label
        htmlFor={option.value}
        className={cn(
          "grid h-[46px] cursor-pointer place-items-center rounded-md bg-white text-base transition-[box-shadow]",
          "shadow-[inset_0_0_0_1px_theme(colors.purple.300)]",
          isSelected && "shadow-[inset_0_0_0_2px_theme(colors.purple.700)]",
        )}
      >
        {option.label}
      </label>
    </Fragment>
  );
};
