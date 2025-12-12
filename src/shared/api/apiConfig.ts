// API base URL 설정
// 개발 환경에서는 Vite proxy를 통해 /api로 요청
// 프로덕션 환경에서는 직접 dummyjson.com으로 요청
export const API_BASE_URL = import.meta.env.PROD 
  ? "https://dummyjson.com" 
  : "/api"

