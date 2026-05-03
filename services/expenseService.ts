import { apiRequest } from "@/lib/api";

export async function getExpenses() {
  const res = await apiRequest("/expense");
  return res.data;
}