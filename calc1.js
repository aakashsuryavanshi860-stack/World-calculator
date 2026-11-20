var tools1 = [
  { name: "EMI Calculator", id: "emi", icon: "🏦" },
  { name: "Simple Interest", id: "interest", icon: "💰" },
  { name: "GST Calculator", id: "gst", icon: "🧾" },
  { name: "Discount Calculator", id: "discount", icon: "🏷️" },
  { name: "Tip Calculator", id: "tip", icon: "🍽️" },
  { name: "Compound Interest", id: "compound", icon: "📈" },
  { name: "BMI Calculator", id: "bmi", icon: "⚖️" },
  { name: "Age Calculator", id: "age", icon: "🎂" },
  { name: "Body Fat %", id: "bodyfat", icon: "🏃" },
  { name: "BMR Calculator", id: "bmr", icon: "🔥" },
  { name: "Percentage Calculator", id: "percentage", icon: "％" },
  { name: "Average Calculator", id: "average", icon: "📊" }
];

var htmls1 = {
  emi: '<div class="input-group"><label>Loan Amount (₹)</label><input type="number" id="emi_p" /></div><div class="input-group"><label>Interest Rate (%)</label><input type="number" id="emi_r" /></div><div class="input-group"><label>Loan Term (Years)</label><input type="number" id="emi_n" /></div><button class="btn" onclick="calcEMI()">Calculate</button><div id="emi_result" class="result-box"><p id="emi_val"></p></div>',
  interest: '<div class="input-group"><label>Principal (₹)</label><input type="number" id="si_p" /></div><div class="input-group"><label>Rate (%)</label><input type="number" id="si_r" /></div><div class="input-group"><label>Time (Years)</label><input type="number" id="si_t" /></div><button class="btn" onclick="calcSI()">Calculate</button><div id="si_result" class="result-box"><p id="si_val"></p></div>',
  gst: '<div class="input-group"><label>Amount (₹)</label><input type="number" id="gst_amt" /></div><div class="input-group"><label>GST Rate (%)</label><select id="gst_rate"><option value="5">5%</option><option value="12">12%</option><option value="18" selected>18%</option><option value="28">28%</option></select></div><div class="input-group"><label>Type</label><select id="gst_type"><option value="add">Add GST (Exclusive)</option><option value="remove">Remove GST (Inclusive)</option></select></div><button class="btn" onclick="calcGST()">Calculate</button><div id="gst_result" class="result-box"><p id="gst_val"></p></div>',
  discount: '<div class="input-group"><label>Original Price (₹)</label><input type="number" id="dis_price" /></div><div class="input-group"><label>Discount (%)</label><input type="number" id="dis_per" /></div><button class="btn" onclick="calcDiscount()">Calculate</button><div id="dis_result" class="result-box"><p id="dis_val"></p></div>',
  tip: '<div class="input-group"><label>Bill Amount (₹)</label><input type="number" id="tip_amt" /></div><div class="input-group"><label>Tip (%)</label><select id="tip_per"><option value="5">5%</option><option value="10" selected>10%</option><option value="15">15%</option><option value="20">20%</option><option value="25">25%</option></select></div><div class="input-group"><label>Split Between (People)</label><input type="number" id="tip_people" value="1" /></div><button class="btn" onclick="calcTip()">Calculate</button><div id="tip_result" class="result-box"><p id="tip_val"></p></div>',
  compound: '<div class="input-group"><label>Principal (₹)</label><input type="number" id="ci_p" /></div><div class="input-group"><label>Rate (%)</label><input type="number" id="ci_r" /></div><div class="input-group"><label>Time (Years)</label><input type="number" id="ci_t" /></div><div class="input-group"><label>Compounding Frequency</label><select id="ci_freq"><option value="1">Yearly</option><option value="2">Half-Yearly</option><option value="4">Quarterly</option><option value="12">Monthly</option></select></div><button class="btn" onclick="calcCI()">Calculate</button><div id="ci_result" class="result-box"><p id="ci_val"></p></div>',
  bmi: '<div class="input-group"><label>Weight (kg)</label><input type="number" id="bmi_w" /></div><div class="input-group"><label>Height (cm)</label><input type="number" id="bmi_h" /></div><button class="btn" onclick="calcBMI()">Calculate</button><div id="bmi_result" class="result-box"><p id="bmi_val"></p></div>',
  age: '<div class="input-group"><label>Date of Birth</label><input type="date" id="age_dob" /></div><button class="btn" onclick="calcAge()">Calculate Age</button><div id="age_result" class="result-box"><p id="age_val"></p></div>',
  bodyfat: '<div class="input-group"><label>Age</label><input type="number" id="bf_age2" /></div><div class="input-group"><label>Gender (1=Male, 0=Female)</label><input type="number" id="bf_gender2" /></div><div class="input-group"><label>BMI</label><input type="number" id="bf_bmi2" /></div><button class="btn" onclick="calcBodyFat2()">Calculate</button><div id="bf_result2" class="result-box"><p id="bf_val2"></p></div>',
  bmr: '<div class="input-group"><label>Weight (kg)</label><input type="number" id="bmr_w2" /></div><div class="input-group"><label>Height (cm)</label><input type="number" id="bmr_h2" /></div><div class="input-group"><label>Age</label><input type="number" id="bmr_age2" /></div><div class="input-group"><label>Gender (1=M, 0=F)</label><input type="number" id="bmr_g2" /></div><button class="btn" onclick="calcBMR2()">Calculate</button><div id="bmr_result2" class="result-box"><p id="bmr_val2"></p></div>',
  percentage: '<div class="input-group"><label>What is</label><input type="number" id="per_x" /></div><div class="input-group"><label>% of</label><input type="number" id="per_y" /></div><button class="btn" onclick="calcPercentage()">Calculate</button><div id="per_result" class="result-box"><p id="per_val"></p></div>',
  average: '<div class="input-group"><label>Numbers (comma separated)</label><input type="text" id="avg_nums" placeholder="e.g. 10, 20, 30, 40" /></div><button class="btn" onclick="calcAverage()">Calculate</button><div id="avg_result" class="result-box"><p id="avg_val"></p></div>'
};

