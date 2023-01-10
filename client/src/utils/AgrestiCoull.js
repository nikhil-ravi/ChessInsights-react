// def AgrestiCoullLower(n, k):
//     conf = 0.05
//     kappa = 2.24140273
//     kest = k+(kappa**2)/2
//     nest = n+kappa**2
//     pest = kest/nest
//     radius = kappa * np.sqrt(pest*(1-pest)/nest)
//     return max(0, pest-radius)

export const AgrestiCoullLower = ({ total, wins }) => {
  //   const conf = 0.05;
  const kappa = 2.24140273; // In general, kappa = ierfc(conf/2)*sqrt(2)
  const winEst = wins + kappa ** 2 / 2;
  const totalEst = total + kappa ** 2;
  const winProbEst = winEst / totalEst;
  // const radius = kappa * Math.sqrt((winProbEst * (1 - winProbEst)) / totalEst);
  return Math.max(0, winProbEst);
};
