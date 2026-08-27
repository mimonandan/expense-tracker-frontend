"use client";

interface ExpenseFormProps {
  amount: string;
  category: string;
  loading: boolean;
  onAmountChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function ExpenseForm({
  amount,
  category,
  loading,
  onAmountChange,
  onCategoryChange,
  onSubmit
}: ExpenseFormProps) {

  return (
    <form
      onSubmit={onSubmit}
      style={styles.form}
    >

      {/* AMOUNT */}

      <input
        style={styles.input}
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) =>
          onAmountChange(e.target.value)
        }
      />

      {/* CATEGORY */}

      <input
        style={styles.input}
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) =>
          onCategoryChange(e.target.value)
        }
      />

      {/* SUBMIT */}

      <button
        style={
          loading
            ? styles.buttonDisabled
            : styles.button
        }
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Adding..."
          : "Add Expense"}
      </button>

    </form>
  );
}

const styles: any = {

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

  button: {
    padding: "12px 20px",
    background: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: "bold"
  },

  buttonDisabled: {
    padding: "12px 20px",
    background: "#9bbce8",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "not-allowed",
    fontWeight: "bold"
  }
};