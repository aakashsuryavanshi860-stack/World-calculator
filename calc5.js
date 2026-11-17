var tools5 = [
  { name: "Force (F = ma)", id: "force", icon: "💪" },
  { name: "Work & Energy", id: "work", icon: "🔧" },
  { name: "Density", id: "density", icon: "⚗️" },
  { name: "Molarity", id: "molar", icon: "🧪" },
  { name: "BMI for Kids", id: "bmikids", icon: "🧒" },
  { name: "Calorie Deficit", id: "caldef", icon: "🍏" },
  { name: "Water Intake", id: "water", icon: "💧" },
  { name: "Concrete Calculator", id: "concrete", icon: "🧱" },
  { name: "Paint Calculator", id: "paint", icon: "🎨" },
  { name: "Tile Calculator", id: "tile", icon: "🟫" }
];

var htmls5 = {
  force: '<div class="input-group"><label>Mass (kg)</label><input type="number" id="f_m" /></div><div class="input-group"><label>Acceleration (m/s²)</label><input type="number" id="f_a" /></div><button class="btn" onclick="calcForce()">Calculate</button><div id="fResult" class="result-box"><p id="fValue">0</p></div>',
  work: '<div class="input-group"><label>Force (N)</label><input type="number" id="w_f" /></div><div class="input-group"><label>Distance (m)</label><input type="number" id="w_d" /></div><button class="btn" onclick="calcWork()">Calculate</button><div id="wResult" class="result-box"><p id="wValue">0</p></div>',
  density: '<div class="input-group"><label>Mass (kg)</label><input type="number" id="dn_m" /></div><div class="input-group"><label>Volume (m³)</label><input type="number" id="dn_v" /></div><button class="btn" onclick="calcDensity()">Calculate</button><div id="dnResult" class="result-box"><p id="dnValue">0</p></div>',
  molar: '<div class="input-group"><label>Moles</label><input type="number" id="mo_m" /></div><div class="input-group"><label>Volume (L)</label><input type="number" id="mo_v" /></div><button class="btn" onclick="calcMolar()">Calculate</button><div id="moResult" class="result-box"><p id="moValue">0</p></div>',
  bmikids: '<div class="input-group"><label>Weight (kg)</label><input type="number" id="bk_w" /></div><div class="input-group"><label>Height (cm)</label><input type="number" id="bk_h" /></div><button class="btn" onclick="calcBMIKids()">Calculate</button><div id="bkResult" class="result-box"><p id="bkValue">0</p></div>',
  caldef: '<div class="input-group"><label>Maintenance</label><input type="number" id="cd_m" /></div><div class="input-group"><label>Target</label><input type="number" id="cd_t" /></div><button class="btn" onclick="calcCalDef()">Calculate</button><div id="cdResult" class="result-box"><p id="cdValue">0</p></div>',
  water: '<div class="input-group"><label>Weight (kg)</label><input type="number" id="wa_w" /></div><div class="input-group"><label>Activity (mins)</label><input type="number" id="wa_a" /></div><button class="btn" onclick="calcWater()">Calculate</button><div id="waResult" class="result-box"><p id="waValue">0</p></div>',
  concrete: '<div class="input-group"><label>Length (m)</label><input type="number" id="con_l" /></div><div class="input-group"><label>Width (m)</label><input type="number" id="con_w" /></div><div class="input-group"><label>Depth (m)</label><input type="number" id="con_d" /></div><button class="btn" onclick="calcConcrete()">Calculate</button><div id="conResult" class="result-box"><p id="conValue">0</p></div>',
  paint: '<div class="input-group"><label>Wall Length (m)</label><input type="number" id="pt_l" /></div><div class="input-group"><label>Wall Height (m)</label><input type="number" id="pt_h" /></div><button class="btn" onclick="calcPaint()">Calculate</button><div id="ptResult" class="result-box"><p id="ptValue">0</p></div>',
  tile: '<div class="input-group"><label>Room Length (m)</label><input type="number" id="tl_l" /></div><div class="input-group"><label>Room Width (m)</label><input type="number" id="tl_w" /></div><div class="input-group"><label>Tile Size (sqm)</label><input type="number" id="tl_s" /></div><button class="btn" onclick="calcTile()">Calculate</button><div id="tlResult" class="result-box"><p id="tlValue">0</p></div>'
};

