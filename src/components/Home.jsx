import React, { useState } from "react";
import { calculateCalories } from "../utils/calorieCalculator";

export default function Home() {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [feet, setFeet] = useState("");
  const [inch, setInch] = useState("");
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert feet + inches to cm
    const totalInches = Number(feet) * 12 + Number(inch);
    const heightCm = totalInches * 2.54;

    const calories = calculateCalories({
      gender,
      age: Number(age),
      weight: Number(weight),
      height: heightCm,
      activityLevel,
    });

    setResult(calories);
  };

  return (
    <>
      <section className="calcSection">
        <div className="calcBox">
          <h1>Calorie Calculator</h1>
          <div className="detailsArea">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="formField genderField">
                  <span className="fieldTitle">Gender</span>
                  <div className="radioWrapper col-12">
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={gender === "male"}
                        onChange={(e) => setGender(e.target.value)}
                      />{" "}
                      <span>Male</span>
                      <div className="check"></div>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={gender === "female"}
                        onChange={(e) => setGender(e.target.value)}
                      />{" "}
                      <span>Female</span>
                      <div className="check"></div>
                    </label>
                  </div>
                </div>

                <div className="formField col-6">
                  <label>
                    Your Age
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </label>
                </div>
                <div className="formField col-6">
                  <label>
                    Weight
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </label>
                </div>
                <div className="formField heightField col-12">
                  <label>
                    Height
                    <div className="inputWrapper">
                      <input
                        type="number"
                        value={feet}
                        placeholder="Feet"
                        onChange={(e) => setFeet(e.target.value)}
                      />
                      <input
                        type="number"
                        value={inch}
                        placeholder="Inch"
                        onChange={(e) => setInch(e.target.value)}
                      />
                    </div>
                  </label>
                </div>

                <div className="formField selectField col-12">
                  <label>Activity</label>
                  <select
                    value={activityLevel}
                    onChange={(e) => setActivityLevel(e.target.value)}
                  >
                    <option value="sedentary">
                      Sedentary: little or without exercise
                    </option>
                    <option value="lightlyActive">
                      Light: lightly exercise
                    </option>
                    <option value="moderatelyActive">
                      Moderately: 4-5 times exercise on week
                    </option>
                    <option value="veryActive">Active: daily exercise</option>
                    <option value="extraActive">
                      Very Active: intense or larg amount exercise daily
                    </option>
                  </select>
                </div>
                <div className="formField col-12">
                  <button tyoe="submit">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {result && (
          <div className="resultBox">
            <h3>Results</h3>
            <div className="resultdetails row">
              <div className="calorieBox">
                <div>
                  <div className="calCounts">
                    <span className="number">{result.bmr} </span>
                    <span className="unit">kcal/day</span>
                  </div>
                  <div className="calState">Complete Rest</div>
                </div>
              </div>
              <div className="calorieBox">
                <div>
                  <div className="calCounts">
                    <span className="number">{result.tdee}</span>
                    <span className="unit">kcal/day</span>
                  </div>
                  <div className="calState">Estimated Daily Calories</div>
                </div>
              </div>
              <div className="calorieBox">
                <div>
                  <div className="calCounts">
                    <span className="number">{result.targetCalories}</span>
                    <span className="unit">kcal/day</span>
                  </div>
                  <div className="calState">Target Calories</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
