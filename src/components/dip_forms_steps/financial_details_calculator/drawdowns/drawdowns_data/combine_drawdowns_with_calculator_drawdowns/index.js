const combineDrawdownsWithCalculatorDrawdowns = ({
  drawdowns,
  getCalculatorDrawdowns = () => {},
}) => {
  const calculatorDrawdowns = getCalculatorDrawdowns();
  if (calculatorDrawdowns && calculatorDrawdowns.length > 0) {
    return calculatorDrawdowns.map((calculatorDrawdown, index) => {
      const { advance: newAdvance = null } = drawdowns[index] || {};
      const advance = index === 0 ? calculatorDrawdown.advance : newAdvance;
      return {
        ...calculatorDrawdown,
        ...drawdowns[index],
        advance,
      };
    });
  }

  return drawdowns;
};

export default combineDrawdownsWithCalculatorDrawdowns;
