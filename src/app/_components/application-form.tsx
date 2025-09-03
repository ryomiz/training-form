"use client";
import { Fragment, useState } from "react";
import { ZodError } from "zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl } from "@/components/ui/form-control";
import { ImageUploader } from "@/components/ui/image-uploader";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useZodError } from "@/lib/zod/use-zod-error";
import { submitApplicationAction } from "./actions";
import { type ApplicationFormInput, applicationFormSchema } from "./schema";

const MIN_AGE = 8;

export const ApplicationForm = () => {
  const [firstName, setFirstName] =
    useState<ApplicationFormInput["firstName"]>("");
  const [lastName, setLastName] =
    useState<ApplicationFormInput["lastName"]>("");
  const [email, setEmail] = useState<ApplicationFormInput["email"]>("");
  const [age, setAge] = useState<ApplicationFormInput["age"]>([MIN_AGE]);
  const [file, setFile] = useState<ApplicationFormInput["file"]>(null);
  const [timeSlot, setTimeSlot] =
    useState<ApplicationFormInput["timeSlot"]>("");
  const isSubmitButtonDisabled =
    !firstName || !lastName || !email || !file || !timeSlot;

  const { setZodError, getErrorMessage } =
    useZodError<keyof ApplicationFormInput>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setZodError(null);
    try {
      const parsed: ApplicationFormInput = applicationFormSchema.parse({
        firstName,
        lastName,
        email,
        age,
        file,
        timeSlot,
      });
      await submitApplicationAction(parsed);
    } catch (e) {
      if (e instanceof ZodError) {
        setZodError(e);
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="font-medium text-2xl">Personal info</h1>
      <div className="mt-8 grid gap-y-6 sm:gap-y-0">
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

        <FormControl label="Age" errorMessage={getErrorMessage("age")}>
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
          <FormControl label={"Date"}>
            <Calendar mode="single" />
          </FormControl>
          <FormControl label={"Time"}>
            <TimeSlotRadioGroup
              selectedTimeSlot={timeSlot}
              onChange={setTimeSlot}
            />
          </FormControl>
        </div>
      </div>
      <Button
        type="submit"
        className={"mt-8 w-full"}
        disabled={isSubmitButtonDisabled}
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
const TimeSlotRadioGroup = ({
  selectedTimeSlot,
  onChange,
}: {
  selectedTimeSlot: string;
  onChange: (value: string) => void;
}) => (
  <RadioGroup
    className="grid grid-cols-4 gap-2 sm:mt-0 sm:grid-cols-1"
    onValueChange={(value) => onChange(value)}
  >
    {timeSlotOptions.map((option) => (
      <Fragment key={option.value}>
        <RadioGroupItem
          id={option.value}
          value={option.value}
          className={"sr-only"}
        />
        <label
          htmlFor={option.value}
          className={cn(
            "grid h-[46px] cursor-pointer place-items-center rounded-md bg-white text-base transition-[box-shadow]",
            "shadow-[inset_0_0_0_1px_theme(colors.purple.300)]",
            selectedTimeSlot === option.value &&
              "shadow-[inset_0_0_0_2px_theme(colors.purple.700)]",
          )}
        >
          {option.label}
        </label>
      </Fragment>
    ))}
  </RadioGroup>
);
