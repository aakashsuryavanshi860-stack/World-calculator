var tools18 = [
  { name: "QR Code Generator", id: "qrcodegen", icon: "🔲" },
  { name: "QR Code Scanner", id: "qrcodescan", icon: "📷" }
];

var htmls18 = {
  qrcodegen: '<div class="input-group"><label>Enter Text/URL</label><textarea id="qr_text" rows="3" style="width:100%;padding:10px;border:1px solid #d1d5db;border-radius:6px;"></textarea></div><button class="btn" onclick="generateQR()">Generate QR Code</button><div id="qr_result" class="result-box"><div id="qr_canvas"></div><p id="qr_val"></p></div>',
  qrcodescan: '<div class="input-group"><label>Upload QR Code Image</label><input type="file" id="qrscan_file" accept="image/*" /></div><button class="btn" onclick="scanQR()">Scan QR Code</button><div id="qrscan_result" class="result-box"><p id="qrscan_val"></p></div>'
};

function generateQR() {
  var text = document.getElementById('qr_text').value;
  if (!text) { alert("Please enter text or URL!"); return; }
  var container = document.getElementById('qr_canvas');
  container.innerHTML = '';
  if (typeof QRCode !== 'undefined') {
    new QRCode(container, {
      text: text,
      width: 200,
      height: 200
    });
    document.getElementById('qr_val').textContent = "QR Code generated!";
  } else {
    document.getElementById('qr_val').textContent = "QR Library loading... Please wait and try again.";
  }
  document.getElementById('qr_result').style.display='block';
}

function scanQR() {
  var file = document.getElementById('qrscan_file').files[0];
  if (!file) { alert("Please select a QR code image!"); return; }
  var reader = new FileReader();
  reader.onload = function(e) {
    var img = new Image();
    img.onload = function() {
      var canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      if (typeof jsQR !== 'undefined') {
        var code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
          document.getElementById('qrscan_val').textContent = "✅ QR Code: " + code.data;
        } else {
          document.getElementById('qrscan_val').textContent = "❌ No QR code detected in image.";
        }
      } else {
        document.getElementById('qrscan_val').textContent = "QR Scanner library loading... Please wait.";
      }
      document.getElementById('qrscan_result').style.display='block';
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}