// ==========================================
// EMI CALCULATOR
// ==========================================
function calcEMI() {
  var p = parseFloat(document.getElementById('emi_p').value);
  var r = parseFloat(document.getElementById('emi_r').value) / 1200;
  var n = parseFloat(document.getElementById('emi_n').value) * 12;
  if (!isNaN(p) && !isNaN(r) && !isNaN(n) && p > 0 && n > 0) {
    var emi = (r === 0) ? p / n : (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    var total = emi * n;
    var interest = total - p;
    document.getElementById('emi_val').innerHTML =
      "Monthly EMI: ₹" + emi.toFixed(2) +
      "<br>Total Payment: ₹" + total.toFixed(2) +
      "<br>Total Interest: ₹" + interest.toFixed(2);
    document.getElementById('emi_result').style.display = 'block';
  }
}

// ==========================================
// SIMPLE INTEREST
// ==========================================
function calcSI() {
  var p = parseFloat(document.getElementById('si_p').value);
  var r = parseFloat(document.getElementById('si_r').value);
  var t = parseFloat(document.getElementById('si_t').value);
  if (!isNaN(p) && !isNaN(r) && !isNaN(t)) {
    var si = (p * r * t) / 100;
    var total = p + si;
    document.getElementById('si_val').innerHTML =
      "Simple Interest: ₹" + si.toFixed(2) +
      "<br>Total Amount: ₹" + total.toFixed(2);
    document.getElementById('si_result').style.display = 'block';
  }
}

// ==========================================
// GST CALCULATOR
// ==========================================
function calcGST() {
  var amt = parseFloat(document.getElementById('gst_amt').value);
  var rate = parseFloat(document.getElementById('gst_rate').value);
  var type = document.getElementById('gst_type').value;
  if (!isNaN(amt) && !isNaN(rate)) {
    var gst, base, total;
    if (type === 'add') {
      base = amt;
      gst = (amt * rate) / 100;
      total = amt + gst;
    } else {
      base = amt / (1 + rate / 100);
      gst = amt - base;
      total = amt;
    }
    document.getElementById('gst_val').innerHTML =
      "Base Amount: ₹" + base.toFixed(2) +
      "<br>GST (" + rate + "%): ₹" + gst.toFixed(2) +
      "<br>Total: ₹" + total.toFixed(2);
    document.getElementById('gst_result').style.display = 'block';
  }
}

// ==========================================
// DISCOUNT CALCULATOR
// ==========================================
function calcDiscount() {
  var price = parseFloat(document.getElementById('dis_price').value);
  var per = parseFloat(document.getElementById('dis_per').value);
  if (!isNaN(price) && !isNaN(per)) {
    var discount = (price * per) / 100;
    var final = price - discount;
    document.getElementById('dis_val').innerHTML =
      "Discount: ₹" + discount.toFixed(2) +
      "<br>Final Price: ₹" + final.toFixed(2) +
      "<br>You Save: " + per + "%";
    document.getElementById('dis_result').style.display = 'block';
  }
}

// ==========================================
// TIP CALCULATOR
// ==========================================
function calcTip() {
  var amt = parseFloat(document.getElementById('tip_amt').value);
  var per = parseFloat(document.getElementById('tip_per').value);
  var people = parseInt(document.getElementById('tip_people').value) || 1;
  if (!isNaN(amt) && !isNaN(per)) {
    var tip = (amt * per) / 100;
    var total = amt + tip;
    var perPerson = total / people;
    document.getElementById('tip_val').innerHTML =
      "Tip: ₹" + tip.toFixed(2) +
      "<br>Total: ₹" + total.toFixed(2) +
      "<br>Per Person: ₹" + perPerson.toFixed(2);
    document.getElementById('tip_result').style.display = 'block';
  }
}

// ==========================================
// COMPOUND INTEREST
// ==========================================
function calcCI() {
  var p = parseFloat(document.getElementById('ci_p').value);
  var r = parseFloat(document.getElementById('ci_r').value) / 100;
  var t = parseFloat(document.getElementById('ci_t').value);
  var n = parseFloat(document.getElementById('ci_freq').value);
  if (!isNaN(p) && !isNaN(r) && !isNaN(t) && !isNaN(n)) {
    var amount = p * Math.pow(1 + r / n, n * t);
    var ci = amount - p;
    document.getElementById('ci_val').innerHTML =
      "Compound Interest: ₹" + ci.toFixed(2) +
      "<br>Total Amount: ₹" + amount.toFixed(2);
    document.getElementById('ci_result').style.display = 'block';
  }
}

// ==========================================
// BMI CALCULATOR
// ==========================================
function calcBMI() {
  var w = parseFloat(document.getElementById('bmi_w').value);
  var h = parseFloat(document.getElementById('bmi_h').value);
  if (!isNaN(w) && !isNaN(h) && w > 0 && h > 0) {
    var bmi = w / Math.pow(h / 100, 2);
    var category = '';
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 25) category = 'Normal';
    else if (bmi < 30) category = 'Overweight';
    else category = 'Obese';
    document.getElementById('bmi_val').innerHTML =
      "BMI: " + bmi.toFixed(1) +
      "<br>Category: " + category;
    document.getElementById('bmi_result').style.display = 'block';
  }
}

