export const state = {
  userBalance: 10,
  bandwidthUsed: 0.15 * 1e9,
  isPlanExpired: false,
};

export const resetPlan = () => {
  state.userBalance = 10;
  state.bandwidthUsed = 0.15 * 1e9;
  state.isPlanExpired = false;
};
