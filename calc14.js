var tools14 = [
  { name: "Image Rotator", id: "imagerotator", icon: "🔃" },
  { name: "Image Watermark", id: "imagewatermark", icon: "💧" },
  { name: "Image Filters", id: "imagefilters", icon: "🎨" },
  { name: "Transparent Background", id: "transparentbg", icon: "🔲" }
];

var htmls14 = {
  imagerotator: '<div class="input-group"><label>Select Image</label><input type="file" id="imgrot_file" accept="image/*" /></div><div class="input-group"><label>Rotation Angle</label><select id="imgrot_angle"><option value="90">90° Right</option><option value="180">180°</option><option value="270">90° Left</option></select></div><button class="btn" onclick="rotateImage()">Rotate & Download</button><div id="imgrot_result" class="result-box"><p id="imgrot_val"></p></div>',
  imagewatermark: '<div class="input-group"><label>Select Image</label><input type="file" id="imgwm_file" accept="image/*" /></div><div class="input-group"><label>Watermark Text</label><input type="text" id="imgwm_text" value="World Calculators" /></div><button class="btn" onclick="addWatermark()">Add Watermark & Download</button><div id="imgwm_result" class="result-box"><p id="imgwm_val"></p></div>',
  imagefilters: '<div class="input-group"><label>Select Image</label><input type="file" id="imgflt_file" accept="image/*" /></div><div class="input-group"><label>Filter</label><select id="imgflt_type"><option value="grayscale(100%)">Grayscale (B&W)</option><option value="sepia(100%)">Sepia (Old)</option><option value="blur(5px)">Blur</option><option value="invert(100%)">Invert</option><option value="brightness(1.5)">Brighten</option></select></div><button class="btn" onclick="applyFilter()">Apply & Download</button><div id="imgflt_result" class="result-box"><p id="imgflt_val"></p></div>',
  transparentbg: '<div class="input-group"><label>Select Image</label><input type="file" id="imgtbg_file" accept="image/*" /></div><div class="input-group"><label>Remove Color (Hex)</label><input type="text" id="imgtbg_color" value="#ffffff" /></div><div class="input-group"><label>Tolerance (0-255)</label><input type="number" id="imgtbg_tol" value="30" /></div><button class="btn" onclick="makeTransparent()">Remove Background & Download</button><div id="imgtbg_result" class="result-box"><p id="imgtbg_val"></p></div>'
};

function rotateImage() {
  var file = document.getElementById('imgrot_file').files[0];
  var angle = parseInt(document.getElementById('imgrot_angle').value);
  if (!file) { alert("Please select an image!"); return; }
  var reader = new FileReader();
  reader.onload = function(e) {
    var img = new Image();
    img.onload = function() {
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      if (angle === 90 || angle === 270) {
        canvas.width = img.height;
        canvas.height = img.width;
      } else {
        canvas.width = img.width;
        canvas.height = img.height;
      }
      ctx.translate(canvas.width/2, canvas.height/2);
      ctx.rotate(angle * Math.PI / 180);
      ctx.drawImage(img, -img.width/2, -img.height/2);
      canvas.toBlob(function(blob) {
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'rotated_' + file.name;
        a.click();
        document.getElementById('imgrot_val').textContent = "Rotated " + angle + "°!";
        document.getElementById('imgrot_result').style.display='block';
      }, 'image/jpeg', 0.95);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function addWatermark() {
  var file = document.getElementById('imgwm_file').files[0];
  var text = document.getElementById('imgwm_text').value;
  if (!file || !text) { alert("Please select an image and enter text!"); return; }
  var reader = new FileReader();
  reader.onload = function(e) {
    var img = new Image();
    img.onload = function() {
      var canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      ctx.font = 'bold ' + Math.max(20, img.width/20) + 'px Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.lineWidth = 2;
      ctx.textAlign = 'center';
      ctx.strokeText(text, canvas.width/2, canvas.height - 30);
      ctx.fillText(text, canvas.width/2, canvas.height - 30);
      canvas.toBlob(function(blob) {
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'watermarked_' + file.name;
        a.click();
        document.getElementById('imgwm_val').textContent = "Watermark added!";
        document.getElementById('imgwm_result').style.display='block';
      }, 'image/jpeg', 0.95);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function applyFilter() {
  var file = document.getElementById('imgflt_file').files[0];
  var filter = document.getElementById('imgflt_type').value;
  if (!file) { alert("Please select an image!"); return; }
  var reader = new FileReader();
  reader.onload = function(e) {
    var img = new Image();
    img.onload = function() {
      var canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext('2d');
      ctx.filter = filter;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(function(blob) {
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'filtered_' + file.name;
        a.click();
        document.getElementById('imgflt_val').textContent = "Filter applied!";
        document.getElementById('imgflt_result').style.display='block';
      }, 'image/jpeg', 0.95);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function makeTransparent() {
  var file = document.getElementById('imgtbg_file').files[0];
  var colorHex = document.getElementById('imgtbg_color').value;
  var tol = parseInt(document.getElementById('imgtbg_tol').value) || 30;
  if (!file) { alert("Please select an image!"); return; }
  var reader = new FileReader();
  reader.onload = function(e) {
    var img = new Image();
    img.onload = function() {
      var canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var data = imgData.data;
      var r0 = parseInt(colorHex.substr(1, 2), 16);
      var g0 = parseInt(colorHex.substr(3, 2), 16);
      var b0 = parseInt(colorHex.substr(5, 2), 16);
      for (var i = 0; i < data.length; i += 4) {
        var r = data[i], g = data[i+1], b = data[i+2];
        if (Math.abs(r-r0) < tol && Math.abs(g-g0) < tol && Math.abs(b-b0) < tol) {
          data[i+3] = 0;
        }
      }
      ctx.putImageData(imgData, 0, 0);
      canvas.toBlob(function(blob) {
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'transparent_' + file.name.replace(/\.[^.]+$/, '') + '.png';
        a.click();
        document.getElementById('imgtbg_val').textContent = "Background removed! Saved as PNG.";
        document.getElementById('imgtbg_result').style.display='block';
      }, 'image/png');
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
          }
