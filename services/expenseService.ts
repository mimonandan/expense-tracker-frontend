import api from "@/lib/axios";

export async function getExpenses() {
  const res = await api.get("/expense");
  return res.data.data;
}