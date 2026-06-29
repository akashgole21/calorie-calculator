export const calculateCalories = ({
  gender,
  age,
  weight,
  height,
  activityLevel,
  goal = "maintain",
}) => {
  let bmr;

  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const activityFactors = {
    sedentary: 1.2,
    lightlyActive: 1.375,
    moderatelyActive: 1.55,
    veryActive: 1.725,
    extraActive: 1.9,
  };

  const tdee = bmr * (activityFactors[activityLevel] || 1.2);

  let targetCalories = tdee;

  switch (goal) {
    case "lose":
      targetCalories = tdee - 500;
      break;
    case "gain":
      targetCalories = tdee + 500;
      break;
  }

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    targetCalories: Math.round(targetCalories),
  };
};