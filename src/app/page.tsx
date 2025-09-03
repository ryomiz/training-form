"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/ui/image-uploader";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [age, setAge] = useState([20]);
  return (
    <div>
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
