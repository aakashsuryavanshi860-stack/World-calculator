var tools3 = [
  { name: "Scientific Calculator", id: "scientific", icon: "🧪" },
  { name: "Fraction Calculator", id: "fraction", icon: "🍕" },
  { name: "Time Difference", id: "timediff", icon: "⏳" },
  { name: "Mileage Calculator", id: "mileage", icon: "🚗" },
  { name: "Currency Converter", id: "currency", icon: "💵" },
  { name: "Income Tax", id: "tax", icon: "📑" },
  { name: "Salary Calculator", id: "salary", icon: "💼" },
  { name: "Retirement Corpus", id: "retire", icon: "🏖️" },
  { name: "Weight Loss Time", id: "weightloss", icon: "🏋️" },
  { name: "Pregnancy Due Date", id: "pregnancy", icon: "👶" }
];

var htmls3 = {
  scientific: `
<div style="max-width:500px; margin:0 auto;">
  <input type="text" id="sci_display" readonly
    style="width:100%; padding:12px; font-size:1.4rem; text-align:right; border:2px solid #e2e8f0; border-radius:8px; margin-bottom:10px; background:#f8fafc; font-family:monospace;"
    value="0" />
  <div style="display:grid; grid-template-columns:repeat(5, 1fr); gap:6px;">
    <button class="sci-btn" onclick="sciFn('sin')">sin</button>
    <button class="sci-btn" onclick="sciFn('cos')">cos</button>
    <button class="sci-btn" onclick="sciFn('tan')">tan</button>
    <button class="sci-btn" onclick="sciClear()" style="background:#ef4444; color:#fff;">C</button>
    <button class="sci-btn" onclick="sciBackspace()" style="background:#f59e0b; color:#fff;">⌫</button>

    <button class="sci-btn" onclick="sciFn('asin')">sin⁻¹</button>
    <button class="sci-btn" onclick="sciFn('acos')">cos⁻¹</button>
    <button class="sci-btn" onclick="sciFn('atan')">tan⁻¹</button>
    <button class="sci-btn" onclick="sciInput('(')">(</button>
    <button class="sci-btn" onclick="sciInput(')')">)</button>

    <button class="sci-btn" onclick="sciFn('log')">log</button>
    <button class="sci-btn" onclick="sciFn('ln')">ln</button>
    <button class="sci-btn" onclick="sciFn('sqrt')">√</button>
    <button class="sci-btn" onclick="sciInput('^')">x^y</button>
    <button class="sci-btn" onclick="sciFn('fact')">n!</button>

    <button class="sci-btn" onclick="sciFn('pi')">π</button>
    <button class="sci-btn" onclick="sciFn('e')">e</button>
    <button class="sci-btn" onclick="sciInput('%')">%</button>
    <button class="sci-btn" onclick="sciInput('/')">÷</button>
    <button class="sci-btn" onclick="sciInput('*')">×</button>

    <button class="sci-btn" onclick="sciInput('7')">7</button>
    <button class="sci-btn" onclick="sciInput('8')">8</button>
    <button class="sci-btn" onclick="sciInput('9')">9</button>
    <button class="sci-btn" onclick="sciInput('-')">−</button>
    <button class="sci-btn" onclick="sciInput('+')">+</button>

    <button class="sci-btn" onclick="sciInput('4')">4</button>
    <button class="sci-btn" onclick="sciInput('5')">5</button>
    <button class="sci-btn" onclick="sciInput('6')">6</button>
    <button class="sci-btn" onclick="sciInput('1')">1</button>
    <button class="sci-btn" onclick="sciInput('2')">2</button>

    <button class="sci-btn" onclick="sciInput('3')">3</button>
    <button class="sci-btn" onclick="sciInput('0')">0</button>
    <button class="sci-btn" onclick="sciInput('.')">.</button>
    <button class="sci-btn" onclick="sciInput('E')">EXP</button>
    <button class="sci-btn" onclick="sciCalculate()" style="background:#10b981; color:#fff; grid-row:span 2;">=</button>
  </div>
</div>
`,
  fraction: '<div class="input-group"><label>Num 1</label><input type="number" id="fr_n1" /></div><div class="input-group"><label>Den 1</label><input type="number" id="fr_d1" /></div><div class="input-group"><label>Op</label><select id="fr_op"><option value="+">+</option><option value="-">-</option><option value="*">×</option><option value="/">÷</option></select></div><div class="input-group"><label>Num 2</label><input type="number" id="fr_n2" /></div><div class="input-group"><label>Den 2</label><input type="number" id="fr_d2" /></div><button class="btn" onclick="calcFraction()">Calculate</button><div id="frResult" class="result-box"><p id="frValue">0</p></div>',
  timediff: '<div class="input-group"><label>Start</label><input type="time" id="td_start" /></div><div class="input-group"><label>End</label><input type="time" id="td_end" /></div><button class="btn" onclick="calcTimeDiff()">Calculate</button><div id="tdResult" class="result-box"><p id="tdValue">0</p></div>',
  mileage: '<div class="input-group"><label>Distance (km)</label><input type="number" id="mil_dist" /></div><div class="input-group"><label>Fuel (L)</label><input type="number" id="mil_fuel" /></div><button class="btn" onclick="calcMileage()">Calculate</button><div id="milResult" class="result-box"><p id="milValue">0</p></div>',
  currency: '<div class="input-group"><label>USD ($)</label><input type="number" id="curr_usd" /></div><button class="btn" onclick="calcCurrency()">Convert to INR</button><div id="currResult" class="result-box"><p id="currValue">₹0</p></div>',
  tax: '<div class="input-group"><label>Annual Income (₹)</label><input type="number" id="tax_inc" /></div><button class="btn" onclick="calcTax()">Calculate</button><div id="taxResult" class="result-box"><p id="taxValue">₹0</p></div>',
  salary: '<div class="input-group"><label>Monthly (₹)</label><input type="number" id="sal_month" /></div><button class="btn" onclick="calcSalary()">Yearly</button><div id="salResult" class="result-box"><p id="salValue">₹0</p></div>',
  retire: '<div class="input-group"><label>Current Age</label><input type="number" id="ret_age" /></div><div class="input-group"><label>Retire Age</label><input type="number" id="ret_ret" /></div><div class="input-group"><label>Monthly Exp (₹)</label><input type="number" id="ret_exp" /></div><button class="btn" onclick="calcRetire()">Calculate</button><div id="retResult" class="result-box"><p id="retValue">₹0</p></div>',
  weightloss: '<div class="input-group"><label>Current (kg)</label><input type="number" id="wl_curr" /></div><div class="input-group"><label>Target (kg)</label><input type="number" id="wl_targ" /></div><button class="btn" onclick="calcWeightLoss()">Calculate</button><div id="wlResult" class="result-box"><p id="wlValue">0</p></div>',
  pregnancy: '<div class="input-group"><label>Last Period Date</label><input type="date" id="preg_date" /></div><button class="btn" onclick="calcPregnancy()">Calculate</button><div id="pregResult" class="result-box"><p id="pregValue">0</p></div>'
};

