"use client";
import { Button, Callout, TextArea, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
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
  const [error, setError] = useState("");
  console.log(register("title"));

  return (
    // 이슈 생성은 HTTP POST method임
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form
        className="max-w-xl space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data); // promise 를 return 하므로 Async await 추가
            router.push("/issues");
          } catch (error) {
            setError("예상치 못한 오류 발생");
          }
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
    </div>
  );
};

export default NewIssuePage;
