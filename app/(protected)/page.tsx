"use client";

import { useState } from "react";

import Navbar from "@/components/navbar";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseCard from "@/components/ExpenseCard";

import { useExpenses } from "@/hooks/useExpenses";
import { useAuth } from "@/hooks/useAuth";

import { Expense } from "@/types/expense";

export default function Home() {

  // =========================
  // AUTHENTICATION
  // =========================

  const {
    user
  } = useAuth();


  // =========================
  // EXPENSE HOOK
  // =========================

  const {
    expenses,
    loading: expenseLoading,
    error,
    addExpense,
    editExpense,
    removeExpense
  } = useExpenses();


  // =========================
  // ADD EXPENSE FORM STATE
  // =========================

  const [amount, setAmount] =
    useState("");

  const [category, setCategory] =
    useState("");


  // =========================
  // EDIT EXPENSE STATE
  // =========================

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [editAmount, setEditAmount] =
    useState("");

  const [editCategory, setEditCategory] =
    useState("");
    
  // =========================
  // ADD EXPENSE
  // =========================

  async function handleAddExpense(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();

    // Basic frontend validation

    if (!amount.trim()) {
      return;
    }

    if (!category.trim()) {
      return;
    }

    const numericAmount =
      Number(amount);

    if (
      Number.isNaN(numericAmount) ||
      numericAmount <= 0
    ) {
      return;
    }

    try {

      await addExpense(
        numericAmount,
        category.trim()
      );

      // Clear form after successful add

      setAmount("");
      setCategory("");

    } catch {

      /*
       * Error is already handled by
       * useExpenses().
       */
    }
  }


  // =========================
  // START EDIT
  // =========================

  function startEdit(
    expense: Expense
  ) {

    setEditingId(
      expense.id
    );

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

    if (!editAmount.trim()) {
      return;
    }

    if (!editCategory.trim()) {
      return;
    }

    const numericAmount =
      Number(editAmount);

    if (
      Number.isNaN(numericAmount) ||
      numericAmount <= 0
    ) {
      return;
    }

    try {

      await editExpense(
        id,
        numericAmount,
        editCategory.trim()
      );

      // Exit edit mode

      setEditingId(null);
      setEditAmount("");
      setEditCategory("");

    } catch {

      /*
       * Error is already handled
       * by useExpenses().
       */
    }
  }


  // =========================
  // CANCEL EDIT
  // =========================

  function cancelEdit() {

    setEditingId(null);

    setEditAmount("");

    setEditCategory("");
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

    if (!confirmed) {
      return;
    }

    try {

      await removeExpense(id);

    } catch {

      /*
       * Error is already handled
       * by useExpenses().
       */
    }
  }


  // =========================
  // PAGE
  // =========================

  return (

    <div style={styles.page}>

      {/* =========================
          NAVBAR
      ========================== */}

      <Navbar />


      {/* =========================
          MAIN CONTENT
      ========================== */}

      <main style={styles.container}>

        {/* WELCOME */}

        <section style={styles.welcome}>

          <div>

            <h1 style={styles.title}>
              ExpenseFlow
            </h1>

            <p style={styles.subtitle}>
              Welcome back,{" "}
              <strong>
                {user?.name}
              </strong>
              . Track your spending
              effortlessly.
            </p>

          </div>

          <div style={styles.userBadge}>

            <span style={styles.userIcon}>
              👤
            </span>

            <div>

              <div style={styles.userName}>
                {user?.name}
              </div>

              <div style={styles.userRole}>
                {user?.role}
              </div>

            </div>

          </div>

        </section>


        {/* =========================
            ADD EXPENSE
        ========================== */}

        <section style={styles.formSection}>

          <div style={styles.sectionHeader}>

            <div>

              <h2 style={styles.sectionTitle}>
                Add Expense
              </h2>

              <p style={styles.sectionSubtitle}>
                Record a new expense to keep
                your finances up to date.
              </p>

            </div>

          </div>

          <ExpenseForm
            amount={amount}
            category={category}
            loading={expenseLoading}
            onAmountChange={
              setAmount
            }
            onCategoryChange={
              setCategory
            }
            onSubmit={
              handleAddExpense
            }
          />

        </section>


        {/* =========================
            ERROR
        ========================== */}

        {error && (

          <div style={styles.error}>

            <span>
              ⚠️
            </span>

            <span>
              {error}
            </span>

          </div>

        )}


        {/* =========================
            EXPENSES HEADER
        ========================== */}

        <section style={styles.expensesSection}>

          <div style={styles.sectionHeader}>

            <div>

              <h2 style={styles.sectionTitle}>
                Your Expenses
              </h2>

              <p style={styles.sectionSubtitle}>
                {expenses.length}{" "}
                {expenses.length === 1
                  ? "expense"
                  : "expenses"}{" "}
                recorded
              </p>

            </div>

          </div>


          {/* =========================
              LOADING
          ========================== */}

          {expenseLoading &&
            expenses.length === 0 && (

              <div style={styles.loading}>
                Loading expenses...
              </div>

            )}


          {/* =========================
              EMPTY STATE
          ========================== */}

          {!expenseLoading &&
            expenses.length === 0 && (

              <div style={styles.empty}>

                <div style={styles.emptyIcon}>
                  💰
                </div>

                <h3 style={styles.emptyTitle}>
                  No expenses yet
                </h3>

                <p style={styles.emptyText}>
                  Start by adding your first
                  expense above.
                </p>

              </div>

            )}


          {/* =========================
              EXPENSE LIST
          ========================== */}

          {expenses.length > 0 && (

            <div style={styles.list}>

              {expenses.map(
                (expense) => (

                  <ExpenseCard
                    key={expense.id}

                    expense={expense}

                    editingId={
                      editingId
                    }

                    editAmount={
                      editAmount
                    }

                    editCategory={
                      editCategory
                    }

                    onEditAmountChange={
                      setEditAmount
                    }

                    onEditCategoryChange={
                      setEditCategory
                    }

                    onStartEdit={
                      startEdit
                    }

                    onUpdate={
                      handleUpdate
                    }

                    onCancelEdit={
                      cancelEdit
                    }

                    onDelete={
                      handleDelete
                    }
                  />

                )
              )}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}


// =========================
// STYLES
// =========================

const styles: any = {

  page: {
    minHeight: "100vh",
    background: "#f5f7fb"
  },

  container: {
    maxWidth: 1000,
    margin: "0 auto",
    padding: "35px 25px"
  },

  welcome: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    marginBottom: 30,
    padding: 25,
    background: "#ffffff",
    borderRadius: 14,
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.06)"
  },

  title: {
    margin: 0,
    fontSize: 32,
    fontWeight: 800,
    letterSpacing: "-0.5px"
  },

  subtitle: {
    marginTop: 8,
    marginBottom: 0,
    color: "#6b7280",
    fontSize: 15
  },

  userBadge: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 14px",
    borderRadius: 10,
    background: "#f5f7fb"
  },

  userIcon: {
    fontSize: 22
  },

  userName: {
    fontWeight: 700,
    fontSize: 14
  },

  userRole: {
    marginTop: 2,
    fontSize: 12,
    color: "#6b7280"
  },

  formSection: {
    background: "#ffffff",
    padding: 25,
    borderRadius: 14,
    marginBottom: 25,
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.06)"
  },

  expensesSection: {
    marginTop: 25
  },

  sectionHeader: {
    marginBottom: 18
  },

  sectionTitle: {
    margin: 0,
    fontSize: 21,
    fontWeight: 700
  },

  sectionSubtitle: {
    marginTop: 5,
    marginBottom: 0,
    color: "#6b7280",
    fontSize: 14
  },

  error: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: 12,
    marginBottom: 20,
    borderRadius: 8,
    background: "#ffe5e5",
    color: "#d63031",
    fontSize: 14
  },

  loadingPage: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f7fb"
  },

  loadingCard: {
    textAlign: "center",
    padding: 30,
    background: "#fff",
    borderRadius: 12,
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.06)"
  },

  spinner: {
    fontSize: 28
  },

  loading: {
    padding: 30,
    textAlign: "center",
    color: "#6b7280",
    background: "#ffffff",
    borderRadius: 12
  },

  empty: {
    padding: 45,
    textAlign: "center",
    background: "#ffffff",
    borderRadius: 14,
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.06)"
  },

  emptyIcon: {
    fontSize: 45,
    marginBottom: 10
  },

  emptyTitle: {
    margin: 0,
    fontSize: 20
  },

  emptyText: {
    marginTop: 7,
    color: "#6b7280"
  },

  list: {
    display: "grid",
    gap: 15
  }
};