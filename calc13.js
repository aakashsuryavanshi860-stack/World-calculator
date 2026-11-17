var tools13 = [
  { name: "Image Compressor", id: "imagecompressor", icon: "🗜️" },
  { name: "Image Resizer", id: "imageresizer", icon: "📏" },
  { name: "Image Converter", id: "imageconverter", icon: "🔄" },
  { name: "Image Cropper", id: "imagecropper", icon: "✂️" }
];

var htmls13 = {
  imagecompressor: '<div class="input-group"><label>Select Image (JPG/PNG)</label><input type="file" id="imgcomp_file" accept="image/*" /></div><div class="input-group"><label>Quality (%)</label><input type="range" id="imgcomp_q" min="10" max="100" value="70" /></div><button class="btn" onclick="compressImage()">Compress & Download</button><div id="imgcomp_result" class="result-box"><p id="imgcomp_val"></p></div>',
  imageresizer: '<div class="input-group"><label>Select Image</label><input type="file" id="imgres_file" accept="image/*" /></div><div class="input-group"><label>New Width (px)</label><input type="number" id="imgres_w" /></div><div class="input-group"><label>New Height (px)</label><input type="number" id="imgres_h" /></div><button class="btn" onclick="resizeImage()">Resize & Download</button><div id="imgres_result" class="result-box"><p id="imgres_val"></p></div>',
  imageconverter: '<div class="input-group"><label>Select Image</label><input type="file" id="imgconv_file" accept="image/*" /></div><div class="input-group"><label>Convert To</label><select id="imgconv_format"><option value="image/jpeg">JPG</option><option value="image/png">PNG</option><option value="image/webp">WEBP</option></select></div><button class="btn" onclick="convertImage()">Convert & Download</button><div id="imgconv_result" class="result-box"><p id="imgconv_val"></p></div>',
  imagecropper: '<div class="input-group"><label>Select Image</label><input type="file" id="imgcrop_file" accept="image/*" /></div><div class="input-group"><label>Crop X (px)</label><input type="number" id="imgcrop_x" value="0" /></div><div class="input-group"><label>Crop Y (px)</label><input type="number" id="imgcrop_y" value="0" /></div><div class="input-group"><label>Crop Width (px)</label><input type="number" id="imgcrop_w" /></div><div class="input-group"><label>Crop Height (px)</label><input type="number" id="imgcrop_h" /></div><button class="btn" onclick="cropImage()">Crop & Download</button><div id="imgcrop_result" class="result-box"><p id="imgcrop_val"></p></div>'
};

function compressImage() {
  var file = document.getElementById('imgcomp_file').files[0];
  if (!file) { alert("Please select an image first!"); return; }
  var quality = document.getElementById('imgcomp_q').value / 100;
  var reader = new FileReader();
  reader.onload = function(e) {
    var img = new Image();
    img.onload = function() {
      var canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(function(blob) {
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'compressed_' + file.name;
        a.click();
        document.getElementById('imgcomp_val').textContent = "Compressed! Size: " + (blob.size/1024).toFixed(2) + " KB";
        document.getElementById('imgcomp_result').style.display='block';
      }, 'image/jpeg', quality);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function resizeImage() {
  var file = document.getElementById('imgres_file').files[0];
  var nw = parseInt(document.getElementById('imgres_w').value);
  var nh = parseInt(document.getElementById('imgres_h').value);
  if (!file) { alert("Please select an image!"); return; }
  if (!nw || !nh) { alert("Please enter width and height!"); return; }
  var reader = new FileReader();
  reader.onload = function(e) {
    var img = new Image();
    img.onload = function() {
      var canvas = document.createElement('canvas');
      canvas.width = nw;
      canvas.height = nh;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, nw, nh);
      canvas.toBlob(function(blob) {
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'resized_' + file.name;
        a.click();
        document.getElementById('imgres_val').textContent = "Resized to " + nw + "x" + nh + " px!";
        document.getElementById('imgres_result').style.display='block';
      }, 'image/jpeg', 0.95);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function convertImage() {
  var file = document.getElementById('imgconv_file').files[0];
  var fmt = document.getElementById('imgconv_format').value;
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
      canvas.toBlob(function(blob) {
        var ext = fmt.split('/')[1];
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'converted.' + ext;
        a.click();
        document.getElementById('imgconv_val').textContent = "Converted to " + ext.toUpperCase() + "!";
        document.getElementById('imgconv_result').style.display='block';
      }, fmt, 0.95);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function cropImage() {
  var file = document.getElementById('imgcrop_file').files[0];
  var x = parseInt(document.getElementById('imgcrop_x').value)||0;
  var y = parseInt(document.getElementById('imgcrop_y').value)||0;
  var w = parseInt(document.getElementById('imgcrop_w').value);
  var h = parseInt(document.getElementById('imgcrop_h').value);
  if (!file) { alert("Please select an image!"); return; }
  if (!w || !h) { alert("Please enter crop width and height!"); return; }
  var reader = new FileReader();
  reader.onload = function(e) {
    var img = new Image();
    img.onload = function() {
      var canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, x, y, w, h, 0, 0, w, h);
      canvas.toBlob(function(blob) {
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'cropped_' + file.name;
        a.click();
        document.getElementById('imgcrop_val').textContent = "Cropped! " + w + "x" + h + " px";
        document.getElementById('imgcrop_result').style.display='block';
      }, 'image/jpeg', 0.95);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
          }