// ==========================================
// SCIENTIFIC CALCULATOR (Full Formulas - 100% Sahi)
// ==========================================
var sciExpr = "";

function sciUpdate() {
  var el = document.getElementById('sci_display');
  if (el) el.value = sciExpr || "0";
}

function sciInput(val) {
  sciExpr += val;
  sciUpdate();
}

function sciClear() {
  sciExpr = "";
  sciUpdate();
}

function sciBackspace() {
  sciExpr = sciExpr.slice(0, -1);
  sciUpdate();
}

function sciFn(fn) {
  var num = 0;
  try {
    num = Function('"use strict"; return (' + (sciExpr || "0") + ')')();
  } catch(e) {
    num = 0;
  }
  var result = 0;
  var rad = num * (Math.PI / 180);

  switch(fn) {
    case 'sin':
      result = Math.sin(rad);
      break;
    case 'cos':
      result = Math.cos(rad);
      break;
    case 'tan':
      result = Math.tan(rad);
      break;
    case 'asin':
      if (num < -1 || num > 1) { sciExpr = "Error"; sciUpdate(); return; }
      result = Math.asin(num) * (180 / Math.PI);
      break;
    case 'acos':
      if (num < -1 || num > 1) { sciExpr = "Error"; sciUpdate(); return; }
      result = Math.acos(num) * (180 / Math.PI);
      break;
    case 'atan':
      result = Math.atan(num) * (180 / Math.PI);
      break;
    case 'log':
      if (num <= 0) { sciExpr = "Error"; sciUpdate(); return; }
      result = Math.log10(num);
      break;
    case 'ln':
      if (num <= 0) { sciExpr = "Error"; sciUpdate(); return; }
      result = Math.log(num);
      break;
    case 'sqrt':
      if (num < 0) { sciExpr = "Error"; sciUpdate(); return; }
      result = Math.sqrt(num);
      break;
    case 'fact':
      if (num < 0 || num % 1 !== 0 || num > 170) { sciExpr = "Error"; sciUpdate(); return; }
      result = 1;
      for (var i = 2; i <= num; i++) result *= i;
      break;
    case 'pi':
      sciExpr = String(Math.PI);
      sciUpdate();
      return;
    case 'e':
      sciExpr = String(Math.E);
      sciUpdate();
      return;
    default:
      return;
  }
  sciExpr = String(result);
  sciUpdate();
}

function sciCalculate() {
  try {
    var sanitized = sciExpr.replace(/[^0-9+\-*/().%^E]/g, '');
    sanitized = sanitized.replace(/\^/g, '**');
    var result = Function('"use strict"; return (' + sanitized + ')')();
    if (!isFinite(result)) throw new Error("Invalid");
    sciExpr = String(result);
    document.getElementById('sci_display').value = result;
  } catch (e) {
    document.getElementById('sci_display').value = "Error";
    sciExpr = "";
  }
}

