import map_transaction_to_balance from "../map_transaction_to_balance";

describe("map transaction to balance effects", () => {
  it("Redemption/Payment", () => {
    const TransactionType = "Early Redemption";

    const expected = {
      BalanceEffect: "Reduce",
      TransactionType,
    };
    const mapped = map_transaction_to_balance(TransactionType);

    expect(mapped).toEqual(expected);
  });

  it("Fees", () => {
    const TransactionType = "Legal Fees";

    const expected = {
      BalanceEffect: "Increase",
      TransactionType,
    };
    const mapped = map_transaction_to_balance(TransactionType);

    expect(mapped).toEqual(expected);
  });

  it("Drawdown", () => {
    const TransactionType = "Drawdown";

    const expected = {
      BalanceEffect: "Increase",
      TransactionType,
    };
    const mapped = map_transaction_to_balance(TransactionType);

    expect(mapped).toEqual(expected);
  });

  describe("Adjustments", () => {
    it("Write Off", () => {
      const TransactionType = "Write Off";
      const expected = {
        BalanceEffect: "Reduce",
        TransactionType,
      };
      const mapped = map_transaction_to_balance(TransactionType);

      expect(mapped).toEqual(expected);
    });
    it("Interest Rebate (Manual)", () => {
      const TransactionType = "Interest Rebate (Manual)";
      const expected = {
        BalanceEffect: "Reduce",
        TransactionType,
      };
      const mapped = map_transaction_to_balance(TransactionType);

      expect(mapped).toEqual(expected);
    });

    it("Ad-Hoc Cost", () => {
      const TransactionType = "Ad-Hoc Cost";
      const expected = {
        BalanceEffect: "Increase",
        TransactionType,
      };
      const mapped = map_transaction_to_balance(TransactionType);

      expect(mapped).toEqual(expected);
    });

    it("Ad-Hoc Balance Reduction", () => {
      const TransactionType = "Ad-Hoc Balance Reduction";
      const expected = {
        BalanceEffect: "Reduce",
        TransactionType,
      };
      const mapped = map_transaction_to_balance(TransactionType);

      expect(mapped).toEqual(expected);
    });

    it("Import Adjustment - Balance Reduction", () => {
      const TransactionType = "Import Adjustment - Balance Reduction";
      const expected = {
        BalanceEffect: "Reduce",
        TransactionType: "Import Adjustment",
      };
      const mapped = map_transaction_to_balance(TransactionType);

      expect(mapped).toEqual(expected);
    });

    it("Import Adjustment - Balance Increase", () => {
      const TransactionType = "Import Adjustment - Balance Increase";
      const expected = {
        BalanceEffect: "Increase",
        TransactionType: "Import Adjustment",
      };
      const mapped = map_transaction_to_balance(TransactionType);

      expect(mapped).toEqual(expected);
    });
  });
});
