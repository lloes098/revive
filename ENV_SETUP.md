# 환경 변수 설정 가이드

## Supabase 키 확인 방법

1. [Supabase Dashboard](https://app.supabase.com)에 로그인
2. 프로젝트 선택
3. **Settings** > **API** 메뉴로 이동
4. **Project API keys** 섹션에서 확인:

### ✅ 사용해야 하는 키 (브라우저에서 사용 가능)
- **`anon` `public`** 키를 사용하세요
- 이 키는 `NEXT_PUBLIC_SUPABASE_ANON_KEY`에 넣어야 합니다

### ❌ 사용하면 안 되는 키 (브라우저에서 사용 불가)
- **`service_role` `secret`** 키는 절대 사용하지 마세요
- 이 키를 브라우저에서 사용하면 "Forbidden use of secret API key" 에러가 발생합니다

## .env.local 파일 예시

```env
# ✅ 올바른 설정
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (anon public key)

# ❌ 잘못된 설정 (절대 사용하지 마세요!)
# NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (service_role key)
```

## 키 확인 방법

Supabase Dashboard의 API 설정 페이지에서:
- **`anon` `public`** 라벨이 있는 키 → ✅ 사용 가능
- **`service_role` `secret`** 라벨이 있는 키 → ❌ 사용 불가

## 문제 해결

에러 메시지: "Forbidden use of secret API key in browser"
→ `.env.local` 파일의 `NEXT_PUBLIC_SUPABASE_ANON_KEY` 값을 `anon` `public` 키로 변경하세요.