// ==========================================
// OTHER CALCULATORS
// ==========================================
function calcFraction() {
  var n1 = parseInt(document.getElementById('fr_n1').value);
  var d1 = parseInt(document.getElementById('fr_d1').value);
  var n2 = parseInt(document.getElementById('fr_n2').value);
  var d2 = parseInt(document.getElementById('fr_d2').value);
  var o = document.getElementById('fr_op').value;
  if (!isNaN(n1) && !isNaN(d1) && !isNaN(n2) && !isNaN(d2) && d1 !== 0 && d2 !== 0) {
    var num = 0, den = 0;
    if (o === '+') { num = (n1 * d2) + (n2 * d1); den = d1 * d2; }
    if (o === '-') { num = (n1 * d2) - (n2 * d1); den = d1 * d2; }
    if (o === '*') { num = n1 * n2; den = d1 * d2; }
    if (o === '/') { num = n1 * d2; den = d1 * n2; }
    document.getElementById('frValue').textContent = num + "/" + den + " (" + (num/den).toFixed(2) + ")";
    document.getElementById('frResult').style.display = 'block';
  }
}

function calcTimeDiff() {
  var s = document.getElementById('td_start').value;
  var e = document.getElementById('td_end').value;
  if (s && e) {
    var sp = s.split(':'), ep = e.split(':');
    var sm = parseInt(sp[0]) * 60 + parseInt(sp[1]);
    var em = parseInt(ep[0]) * 60 + parseInt(ep[1]);
    var d = em - sm;
    if (d < 0) d += 1440;
    document.getElementById('tdValue').textContent = Math.floor(d/60) + " hrs " + (d%60) + " mins";
    document.getElementById('tdResult').style.display = 'block';
  }
}

function calcMileage() {
  var d = parseFloat(document.getElementById('mil_dist').value);
  var f = parseFloat(document.getElementById('mil_fuel').value);
  if (!isNaN(d) && !isNaN(f) && f > 0) {
    document.getElementById('milValue').textContent = (d/f).toFixed(2) + " km/l";
    document.getElementById('milResult').style.display = 'block';
  }
}

function calcCurrency() {
  var u = parseFloat(document.getElementById('curr_usd').value);
  if (!isNaN(u)) {
    document.getElementById('currValue').textContent = "₹" + (u * 83).toFixed(2);
    document.getElementById('currResult').style.display = 'block';
  }
}

function calcTax() {
  var i = parseFloat(document.getElementById('tax_inc').value);
  if (!isNaN(i) && i >= 0) {
    var t = 0;
    if (i > 300000 && i <= 600000) t = (i - 300000) * 0.05;
    else if (i > 600000 && i <= 900000) t = 15000 + (i - 600000) * 0.10;
    else if (i > 900000 && i <= 1200000) t = 45000 + (i - 900000) * 0.15;
    else if (i > 1200000 && i <= 1500000) t = 90000 + (i - 1200000) * 0.20;
    else if (i > 1500000) t = 150000 + (i - 1500000) * 0.30;
    document.getElementById('taxValue').textContent = "₹" + t.toFixed(0);
    document.getElementById('taxResult').style.display = 'block';
  }
}

function calcSalary() {
  var m = parseFloat(document.getElementById('sal_month').value);
  if (!isNaN(m) && m > 0) {
    document.getElementById('salValue').textContent = "₹" + (m * 12).toFixed(0);
    document.getElementById('salResult').style.display = 'block';
  }
}

function calcRetire() {
  var c = parseFloat(document.getElementById('ret_age').value);
  var r = parseFloat(document.getElementById('ret_ret').value);
  var e = parseFloat(document.getElementById('ret_exp').value);
  if (!isNaN(c) && !isNaN(r) && !isNaN(e) && r > c) {
    var corpus = e * Math.pow(1.06, r - c) * 12 * 25;
    document.getElementById('retValue').textContent = "₹" + (corpus/100000).toFixed(1) + " Lakhs";
    document.getElementById('retResult').style.display = 'block';
  }
}

function calcWeightLoss() {
  var c = parseFloat(document.getElementById('wl_curr').value);
  var t = parseFloat(document.getElementById('wl_targ').value);
  if (!isNaN(c) && !isNaN(t) && c > t) {
    document.getElementById('wlValue').textContent = ((c - t) / 0.5).toFixed(0) + " Weeks";
    document.getElementById('wlResult').style.display = 'block';
  }
}

function calcPregnancy() {
  var l = document.getElementById('preg_date').value;
  if (l) {
    var d = new Date(l);
    d.setDate(d.getDate() + 280);
    document.getElementById('pregValue').textContent = d.toLocaleDateString('en-GB', {day:'numeric', month:'long', year:'numeric'});
    document.getElementById('pregResult').style.display = 'block';
  }
      }
