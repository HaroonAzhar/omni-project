import createDecorator from "final-form-calculate";

const calculateNet = (asset) =>
  Number(asset.gross_value || 0) - Number(asset.outstanding_debt || 0);

const netCalculator = createDecorator({
  field: /(gross_value|outstanding_debt)/,
  updates: {
    net_value: (_, asset) => calculateNet(asset),
  },
});

export default netCalculator;
