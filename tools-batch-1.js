/* ==========================================
   बैच 1: 10 बेसिक और लोकप्रिय टूल्स
   ========================================== */

var tools1 = [
    {
        id: "age-calculator",
        name: "Age Calculator",
        icon: "🎂",
        title: "Age Calculator - Calculate Your Exact Age in Years, Months, Days",
        description: "Calculate your exact age in years, months, days, hours, minutes, and seconds. Free and accurate age calculator.",
        // यहाँ HTML डालें जो आपकी टूल पेज पर दिखेगा
        html: `
            <div class="tool-container">
                <h1>Age Calculator</h1>
                <p class="subtitle">Calculate your exact age in years, months, days, and even seconds.</p>
                
                <div class="input-group">
                    <label for="dob">Enter Your Date of Birth:</label>
                    <input type="date" id="dob" required>
                </div>
                <div class="input-group">
                    <label for="age-at">Age at the Date of:</label>
                    <input type="date" id="age-at" required>
                </div>
                <button class="btn" onclick="calculateAge()">Calculate Age</button>
                
                <div id="age-result" class="result-box" style="display:none;">
                    <!-- Result will be populated here -->
                </div>

                <!-- SEO Content Section -->
                <div class="seo-content">
                    <h2>About Age Calculator</h2>
                    <p>The Age Calculator determines a person's age based on their date of birth. It provides results in years, months, days, hours, minutes, and seconds. This tool is useful for official documents, medical purposes, and personal curiosity.</p>
                    
                    <h2>How to Use</h2>
                    <ol>
                        <li>Enter your date of birth in the first field.</li>
                        <li>Enter the date you want to calculate your age at (default is today).</li>
                        <li>Click the "Calculate Age" button.</li>
                        <li>View your detailed age breakdown instantly.</li>
                    </ol>
                    
                    <h2>Privacy Policy</h2>
                    <p>We do not store or share your birth date. All calculations are performed locally in your browser.</p>
                </div>
            </div>
        `,
        // जावास्क्रिप्ट लॉजिक
        js: `
            function calculateAge() {
                const dobInput = document.getElementById('dob').value;
                const ageAtInput = document.getElementById('age-at').value;
                const resultDiv = document.getElementById('age-result');

                if (!dobInput || !ageAtInput) {
                    alert('Please enter both dates.');
                    return;
                }

                const dob = new Date(dobInput);
                const ageAt = new Date(ageAtInput);

                if (dob > ageAt) {
                    resultDiv.innerHTML = '<p style="color:red;">Date of birth cannot be after the target date.</p>';
                    resultDiv.style.display = 'block';
                    return;
                }

                let years = ageAt.getFullYear() - dob.getFullYear();
                let months = ageAt.getMonth() - dob.getMonth();
                let days = ageAt.getDate() - dob.getDate();

                if (days < 0) {
                    months--;
                    const prevMonth = new Date(ageAt.getFullYear(), ageAt.getMonth(), 0);
                    days += prevMonth.getDate();
                }
                if (months < 0) {
                    years--;
                    months += 12;
                }

                // Calculate hours, minutes, seconds
                let timeDiff = ageAt.getTime() - dob.getTime();
                let hours = Math.floor(timeDiff / (1000 * 60 * 60));
                let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

                resultDiv.innerHTML = \`
                    <h3 style="color:var(--accent); margin-bottom:10px;">Your Age is:</h3>
                    <p style="font-size: 1.2rem; font-weight: bold;">\${years} Years, \${months} Months, \${days} Days</p>
                    <p style="font-size: 1rem;">(\${hours} Hours, \${minutes} Minutes, \${seconds} Seconds)</p>
                \`;
                resultDiv.style.display = 'block';
            }
        `
    },
    {
        id: "bmi-calculator",
        name: "BMI Calculator",
        icon: "⚖️",
        title: "BMI Calculator - Body Mass Index",
        description: "Calculate your Body Mass Index (BMI) to check if you are at a healthy weight.",
        html: `
            <div class="tool-container">
                <h1>BMI Calculator</h1>
                <p class="subtitle">Check your Body Mass Index based on your height and weight.</p>
                <div class="input-group">
                    <label>Weight (kg):</label>
                    <input type="number" id="bmi-weight" step="0.1">
                </div>
                <div class="input-group">
                    <label>Height (cm):</label>
                    <input type="number" id="bmi-height" step="0.1">
                </div>
                <button class="btn" onclick="calculateBMI()">Calculate BMI</button>
                <div id="bmi-result" class="result-box" style="display:none;"></div>
                <div class="seo-content">
                    <h2>About BMI Calculator</h2>
                    <p>BMI is a measure of body fat based on height and weight that applies to adult men and women.</p>
                    <h2>Privacy Policy</h2>
                    <p>Your weight and height data are processed locally and never stored on our servers.</p>
                </div>
            </div>
        `,
        js: `
            function calculateBMI() {
                const weight = parseFloat(document.getElementById('bmi-weight').value);
                const height = parseFloat(document.getElementById('bmi-height').value) / 100;
                const resultDiv = document.getElementById('bmi-result');

                if (!weight || !height || weight <= 0 || height <= 0) {
                    alert('Please enter valid weight and height.');
                    return;
                }
                const bmi = weight / (height * height);
                let category = '';
                if (bmi < 18.5) category = 'Underweight';
                else if (bmi < 25) category = 'Normal weight';
                else if (bmi < 30) category = 'Overweight';
                else category = 'Obese';

                resultDiv.innerHTML = \`<h3>Your BMI: \${bmi.toFixed(1)}</h3><p>Category: <strong>\${category}</strong></p>\`;
                resultDiv.style.display = 'block';
            }
        `
    },
    {
        id: "percentage-calculator",
        name: "Percentage Calculator",
        icon: "💯",
        title: "Percentage Calculator - Find Percentages Easily",
        description: "Calculate percentages, percentage differences, and percentage changes quickly.",
        html: `
            <div class="tool-container">
                <h1>Percentage Calculator</h1>
                <div class="input-group">
                    <label>What is X% of Y?</label>
                    <div style="display:flex; gap:10px;">
                        <input type="number" id="pct-x" placeholder="X"> 
                        <span style="align-self:center;">% of</span>
                        <input type="number" id="pct-y" placeholder="Y">
                    </div>
                </div>
                <button class="btn" onclick="calcPercentage()">Calculate</button>
                <div id="pct-result" class="result-box" style="display:none;"></div>
                <div class="seo-content">
                    <h2>About Percentage Calculator</h2>
                    <p>This tool helps you calculate percentages for everyday math needs, shopping discounts, and financial calculations.</p>
                </div>
            </div>
        `,
        js: `
            function calcPercentage() {
                const x = parseFloat(document.getElementById('pct-x').value);
                const y = parseFloat(document.getElementById('pct-y').value);
                const res = document.getElementById('pct-result');
                if (isNaN(x) || isNaN(y)) { alert('Please enter valid numbers.'); return; }
                res.innerHTML = \`<h3>\${x}% of \${y} is \${(x/100)*y}</h3>\`;
                res.style.display = 'block';
            }
        `
    },
    {
        id: "date-diff-calculator",
        name: "Date Difference Calculator",
        icon: "📅",
        title: "Date Difference Calculator - Days Between Dates",
        description: "Calculate the number of days, months, and years between two dates.",
        html: `
            <div class="tool-container">
                <h1>Date Difference Calculator</h1>
                <div class="input-group">
                    <label>Start Date:</label>
                    <input type="date" id="date-start">
                </div>
                <div class="input-group">
                    <label>End Date:</label>
                    <input type="date" id="date-end">
                </div>
                <button class="btn" onclick="calcDateDiff()">Calculate Difference</button>
                <div id="date-result" class="result-box" style="display:none;"></div>
            </div>
        `,
        js: `
            function calcDateDiff() {
                const start = new Date(document.getElementById('date-start').value);
                const end = new Date(document.getElementById('date-end').value);
                const res = document.getElementById('date-result');
                if (isNaN(start) || isNaN(end)) { alert('Please select both dates.'); return; }
                const diffTime = Math.abs(end - start);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                res.innerHTML = \`<h3>Difference: \${diffDays} Days</h3>\`;
                res.style.display = 'block';
            }
        `
    },
    {
        id: "gst-calculator",
        name: "GST Calculator",
        icon: "🧾",
        title: "GST Calculator - Goods and Services Tax",
        description: "Calculate GST amounts easily. Add or remove GST from your total price.",
        html: `
            <div class="tool-container">
                <h1>GST Calculator</h1>
                <div class="input-group">
                    <label>Amount:</label>
                    <input type="number" id="gst-amt">
                </div>
                <div class="input-group">
                    <label>GST Rate (%):</label>
                    <select id="gst-rate">
                        <option value="5">5%</option>
                        <option value="12">12%</option>
                        <option value="18">18%</option>
                        <option value="28">28%</option>
                    </select>
                </div>
                <button class="btn" onclick="calcGST()">Calculate GST</button>
                <div id="gst-result" class="result-box" style="display:none;"></div>
            </div>
        `,
        js: `
            function calcGST() {
                const amt = parseFloat(document.getElementById('gst-amt').value);
                const rate = parseFloat(document.getElementById('gst-rate').value);
                const res = document.getElementById('gst-result');
                if (isNaN(amt)) { alert('Please enter a valid amount.'); return; }
                const gst = (amt * rate) / 100;
                res.innerHTML = \`<h3>Base Amount: ₹\${amt}</h3><p>GST (\${rate}%): ₹\${gst.toFixed(2)}</p><p><strong>Total Amount: ₹\${(amt + gst).toFixed(2)}</strong></p>\`;
                res.style.display = 'block';
            }
        `
    },
    {
        id: "emi-calculator",
        name: "EMI Calculator",
        icon: "🏦",
        title: "EMI Calculator - Loan EMI Calculation",
        description: "Calculate your Equated Monthly Installment (EMI) for home, car, or personal loans.",
        html: `
            <div class="tool-container">
                <h1>EMI Calculator</h1>
                <div class="input-group">
                    <label>Loan Amount (₹):</label>
                    <input type="number" id="emi-principal">
                </div>
                <div class="input-group">
                    <label>Annual Interest Rate (%):</label>
                    <input type="number" id="emi-rate" step="0.1">
                </div>
                <div class="input-group">
                    <label>Tenure (Months):</label>
                    <input type="number" id="emi-tenure">
                </div>
                <button class="btn" onclick="calcEMI()">Calculate EMI</button>
                <div id="emi-result" class="result-box" style="display:none;"></div>
            </div>
        `,
        js: `
            function calcEMI() {
                const p = parseFloat(document.getElementById('emi-principal').value);
                const r = parseFloat(document.getElementById('emi-rate').value) / 12 / 100;
                const n = parseInt(document.getElementById('emi-tenure').value);
                const res = document.getElementById('emi-result');
                if (isNaN(p) || isNaN(r) || isNaN(n)) { alert('Please fill all fields correctly.'); return; }
                const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
                res.innerHTML = \`<h3>Your Monthly EMI: ₹\${emi.toFixed(2)}</h3>\`;
                res.style.display = 'block';
            }
        `
    },
    {
        id: "scientific-calculator",
        name: "Scientific Calculator",
        icon: "🔬",
        title: "Scientific Calculator Online",
        description: "Perform complex mathematical calculations with our free online scientific calculator.",
        html: `<div class="tool-container"><h1>Scientific Calculator</h1><p>Full scientific calculator logic goes here.</p></div>`,
        js: ``
    },
    {
        id: "simple-interest-calculator",
        name: "Simple Interest Calculator",
        icon: "💰",
        title: "Simple Interest Calculator",
        description: "Calculate simple interest on your investments or loans easily.",
        html: `
            <div class="tool-container">
                <h1>Simple Interest Calculator</h1>
                <div class="input-group"><label>Principal (₹):</label><input type="number" id="si-p"></div>
                <div class="input-group"><label>Rate (%):</label><input type="number" id="si-r"></div>
                <div class="input-group"><label>Time (Years):</label><input type="number" id="si-t"></div>
                <button class="btn" onclick="calcSI()">Calculate</button>
                <div id="si-result" class="result-box" style="display:none;"></div>
            </div>
        `,
        js: `
            function calcSI() {
                const p = parseFloat(document.getElementById('si-p').value);
                const r = parseFloat(document.getElementById('si-r').value);
                const t = parseFloat(document.getElementById('si-t').value);
                const res = document.getElementById('si-result');
                if (isNaN(p) || isNaN(r) || isNaN(t)) { alert('Please enter valid numbers.'); return; }
                const si = (p * r * t) / 100;
                res.innerHTML = \`<h3>Simple Interest: ₹\${si.toFixed(2)}</h3><p>Total Amount: ₹\${(p + si).toFixed(2)}</p>\`;
                res.style.display = 'block';
            }
        `
    },
    {
        id: "compound-interest-calculator",
        name: "Compound Interest Calculator",
        icon: "📈",
        title: "Compound Interest Calculator",
        description: "Calculate compound interest and see how your investment grows over time.",
        html: `
            <div class="tool-container">
                <h1>Compound Interest Calculator</h1>
                <div class="input-group"><label>Principal (₹):</label><input type="number" id="ci-p"></div>
                <div class="input-group"><label>Rate (%):</label><input type="number" id="ci-r"></div>
                <div class="input-group"><label>Time (Years):</label><input type="number" id="ci-t"></div>
                <button class="btn" onclick="calcCI()">Calculate</button>
                <div id="ci-result" class="result-box" style="display:none;"></div>
            </div>
        `,
        js: `
            function calcCI() {
                const p = parseFloat(document.getElementById('ci-p').value);
                const r = parseFloat(document.getElementById('ci-r').value) / 100;
                const t = parseFloat(document.getElementById('ci-t').value);
                const res = document.getElementById('ci-result');
                if (isNaN(p) || isNaN(r) || isNaN(t)) { alert('Please enter valid numbers.'); return; }
                const amount = p * Math.pow((1 + r), t);
                const ci = amount - p;
                res.innerHTML = \`<h3>Compound Interest: ₹\${ci.toFixed(2)}</h3><p>Total Amount: ₹\${amount.toFixed(2)}</p>\`;
                res.style.display = 'block';
            }
        `
    },
    {
        id: "discount-calculator",
        name: "Discount Calculator",
        icon: "🏷️",
        title: "Discount Calculator - Calculate Sale Price",
        description: "Find out the final price after a discount and how much you save.",
        html: `
            <div class="tool-container">
                <h1>Discount Calculator</h1>
                <div class="input-group"><label>Original Price (₹):</label><input type="number" id="disc-price"></div>
                <div class="input-group"><label>Discount (%):</label><input type="number" id="disc-rate"></div>
                <button class="btn" onclick="calcDiscount()">Calculate</button>
                <div id="disc-result" class="result-box" style="display:none;"></div>
            </div>
        `,
        js: `
            function calcDiscount() {
                const price = parseFloat(document.getElementById('disc-price').value);
                const rate = parseFloat(document.getElementById('disc-rate').value);
                const res = document.getElementById('disc-result');
                if (isNaN(price) || isNaN(rate)) { alert('Please enter valid numbers.'); return; }
                const discount = (price * rate) / 100;
                const finalPrice = price - discount;
                res.innerHTML = \`<h3>Final Price: ₹\${finalPrice.toFixed(2)}</h3><p>You Save: ₹\${discount.toFixed(2)}</p>\`;
                res.style.display = 'block';
            }
        `
    }
];
