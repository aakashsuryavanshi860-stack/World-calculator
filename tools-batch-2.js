/* ==========================================
   बैच 2 (भाग 1): पहले 5 टूल्स
   ========================================== */

var tools2 = [
    {
        id: "calorie-calculator",
        name: "Calorie Calculator",
        icon: "🍎",
        title: "Calorie Calculator - Daily Calorie Needs",
        description: "Calculate the number of calories you need to consume daily to maintain, lose, or gain weight.",
        html: `
            <div class="tool-container">
                <h1>Calorie Calculator</h1>
                <p class="subtitle">Find out how many calories you need per day based on your activity level.</p>
                <div class="input-group">
                    <label>Age:</label>
                    <input type="number" id="cal-age">
                </div>
                <div class="input-group">
                    <label>Gender:</label>
                    <select id="cal-gender">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div class="input-group">
                    <label>Weight (kg):</label>
                    <input type="number" id="cal-weight">
                </div>
                <div class="input-group">
                    <label>Height (cm):</label>
                    <input type="number" id="cal-height">
                </div>
                <div class="input-group">
                    <label>Activity Level:</label>
                    <select id="cal-activity">
                        <option value="1.2">Sedentary (little or no exercise)</option>
                        <option value="1.375">Lightly active (light exercise 1-3 days/week)</option>
                        <option value="1.55">Moderately active (moderate exercise 3-5 days/week)</option>
                        <option value="1.725">Very active (hard exercise 6-7 days/week)</option>
                        <option value="1.9">Extra active (very hard exercise & physical job)</option>
                    </select>
                </div>
                <button class="btn" onclick="calcCalories()">Calculate Calories</button>
                <div id="cal-result" class="result-box" style="display:none;"></div>
                <div class="seo-content">
                    <h2>About Calorie Calculator</h2>
                    <p>This calculator uses the Mifflin-St Jeor equation to estimate your Basal Metabolic Rate (BMR) and then multiplies it by an activity factor to determine your Total Daily Energy Expenditure (TDEE).</p>
                    <h2>Privacy Policy</h2>
                    <p>Your personal data (age, weight, height) is calculated locally and never saved on our servers.</p>
                </div>
            </div>
        `,
        js: `
            function calcCalories() {
                const age = parseFloat(document.getElementById('cal-age').value);
                const gender = document.getElementById('cal-gender').value;
                const weight = parseFloat(document.getElementById('cal-weight').value);
                const height = parseFloat(document.getElementById('cal-height').value);
                const activity = parseFloat(document.getElementById('cal-activity').value);
                const res = document.getElementById('cal-result');

                if (isNaN(age) || isNaN(weight) || isNaN(height)) { alert('Please fill all fields.'); return; }

                let bmr;
                if (gender === 'male') {
                    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
                } else {
                    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
                }
                const tdee = bmr * activity;
                res.innerHTML = \`<h3>Your Daily Calorie Needs:</h3>
                    <p style="font-size:1.2rem; font-weight:bold; color:var(--accent);">\${Math.round(tdee)} Calories/day</p>
                    <p>To lose weight: \${Math.round(tdee - 500)} Calories/day</p>
                    <p>To gain weight: \${Math.round(tdee + 500)} Calories/day</p>\`;
                res.style.display = 'block';
            }
        `
    },
    {
        id: "loan-calculator",
        name: "Loan Calculator",
        icon: "💵",
        title: "Loan Calculator - Calculate Monthly Payments",
        description: "Calculate monthly payments, total interest, and payoff time for any loan.",
        html: `
            <div class="tool-container">
                <h1>Loan Calculator</h1>
                <div class="input-group">
                    <label>Loan Amount (₹):</label>
                    <input type="number" id="loan-amt">
                </div>
                <div class="input-group">
                    <label>Interest Rate (% per year):</label>
                    <input type="number" id="loan-rate" step="0.1">
                </div>
                <div class="input-group">
                    <label>Loan Term (Years):</label>
                    <input type="number" id="loan-term">
                </div>
                <button class="btn" onclick="calcLoan()">Calculate Loan</button>
                <div id="loan-result" class="result-box" style="display:none;"></div>
            </div>
        `,
        js: `
            function calcLoan() {
                const p = parseFloat(document.getElementById('loan-amt').value);
                const r = parseFloat(document.getElementById('loan-rate').value) / 100 / 12;
                const t = parseFloat(document.getElementById('loan-term').value) * 12;
                const res = document.getElementById('loan-result');
                if (isNaN(p) || isNaN(r) || isNaN(t)) { alert('Please fill all fields.'); return; }
                const monthly = (p * r * Math.pow(1 + r, t)) / (Math.pow(1 + r, t) - 1);
                res.innerHTML = \`<h3>Monthly Payment: ₹\${monthly.toFixed(2)}</h3><p>Total Payment: ₹\${(monthly * t).toFixed(2)}</p><p>Total Interest: ₹\${(monthly * t - p).toFixed(2)}</p>\`;
                res.style.display = 'block';
            }
        `
    },
    {
        id: "length-converter",
        name: "Length Converter",
        icon: "📏",
        title: "Length Converter - Meters, Feet, Inches, CM",
        description: "Convert between different units of length like meters, feet, inches, centimeters, and more.",
        html: `
            <div class="tool-container">
                <h1>Length Converter</h1>
                <div class="input-group">
                    <label>Value:</label>
                    <input type="number" id="len-value">
                </div>
                <div class="input-group">
                    <label>From Unit:</label>
                    <select id="len-from">
                        <option value="m">Meters (m)</option>
                        <option value="km">Kilometers (km)</option>
                        <option value="cm">Centimeters (cm)</option>
                        <option value="mm">Millimeters (mm)</option>
                        <option value="mi">Miles (mi)</option>
                        <option value="yd">Yards (yd)</option>
                        <option value="ft">Feet (ft)</option>
                        <option value="in">Inches (in)</option>
                    </select>
                </div>
                <div class="input-group">
                    <label>To Unit:</label>
                    <select id="len-to">
                        <option value="m">Meters (m)</option>
                        <option value="km">Kilometers (km)</option>
                        <option value="cm">Centimeters (cm)</option>
                        <option value="mm">Millimeters (mm)</option>
                        <option value="mi">Miles (mi)</option>
                        <option value="yd">Yards (yd)</option>
                        <option value="ft">Feet (ft)</option>
                        <option value="in">Inches (in)</option>
                    </select>
                </div>
                <button class="btn" onclick="convertLength()">Convert</button>
                <div id="len-result" class="result-box" style="display:none;"></div>
            </div>
        `,
        js: `
            function convertLength() {
                const val = parseFloat(document.getElementById('len-value').value);
                const from = document.getElementById('len-from').value;
                const to = document.getElementById('len-to').value;
                const res = document.getElementById('len-result');
                if (isNaN(val)) { alert('Please enter a valid number.'); return; }

                const factors = {
                    m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.34, yd: 0.9144, ft: 0.3048, in: 0.0254
                };
                const inMeters = val * factors[from];
                const converted = inMeters / factors[to];
                res.innerHTML = \`<h3>\${val} \${from} = \${converted.toFixed(4)} \${to}</h3>\`;
                res.style.display = 'block';
            }
        `
    },
    {
        id: "weight-converter",
        name: "Weight Converter",
        icon: "⚖️",
        title: "Weight Converter - KG, Pounds, Ounces",
        description: "Convert weight units like kilograms, pounds, ounces, grams, and stones.",
        html: `
            <div class="tool-container">
                <h1>Weight Converter</h1>
                <div class="input-group"><label>Value:</label><input type="number" id="wt-value"></div>
                <div class="input-group">
                    <label>From:</label>
                    <select id="wt-from">
                        <option value="kg">Kilograms (kg)</option>
                        <option value="g">Grams (g)</option>
                        <option value="lb">Pounds (lb)</option>
                        <option value="oz">Ounces (oz)</option>
                    </select>
                </div>
                <div class="input-group">
                    <label>To:</label>
                    <select id="wt-to">
                        <option value="kg">Kilograms (kg)</option>
                        <option value="g">Grams (g)</option>
                        <option value="lb">Pounds (lb)</option>
                        <option value="oz">Ounces (oz)</option>
                    </select>
                </div>
                <button class="btn" onclick="convertWeight()">Convert</button>
                <div id="wt-result" class="result-box" style="display:none;"></div>
            </div>
        `,
        js: `
            function convertWeight() {
                const val = parseFloat(document.getElementById('wt-value').value);
                const from = document.getElementById('wt-from').value;
                const to = document.getElementById('wt-to').value;
                const res = document.getElementById('wt-result');
                if (isNaN(val)) { alert('Please enter a valid number.'); return; }
                const factors = { kg: 1, g: 0.001, lb: 0.453592, oz: 0.0283495 };
                const inKg = val * factors[from];
                const converted = inKg / factors[to];
                res.innerHTML = \`<h3>\${val} \${from} = \${converted.toFixed(4)} \${to}</h3>\`;
                res.style.display = 'block';
            }
        `
    },
    {
        id: "temperature-converter",
        name: "Temperature Converter",
        icon: "🌡️",
        title: "Temperature Converter - Celsius, Fahrenheit, Kelvin",
        description: "Convert temperatures between Celsius, Fahrenheit, and Kelvin instantly.",
        html: `
            <div class="tool-container">
                <h1>Temperature Converter</h1>
                <div class="input-group"><label>Value:</label><input type="number" id="temp-value"></div>
                <div class="input-group">
                    <label>From:</label>
                    <select id="temp-from">
                        <option value="c">Celsius (°C)</option>
                        <option value="f">Fahrenheit (°F)</option>
                        <option value="k">Kelvin (K)</option>
                    </select>
                </div>
                <div class="input-group">
                    <label>To:</label>
                    <select id="temp-to">
                        <option value="c">Celsius (°C)</option>
                        <option value="f">Fahrenheit (°F)</option>
                        <option value="k">Kelvin (K)</option>
                    </select>
                </div>
                <button class="btn" onclick="convertTemp()">Convert</button>
                <div id="temp-result" class="result-box" style="display:none;"></div>
            </div>
        `,
        js: `
            function convertTemp() {
                const val = parseFloat(document.getElementById('temp-value').value);
                const from = document.getElementById('temp-from').value;
                const to = document.getElementById('temp-to').value;
                const res = document.getElementById('temp-result');
                if (isNaN(val)) { alert('Please enter a valid number.'); return; }
                
                let celsius;
                if (from === 'c') celsius = val;
                else if (from === 'f') celsius = (val - 32) * 5/9;
                else if (from === 'k') celsius = val - 273.15;

                let result;
                if (to === 'c') result = celsius;
                else if (to === 'f') result = (celsius * 9/5) + 32;
                else if (to === 'k') result = celsius + 273.15;

                res.innerHTML = \`<h3>\${val}°\${from.toUpperCase()} = \${result.toFixed(2)}°\${to.toUpperCase()}</h3>\`;
                res.style.display = 'block';
            }
        `
    }
];
/* ==========================================
   बैच 2 (भाग 2): अगले 5 टूल्स
   ========================================== */

