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
  const radius = kappa * Math.sqrt((winProbEst * (1 - winProbEst)) / totalEst);
  return Math.max(0, winProbEst);
};

function erfinv(x) {
  var z;
  var a = 0.147;
  var the_sign_of_x;
  if (0 === x) {
    the_sign_of_x = 0;
  } else if (x > 0) {
    the_sign_of_x = 1;
  } else {
    the_sign_of_x = -1;
  }

  if (0 !== x) {
    var ln_1minus_x_sqrd = Math.log(1 - x * x);
    var ln_1minusxx_by_a = ln_1minus_x_sqrd / a;
    var ln_1minusxx_by_2 = ln_1minus_x_sqrd / 2;
    var ln_etc_by2_plus2 = ln_1minusxx_by_2 + 2 / (Math.PI * a);
    var first_sqrt = Math.sqrt(
      ln_etc_by2_plus2 * ln_etc_by2_plus2 - ln_1minusxx_by_a
    );
    var second_sqrt = Math.sqrt(first_sqrt - ln_etc_by2_plus2);
    z = second_sqrt * the_sign_of_x;
  } else {
    // x is zero
    z = 0;
  }
  return z;
}
