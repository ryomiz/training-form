"use client";

import { RadioGroup } from "@radix-ui/react-radio-group";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ImageUploader } from "@/components/ui/image-uploader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const options = [
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

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [age, setAge] = useState([20]);
  const [value, setValue] = useState<(typeof options)[number]["value"]>(
    options[0].value,
  );
  return (
    <div>
      <RadioGroup defaultValue={value} onValueChange={(val) => setValue(val)}>
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem
              value={option.value}
              id={option.value}
              className={"sr-only"}
            />
            <Label
              htmlFor={option.value}
              className={cn(
                "grid h-[46px] w-[76px] cursor-pointer place-items-center rounded-md border border-purple-300 bg-white text-base",
                "shadow-[inset_0_0_0_1px_theme(colors.purple.300)]",
                value === option.value &&
                  "shadow-[inset_0_0_0_2px_theme(colors.purple.700)]",
              )}
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
      <Calendar mode="single" />
      <ImageUploader
        file={file}
        onChange={(file) => setFile(file)}
        onDelete={() => setFile(null)}
      />
      <Slider
        value={age}
        min={8}
        max={100}
        step={1}
        onValueChange={(val) => setAge(val)}
      />
      <h1 className={"mt-8 font-medium text-2xl"}>Personal info</h1>
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
