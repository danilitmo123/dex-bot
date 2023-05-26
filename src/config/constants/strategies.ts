const strategiesCfg = [
  {
    id: 0,
    type_operations: "buy",
    user_operation: "buy",
    bot_operation: "sell",
    min_base_price: 0.3,
    max_base_price: 1,
    fill_percent: 38,
    min_remaining: 0.5,
  },
  {
    id: 1,
    type_operations: "buy",
    user_operation: "buy",
    bot_operation: "sell",
    min_base_price: 0.5,
    max_base_price: 1.5,
    fill_percent: 38,
    min_remaining: 0.4,
  },
  {
    id: 2,
    type_operations: "sell",
    user_operation: "buy",
    bot_operation: "sell",
    min_base_price: 0.2,
    max_base_price: 2,
    fill_percent: 38,
    min_remaining: 0.3,
  },
];

export default strategiesCfg;