function calcForce() { var m=parseFloat(document.getElementById('f_m').value), a=parseFloat(document.getElementById('f_a').value); if(!isNaN(m)&&!isNaN(a)){ document.getElementById('fValue').textContent=(m*a).toFixed(2)+" N"; document.getElementById('fResult').style.display='block'; } }
function calcWork() { var f=parseFloat(document.getElementById('w_f').value), d=parseFloat(document.getElementById('w_d').value); if(!isNaN(f)&&!isNaN(d)){ document.getElementById('wValue').textContent=(f*d).toFixed(2)+" J"; document.getElementById('wResult').style.display='block'; } }
function calcDensity() { var m=parseFloat(document.getElementById('dn_m').value), v=parseFloat(document.getElementById('dn_v').value); if(!isNaN(m)&&!isNaN(v)&&v>0){ document.getElementById('dnValue').textContent=(m/v).toFixed(2)+" kg/m³"; document.getElementById('dnResult').style.display='block'; } }
function calcMolar() { var m=parseFloat(document.getElementById('mo_m').value), v=parseFloat(document.getElementById('mo_v').value); if(!isNaN(m)&&!isNaN(v)&&v>0){ document.getElementById('moValue').textContent=(m/v).toFixed(3)+" M"; document.getElementById('moResult').style.display='block'; } }
function calcBMIKids() { var w=parseFloat(document.getElementById('bk_w').value), h=parseFloat(document.getElementById('bk_h').value); if(!isNaN(w)&&!isNaN(h)&&w>0&&h>0){ document.getElementById('bkValue').textContent=(w/Math.pow(h/100,2)).toFixed(1); document.getElementById('bkResult').style.display='block'; } }
function calcCalDef() { var m=parseFloat(document.getElementById('cd_m').value), t=parseFloat(document.getElementById('cd_t').value); if(!isNaN(m)&&!isNaN(t)){ document.getElementById('cdValue').textContent=(m-t).toFixed(0)+" kcal/day"; document.getElementById('cdResult').style.display='block'; } }
function calcWater() { var w=parseFloat(document.getElementById('wa_w').value), a=parseFloat(document.getElementById('wa_a').value); if(!isNaN(w)&&!isNaN(a)){ document.getElementById('waValue').textContent=(w*0.033+(a/30)*0.35).toFixed(2)+" Liters"; document.getElementById('waResult').style.display='block'; } }
function calcConcrete() { var l=parseFloat(document.getElementById('con_l').value), w=parseFloat(document.getElementById('con_w').value), d=parseFloat(document.getElementById('con_d').value); if(!isNaN(l)&&!isNaN(w)&&!isNaN(d)){ document.getElementById('conValue').textContent=(l*w*d).toFixed(3)+" m³"; document.getElementById('conResult').style.display='block'; } }
function calcPaint() { var l=parseFloat(document.getElementById('pt_l').value), h=parseFloat(document.getElementById('pt_h').value); if(!isNaN(l)&&!isNaN(h)){ document.getElementById('ptValue').textContent=((l*h)/10).toFixed(2)+" Liters"; document.getElementById('ptResult').style.display='block'; } }
function calcTile() { var l=parseFloat(document.getElementById('tl_l').value), w=parseFloat(document.getElementById('tl_w').value), s=parseFloat(document.getElementById('tl_s').value); if(!isNaN(l)&&!isNaN(w)&&!isNaN(s)&&s>0){ document.getElementById('tlValue').textContent=Math.ceil((l*w)/s)+" Tiles"; document.getElementById('tlResult').style.display='block'; } }
