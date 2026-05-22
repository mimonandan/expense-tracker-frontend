"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/navbar";

import {
  getExpenses,
  createExpense,
  deleteExpense,
  updateExpense
} from "@/services/expenseService";

export default function Home() {

  // =========================
  // STATES
  // =========================

  const [expenses, setExpenses] =
    useState<any[]>([]);

  const [amount, setAmount] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // Edit states

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [editAmount, setEditAmount] =
    useState("");

  const [editCategory, setEditCategory] =
    useState("");

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {

    const token =
      localStorage.getItem(
        "accessToken"
      );

    if (!token) {
      window.location.href =
        "/login";
      return;
    }

    loadExpenses();

  }, []);

  // =========================
  // LOAD EXPENSES
  // =========================

  async function loadExpenses() {

    try {

      const res =
        await getExpenses();

      setExpenses(res.items);

    } catch (err: any) {

      console.log(
        "LOAD ERROR:",
        err
      );

      setError(
        err.response?.data?.error ||
        err.message
      );
    }
  }

  // =========================
  // ADD EXPENSE
  // =========================

  async function handleAddExpense(
    e: any
  ) {

    e.preventDefault();

    try {

      setLoading(true);

      setError("");

      await createExpense(
        Number(amount),
        category
      );

      await loadExpenses();

      // clear form

      setAmount("");
      setCategory("");

    } catch (err: any) {

      console.log(
        "ADD ERROR:",
        err
      );

      setError(
        err.response?.data?.error ||
        err.message
      );

    } finally {

      setLoading(false);

    }
  }

  // =========================
  // DELETE EXPENSE
  // =========================

  async function handleDelete(
    id: number
  ) {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this expense?"
      );

    if (!confirmed) return;

    try {

      await deleteExpense(id);

      await loadExpenses();

    } catch (err: any) {

      console.log(
        "DELETE ERROR:",
        err
      );

      setError(
        err.response?.data?.error ||
        err.message
      );
    }
  }

  // =========================
  // START EDIT
  // =========================

  function startEdit(expense: any) {

    setEditingId(expense.id);

    setEditAmount(
      expense.amount.toString()
    );

    setEditCategory(
      expense.category
    );
  }

  // =========================
  // UPDATE EXPENSE
  // =========================

  async function handleUpdate(
    id: number
  ) {

    try {

      await updateExpense(
        id,
        Number(editAmount),
        editCategory
      );

      setEditingId(null);

      await loadExpenses();

    } catch (err: any) {

      console.log(
        "UPDATE ERROR:",
        err
      );

      setError(
        err.response?.data?.error ||
        err.message
      );
    }
  }

  // =========================
  // UI
  // =========================

  return (

    <div style={styles.page}>

      {/* NAVBAR */}

      <Navbar />

      {/* CONTENT */}

      <div style={styles.container}>

        {/* ADD FORM */}

        <form
          onSubmit={
            handleAddExpense
          }
          style={styles.form}
        >

          <input
            style={styles.input}
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) =>
              setAmount(
                e.target.value
              )
            }
          />

          <input
            style={styles.input}
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
          />

          <button
            style={styles.addButton}
            type="submit"
          >

            {loading
              ? "Adding..."
              : "Add Expense"}

          </button>

        </form>

        {/* ERROR */}

        {error && (
          <p style={styles.error}>
            {error}
          </p>
        )}

        {/* EMPTY STATE */}

        {expenses.length === 0 && (

          <div style={styles.empty}>
            No expenses found
          </div>

        )}

        {/* EXPENSE LIST */}

        <div style={styles.list}>

          {expenses.map((e) => (

            <div
              key={e.id}
              style={styles.card}
            >

              {editingId === e.id ? (

                // EDIT MODE

                <div
                  style={
                    styles.editContainer
                  }
                >

                  <input
                    style={styles.input}
                    type="number"
                    value={editAmount}
                    onChange={(ev) =>
                      setEditAmount(
                        ev.target.value
                      )
                    }
                  />

                  <input
                    style={styles.input}
                    type="text"
                    value={editCategory}
                    onChange={(ev) =>
                      setEditCategory(
                        ev.target.value
                      )
                    }
                  />

                  <div
                    style={
                      styles.actionButtons
                    }
                  >

                    <button
                      style={
                        styles.saveButton
                      }
                      onClick={() =>
                        handleUpdate(
                          e.id
                        )
                      }
                    >
                      Save
                    </button>

                    <button
                      style={
                        styles.cancelButton
                      }
                      onClick={() =>
                        setEditingId(
                          null
                        )
                      }
                    >
                      Cancel
                    </button>

                  </div>

                </div>

              ) : (

                // VIEW MODE

                <>

                  <div>

                    <p
                      style={
                        styles.category
                      }
                    >
                      {e.category}
                    </p>

                    <p
                      style={
                        styles.amount
                      }
                    >
                      ₹{e.amount}
                    </p>

                  </div>

                  <div
                    style={
                      styles.actionButtons
                    }
                  >

                    <button
                      style={
                        styles.editButton
                      }
                      onClick={() =>
                        startEdit(e)
                      }
                    >
                      Edit
                    </button>

                    <button
                      style={
                        styles.deleteButton
                      }
                      onClick={() =>
                        handleDelete(
                          e.id
                        )
                      }
                    >
                      Delete
                    </button>

                  </div>

                </>

              )}

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

// =========================
// STYLES
// =========================

const styles: any = {

  page: {
    minHeight: "100vh",
    background: "#f5f6fa"
  },

  container: {
    padding: 30
  },

  form: {
    display: "flex",
    gap: 10,
    marginBottom: 20
  },

  input: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 14
  },

  addButton: {
    padding: "12px 20px",
    background: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: "bold"
  },

  error: {
    color: "red",
    marginBottom: 20
  },

  empty: {
    background: "#fff",
    padding: 30,
    borderRadius: 10,
    textAlign: "center",
    color: "#777"
  },

  list: {
    display: "grid",
    gap: 15
  },

  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 10,
    boxShadow:
      "0 3px 10px rgba(0,0,0,0.08)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  category: {
    margin: 0,
    fontSize: 18,
    fontWeight: "bold"
  },

  amount: {
    marginTop: 5,
    color: "#2f3542",
    fontSize: 16
  },

  actionButtons: {
    display: "flex",
    gap: 10
  },

  editButton: {
    padding: "8px 12px",
    background: "#ffa502",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer"
  },

  deleteButton: {
    padding: "8px 12px",
    background: "#ff4757",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer"
  },

  saveButton: {
    padding: "8px 12px",
    background: "#2ed573",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer"
  },

  cancelButton: {
    padding: "8px 12px",
    background: "#747d8c",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer"
  },

  editContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    width: "100%"
  }
};