// ==========================================
// AGE CALCULATOR
// ==========================================
function calcAge() {
  var dob = document.getElementById('age_dob').value;
  if (dob) {
    var birth = new Date(dob);
    var today = new Date();
    var years = today.getFullYear() - birth.getFullYear();
    var months = today.getMonth() - birth.getMonth();
    var days = today.getDate() - birth.getDate();
    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    var totalDays = Math.floor((today - birth) / (1000 * 60 * 60 * 24));
    document.getElementById('age_val').innerHTML =
      "Age: " + years + " years, " + months + " months, " + days + " days" +
      "<br>Total Days: " + totalDays;
    document.getElementById('age_result').style.display = 'block';
  }
}

// ==========================================
// BODY FAT %
// ==========================================
function calcBodyFat2() {
  var a = parseFloat(document.getElementById('bf_age2').value);
  var g = parseFloat(document.getElementById('bf_gender2').value);
  var b = parseFloat(document.getElementById('bf_bmi2').value);
  if (!isNaN(a) && !isNaN(g) && !isNaN(b)) {
    var f = (1.20 * b) + (0.23 * a) - (10.8 * g) - 5.4;
    document.getElementById('bf_val2').textContent = "Body Fat: " + (f < 0 ? 0 : f).toFixed(1) + "%";
    document.getElementById('bf_result2').style.display = 'block';
  }
}

// ==========================================
// BMR CALCULATOR
// ==========================================
function calcBMR2() {
  var w = parseFloat(document.getElementById('bmr_w2').value);
  var h = parseFloat(document.getElementById('bmr_h2').value);
  var a = parseFloat(document.getElementById('bmr_age2').value);
  var g = parseFloat(document.getElementById('bmr_g2').value);
  if (!isNaN(w) && !isNaN(h) && !isNaN(a) && !isNaN(g)) {
    var bmr = (10 * w) + (6.25 * h) - (5 * a) + (g === 1 ? 5 : -161);
    document.getElementById('bmr_val2').textContent = "BMR: " + bmr.toFixed(0) + " kcal/day";
    document.getElementById('bmr_result2').style.display = 'block';
  }
}

// ==========================================
// PERCENTAGE CALCULATOR
// ==========================================
function calcPercentage() {
  var x = parseFloat(document.getElementById('per_x').value);
  var y = parseFloat(document.getElementById('per_y').value);
  if (!isNaN(x) && !isNaN(y)) {
    var result = (x * y) / 100;
    document.getElementById('per_val').innerHTML =
      x + "% of " + y + " = " + result.toFixed(2);
    document.getElementById('per_result').style.display = 'block';
  }
}

// ==========================================
// AVERAGE CALCULATOR
// ==========================================
function calcAverage() {
  var input = document.getElementById('avg_nums').value;
  if (input) {
    var nums = input.split(',').map(function(n) { return parseFloat(n.trim()); }).filter(function(n) { return !isNaN(n); });
    if (nums.length > 0) {
      var sum = nums.reduce(function(a, b) { return a + b; }, 0);
      var avg = sum / nums.length;
      document.getElementById('avg_val').innerHTML =
        "Sum: " + sum.toFixed(2) +
        "<br>Count: " + nums.length +
        "<br>Average: " + avg.toFixed(4);
      document.getElementById('avg_result').style.display = 'block';
    }
  }
                           }
