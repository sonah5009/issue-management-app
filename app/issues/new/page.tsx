"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import axios from "axios"; // 데이터 요청에 사용하는 Axios 패키지
interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  // input 태그에 입력된 데이터 변경 사항 추정 및 제출에 사용됨
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();
  console.log(register("title"));

  return (
    // 이슈 생성은 HTTP POST method임
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/issues", data); // promise 를 return 하므로 Async await 추가
        router.push("/issues");
      })}>
      <TextField.Root>
        <TextField.Input placeholder="Title" {...register("title")} />
      </TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />
      <Button>Create New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
