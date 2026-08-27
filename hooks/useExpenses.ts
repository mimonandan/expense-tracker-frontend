"use client";

import { useCallback, useEffect, useState } from "react";

import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense
} from "@/services/expenseService";

import { Expense } from "@/types/expense";

export function useExpenses() {

  // =========================
  // STATE
  // =========================

  const [expenses, setExpenses] =
    useState<Expense[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  // =========================
  // LOAD EXPENSES
  // =========================

  const loadExpenses =
    useCallback(async () => {

      try {

        setLoading(true);
        setError("");

        const response =
          await getExpenses();

        setExpenses(
          response.items
        );

      } catch (err: any) {

        console.error(
          "LOAD EXPENSES ERROR:",
          err
        );

        setError(
          err.response?.data?.error ||
          err.message ||
          "Failed to load expenses"
        );

      } finally {

        setLoading(false);

      }

    }, []);


  // =========================
  // ADD EXPENSE
  // =========================

  const addExpense =
    useCallback(
      async (
        amount: number,
        category: string
      ) => {

        try {

          setError("");

          await createExpense(
            amount,
            category
          );

          await loadExpenses();

        } catch (err: any) {

          console.error(
            "ADD EXPENSE ERROR:",
            err
          );

          const message =
            err.response?.data?.error ||
            err.message ||
            "Failed to add expense";

          setError(message);

          throw err;
        }

      },
      [loadExpenses]
    );


  // =========================
  // UPDATE EXPENSE
  // =========================

  const editExpense =
    useCallback(
      async (
        id: number,
        amount: number,
        category: string
      ) => {

        try {

          setError("");

          await updateExpense(
            id,
            amount,
            category
          );

          await loadExpenses();

        } catch (err: any) {

          console.error(
            "UPDATE EXPENSE ERROR:",
            err
          );

          const message =
            err.response?.data?.error ||
            err.message ||
            "Failed to update expense";

          setError(message);

          throw err;
        }

      },
      [loadExpenses]
    );


  // =========================
  // DELETE EXPENSE
  // =========================

  const removeExpense =
    useCallback(
      async (
        id: number
      ) => {

        try {

          setError("");

          await deleteExpense(id);

          await loadExpenses();

        } catch (err: any) {

          console.error(
            "DELETE EXPENSE ERROR:",
            err
          );

          const message =
            err.response?.data?.error ||
            err.message ||
            "Failed to delete expense";

          setError(message);

          throw err;
        }

      },
      [loadExpenses]
    );


  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);


  // =========================
  // RETURN
  // =========================

  return {
    expenses,
    loading,
    error,

    loadExpenses,
    addExpense,
    editExpense,
    removeExpense
  };
}