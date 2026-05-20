import api from "@/lib/axios";

export async function getExpenses() {
  const res = await api.get("/expense");

  return res.data.data;
}

export async function createExpense(
  amount: number,
  category: string
) {
  const res = await api.post("/expense", {
    amount,
    category
  });

  return res.data.data;
}

export async function deleteExpense(id: number) {

  const res = await api.delete(
    `/expense/${id}`
  );

  return res.data;
}

export async function updateExpense(
  id: number,
  amount: number,
  category: string
) {

  const res = await api.patch(
    `/expense/${id}`,
    {
      amount,
      category
    }
  );

  return res.data.data;
}