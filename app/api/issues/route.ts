import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

// 앱의 크기가 증가할 수록 스키마의 종류도 증가 -> 구체적인 이름(변수명)으로 작성
// zod 라이브러리의 오브젝트 메소들를 통해 유효성 검사 스키마 작성
// title, diescription 만 기본값 존재 x 니까, 이것만 스키마 작성
const createIssueSchema = z.object({
  title: z.string().min(1, "글자가 짧아요").max(255),
  description: z.string().min(1),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);
  // safeParse 메소드: 유효성 검사 실패시 시스템을 멈추는 대신에, 오류 정보가 담긴 객체를 return

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  //  safeParse
  // 유효성 검사 성공: success: true
  // 유효성 검사 실패: success: false
  // 오류 메시지: error.errors

  //  성공하면 => CreatePrismaCreate 메소드를 통해 이슈 생성하자
  // 그 전에 현재 앱에서 모든 API가 동일한 Prisma 인스턴스와 상호작용할 수 있도록 PrismaClientInstance 생성하자
  // prisma/client.ts 참고
  const newIssue = await prisma?.issue.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