var tools2_part2 = [
    {
        id: "speed-converter",
        name: "Speed Converter",
        icon: "🚀",
        title: "Speed Converter - km/h, mph, m/s",
        description: "Convert speed units like kilometers per hour, miles per hour, and meters per second.",
        html: `
            <div class="tool-container">
                <h1>Speed Converter</h1>
                <div class="input-group"><label>Value:</label><input type="number" id="speed-value"></div>
                <div class="input-group">
                    <label>From:</label>
                    <select id="speed-from">
                        <option value="kmh">km/h</option>
                        <option value="mph">mph</option>
                        <option value="ms">m/s</option>
                    </select>
                </div>
                <div class="input-group">
                    <label>To:</label>
                    <select id="speed-to">
                        <option value="kmh">km/h</option>
                        <option value="mph">mph</option>
                        <option value="ms">m/s</option>
                    </select>
                </div>
                <button class="btn" onclick="convertSpeed()">Convert</button>
                <div id="speed-result" class="result-box" style="display:none;"></div>
            </div>
        `,
        js: `
            function convertSpeed() {
                const val = parseFloat(document.getElementById('speed-value').value);
                const from = document.getElementById('speed-from').value;
                const to = document.getElementById('speed-to').value;
                const res = document.getElementById('speed-result');
                if (isNaN(val)) { alert('Please enter a valid number.'); return; }
                
                const factors = { kmh: 1, mph: 1.60934, ms: 3.6 };
                const inKmh = val * factors[from];
                const result = inKmh / factors[to];
                res.innerHTML = \`<h3>\${val} \${from} = \${result.toFixed(4)} \${to}</h3>\`;
                res.style.display = 'block';
            }
        `
    },
    {
        id: "time-converter",
        name: "Time Converter",
        icon: "⏱️",
        title: "Time Converter - Seconds, Minutes, Hours, Days",
        description: "Convert time units easily between seconds, minutes, hours, days, and weeks.",
        html: `
            <div class="tool-container">
                <h1>Time Converter</h1>
                <div class="input-group"><label>Value:</label><input type="number" id="time-value"></div>
                <div class="input-group">
                    <label>From:</label>
                    <select id="time-from">
                        <option value="s">Seconds</option>
                        <option value="m">Minutes</option>
                        <option value="h">Hours</option>
                        <option value="d">Days</option>
                    </select>
                </div>
                <div class="input-group">
                    <label>To:</label>
                    <select id="time-to">
                        <option value="s">Seconds</option>
                        <option value="m">Minutes</option>
                        <option value="h">Hours</option>
                        <option value="d">Days</option>
                    </select>
                </div>
                <button class="btn" onclick="convertTime()">Convert</button>
                <div id="time-result" class="result-box" style="display:none;"></div>
            </div>
        `,
        js: `
            function convertTime() {
                const val = parseFloat(document.getElementById('time-value').value);
                const from = document.getElementById('time-from').value;
                const to = document.getElementById('time-to').value;
                const res = document.getElementById('time-result');
                if (isNaN(val)) { alert('Please enter a valid number.'); return; }
                const factors = { s: 1, m: 60, h: 3600, d: 86400 };
                const inSeconds = val * factors[from];
                const result = inSeconds / factors[to];
                res.innerHTML = \`<h3>\${val} \${from} = \${result.toFixed(4)} \${to}</h3>\`;
                res.style.display = 'block';
            }
        `
    },
    {
        id: "data-converter",
        name: "Data Converter",
        icon: "💾",
        title: "Data Storage Converter - MB, GB, TB",
        description: "Convert digital storage units like bytes, kilobytes, megabytes, gigabytes, and terabytes.",
        html: `
            <div class="tool-container">
                <h1>Data Storage Converter</h1>
                <div class="input-group"><label>Value:</label><input type="number" id="data-value"></div>
                <div class="input-group">
                    <label>From:</label>
                    <select id="data-from">
                        <option value="b">Bytes</option>
                        <option value="kb">Kilobytes (KB)</option>
                        <option value="mb">Megabytes (MB)</option>
                        <option value="gb">Gigabytes (GB)</option>
                        <option value="tb">Terabytes (TB)</option>
                    </select>
                </div>
                <div class="input-group">
                    <label>To:</label>
                    <select id="data-to">
                        <option value="b">Bytes</option>
                        <option value="kb">Kilobytes (KB)</option>
                        <option value="mb">Megabytes (MB)</option>
                        <option value="gb">Gigabytes (GB)</option>
                        <option value="tb">Terabytes (TB)</option>
                    </select>
                </div>
                <button class="btn" onclick="convertData()">Convert</button>
                <div id="data-result" class="result-box" style="display:none;"></div>
            </div>
        `,
        js: `
            function convertData() {
                const val = parseFloat(document.getElementById('data-value').value);
                const from = document.getElementById('data-from').value;
                const to = document.getElementById('data-to').value;
                const res = document.getElementById('data-result');
                if (isNaN(val)) { alert('Please enter a valid number.'); return; }
                const factors = { b: 1, kb: 1024, mb: 1048576, gb: 1073741824, tb: 1099511627776 };
                const inBytes = val * factors[from];
                const result = inBytes / factors[to];
                res.innerHTML = \`<h3>\${val} \${from} = \${result.toFixed(6)} \${to}</h3>\`;
                res.style.display = 'block';
            }
        `
    },
    {
        id: "word-counter",
        name: "Word Counter",
        icon: "📝",
        title: "Word Counter - Count Words and Characters",
        description: "Count the number of words, characters, sentences, and paragraphs in your text.",
        html: `
            <div class="tool-container">
                <h1>Word Counter</h1>
                <div class="input-group">
                    <label>Paste or type your text here:</label>
                    <textarea id="word-text" rows="8" style="width:100%; padding:10px; border-radius:6px; border:1px solid #d1d5db;"></textarea>
                </div>
                <button class="btn" onclick="countWords()">Count Words</button>
                <div id="word-result" class="result-box" style="display:none;"></div>
            </div>
        `,
        js: `
            function countWords() {
                const text = document.getElementById('word-text').value;
                const res = document.getElementById('word-result');
                const words = text.trim() === '' ? 0 : text.trim().split(/\\s+/).length;
                const chars = text.length;
                const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
                res.innerHTML = \`<h3>Words: \${words}</h3><p>Characters: \${chars}</p><p>Sentences: \${sentences}</p>\`;
                res.style.display = 'block';
            }
        `
    },
    {
        id: "character-counter",
        name: "Character Counter",
        icon: "🔤",
        title: "Character Counter - Count Characters Online",
        description: "Count characters, letters, and spaces in your text instantly.",
        html: `
            <div class="tool-container">
                <h1>Character Counter</h1>
                <div class="input-group">
                    <label>Paste or type your text here:</label>
                    <textarea id="char-text" rows="8" style="width:100%; padding:10px; border-radius:6px; border:1px solid #d1d5db;"></textarea>
                </div>
                <button class="btn" onclick="countChars()">Count Characters</button>
                <div id="char-result" class="result-box" style="display:none;"></div>
            </div>
        `,
        js: `
            function countChars() {
                const text = document.getElementById('char-text').value;
                const res = document.getElementById('char-result');
                const charsWithSpaces = text.length;
                const charsWithoutSpaces = text.replace(/\\s/g, '').length;
                res.innerHTML = \`<h3>Characters (with spaces): \${charsWithSpaces}</h3><p>Characters (without spaces): \${charsWithoutSpaces}</p>\`;
                res.style.display = 'block';
            }
        `
    }
];

// यह लाइन दोनों हिस्सों (भाग 1 और भाग 2) को आपस में जोड़ देगी
tools2 = tools2.concat(tools2_part2);
