"use client";

import { useEffect, useState } from "react";
import { getExpenses } from "@/services/expenseService";
import { logout } from "@/lib/auth";

export default function Home() {
  const [expenses, setExpenses] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    async function load() {
      const res = await getExpenses();
      setExpenses(res.items);
    }

    load();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Expenses</h2>
        <button style={styles.logout} onClick={logout}>Logout</button>
      </div>

      <div style={styles.list}>
        {expenses.map((e) => (
          <div key={e.id} style={styles.card}>
            <p><b>{e.category}</b></p>
            <p>₹{e.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: 20 },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logout: {
    padding: "6px 12px",
    background: "red",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer"
  },
  list: {
    marginTop: 20,
    display: "grid",
    gap: 10
  },
  card: {
    padding: 15,
    borderRadius: 8,
    background: "#f1f2f6",
    display: "flex",
    justifyContent: "space-between"
  }
};