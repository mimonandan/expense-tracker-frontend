"use client";

import { Expense } from "@/types/expense";

interface ExpenseCardProps {
  expense: Expense;

  editingId: number | null;

  editAmount: string;
  editCategory: string;

  onEditAmountChange: (
    value: string
  ) => void;

  onEditCategoryChange: (
    value: string
  ) => void;

  onStartEdit: (
    expense: Expense
  ) => void;

  onUpdate: (
    id: number
  ) => void;

  onCancelEdit: () => void;

  onDelete: (
    id: number
  ) => void;
}

export default function ExpenseCard({
  expense,
  editingId,
  editAmount,
  editCategory,
  onEditAmountChange,
  onEditCategoryChange,
  onStartEdit,
  onUpdate,
  onCancelEdit,
  onDelete
}: ExpenseCardProps) {

  const isEditing =
    editingId === expense.id;

  return (

    <div style={styles.card}>

      {isEditing ? (

        // =========================
        // EDIT MODE
        // =========================

        <div style={styles.editContainer}>

          <input
            style={styles.input}
            type="number"
            value={editAmount}
            onChange={(e) =>
              onEditAmountChange(
                e.target.value
              )
            }
          />

          <input
            style={styles.input}
            type="text"
            value={editCategory}
            onChange={(e) =>
              onEditCategoryChange(
                e.target.value
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
                onUpdate(expense.id)
              }
            >
              Save
            </button>

            <button
              style={
                styles.cancelButton
              }
              onClick={
                onCancelEdit
              }
            >
              Cancel
            </button>

          </div>

        </div>

      ) : (

        // =========================
        // VIEW MODE
        // =========================

        <>

          <div>

            <p
              style={
                styles.category
              }
            >
              {expense.category}
            </p>

            <p
              style={
                styles.amount
              }
            >
              ₹{expense.amount}
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
                onStartEdit(
                  expense
                )
              }
            >
              Edit
            </button>

            <button
              style={
                styles.deleteButton
              }
              onClick={() =>
                onDelete(
                  expense.id
                )
              }
            >
              Delete
            </button>

          </div>

        </>

      )}

    </div>
  );
}

const styles: any = {

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

  editContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    width: "100%"
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 14
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
  }
};