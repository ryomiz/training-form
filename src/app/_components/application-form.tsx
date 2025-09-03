"use client";
import { Fragment, useState } from "react";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ImageUploader } from "@/components/ui/image-uploader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const timeSlotOptions = [
  {
    value: "1200",
    label: "12:00",
  },
  {
    value: "1400",
    label: "14:00",
  },
  {
    value: "1630",
    label: "16:30",
  },
  {
    value: "1830",
    label: "18:30",
  },
  {
    value: "2000",
    label: "20:00",
  },
];

const schema = z.object({
  firstName: z.string().nonempty("First Name is Required"),
  lastName: z.string().nonempty("Last Name is Required"),
  email: z
    .email("Please use correct formatting.\nExample: address@email.com")
    .nonempty("Email is Required"),
  timeSlot: z.string().nonempty("Please Select TimeSlot"),
  file: z.custom<File | null>(),
  age: z.number().array(),
});
type FormInput = z.infer<typeof schema>;

export const ApplicationForm = () => {
  const [formInput, setFormInput] = useState<FormInput>({
    firstName: "",
    lastName: "",
    email: "",
    timeSlot: "",
    file: null,
    age: [20],
  });
  const setValue = <K extends keyof FormInput>(key: K, value: FormInput[K]) => {
    setFormInput((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(formInput);
      }}
    >
      <h1 className={"mt-8 font-medium text-2xl"}>Personal info</h1>
      <div className={"mt-8 grid gap-y-6"}>
        <div>
          <p>First Name</p>
          <Input
            placeholder={"input"}
            value={formInput.firstName}
            onChange={(e) => setValue("firstName", e.target.value)}
          />
        </div>

        <div>
          <p>Last Name</p>
          <Input
            placeholder={"input"}
            value={formInput.lastName}
            onChange={(e) => setValue("lastName", e.target.value)}
          />
        </div>

        <div>
          <p>Email Address</p>
          <Input
            placeholder={"input"}
            onChange={(e) => setValue("email", e.target.value)}
          />
        </div>

        <Slider
          value={formInput.age}
          min={8}
          max={100}
          step={1}
          onValueChange={(value) => setValue("age", value)}
        />

        <ImageUploader
          file={formInput.file}
          onChange={(file) => setValue("file", file)}
          onDelete={() => setValue("file", null)}
        />

        <div
          className={
            "grid grid-rows-[auto_auto] items-start sm:grid-cols-[auto_76px] sm:grid-rows-1"
          }
        >
          <Calendar mode="single" />
          <RadioGroup
            defaultValue={formInput.timeSlot}
            onValueChange={(value) => setValue("timeSlot", value)}
            className={"mt-6 grid grid-cols-4 gap-2 sm:mt-0 sm:grid-cols-1"}
          >
            {timeSlotOptions.map((option) => (
              <Fragment key={option.value}>
                <RadioGroupItem
                  value={option.value}
                  id={option.value}
                  className={"sr-only"}
                />
                <Label
                  htmlFor={option.value}
                  className={cn(
                    "grid h-[46px] cursor-pointer place-items-center rounded-md bg-white text-base transition-[box-shadow]e",
                    "shadow-[inset_0_0_0_1px_theme(colors.purple.300)]",
                    formInput.timeSlot === option.value &&
                      "shadow-[inset_0_0_0_2px_theme(colors.purple.700)]",
                  )}
                >
                  {option.label}
                </Label>
              </Fragment>
            ))}
          </RadioGroup>
        </div>

        <Button type={"submit"}>Send Application</Button>
      </div>
    </form>
  );
};
