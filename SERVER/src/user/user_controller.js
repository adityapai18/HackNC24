import { addTransaction } from "./user_service.js";

export const addExpense = async (req, res) => {
  const result = await addTransaction(req.body);
  console.log(result)
// console.log(req.body)÷÷
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(401).json(result.error);
  }
};
