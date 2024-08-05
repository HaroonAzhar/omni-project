const getAdvance = ({ drawdownAdvances = [], index, getFirstAdvance }) =>
  [getFirstAdvance(), ...drawdownAdvances][index] || 0;

export default getAdvance;
