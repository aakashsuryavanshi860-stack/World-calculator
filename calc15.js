var tools15 = [
  { name: "Merge PDF", id: "mergepdf", icon: "📄" },
  { name: "Split PDF", id: "splitpdf", icon: "✂️" },
  { name: "JPG to PDF", id: "jpgtopdf", icon: "🖼️" },
  { name: "PDF to JPG", id: "pdftojpg", icon: "📸" }
];

var htmls15 = {
  mergepdf: '<div class="input-group"><label>Select PDF Files (2 or more)</label><input type="file" id="pdfmerge_files" accept="application/pdf" multiple /></div><button class="btn" onclick="mergePDFs()">Merge & Download</button><div id="pdfmerge_result" class="result-box"><p id="pdfmerge_val"></p></div>',
  splitpdf: '<div class="input-group"><label>Select PDF File</label><input type="file" id="pdfsplit_file" accept="application/pdf" /></div><div class="input-group"><label>Page Number to Extract</label><input type="number" id="pdfsplit_page" value="1" min="1" /></div><button class="btn" onclick="splitPDF()">Extract & Download</button><div id="pdfsplit_result" class="result-box"><p id="pdfsplit_val"></p></div>',
  jpgtopdf: '<div class="input-group"><label>Select Images (JPG/PNG)</label><input type="file" id="jpgtopdf_files" accept="image/*" multiple /></div><button class="btn" onclick="jpgToPDF()">Convert & Download</button><div id="jpgtopdf_result" class="result-box"><p id="jpgtopdf_val"></p></div>',
  pdftojpg: '<div class="input-group"><label>Select PDF File</label><input type="file" id="pdftojpg_file" accept="application/pdf" /></div><div class="input-group"><label>Page Number to Convert</label><input type="number" id="pdftojpg_page" value="1" min="1" /></div><button class="btn" onclick="pdfToJPG()">Convert & Download</button><div id="pdftojpg_result" class="result-box"><p id="pdftojpg_val"></p></div>'
};

// ========== Merge PDF ==========
async function mergePDFs() {
  var files = document.getElementById('pdfmerge_files').files;
  if (files.length < 2) { alert("Please select at least 2 PDF files!"); return; }
  var { PDFDocument } = PDFLib;
  var mergedPdf = await PDFDocument.create();
  for (var i = 0; i < files.length; i++) {
    var arrayBuffer = await files[i].arrayBuffer();
    var pdf = await PDFDocument.load(arrayBuffer);
    var pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    pages.forEach(page => mergedPdf.addPage(page));
  }
  var pdfBytes = await mergedPdf.save();
  var blob = new Blob([pdfBytes], { type: 'application/pdf' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'merged.pdf';
  a.click();
  document.getElementById('pdfmerge_val').textContent = "Merged " + files.length + " PDFs successfully!";
  document.getElementById('pdfmerge_result').style.display='block';
}

// ========== Split PDF ==========
async function splitPDF() {
  var file = document.getElementById('pdfsplit_file').files[0];
  var pageNum = parseInt(document.getElementById('pdfsplit_page').value);
  if (!file) { alert("Please select a PDF file!"); return; }
  if (!pageNum || pageNum < 1) { alert("Enter a valid page number!"); return; }
  var { PDFDocument } = PDFLib;
  var arrayBuffer = await file.arrayBuffer();
  var pdf = await PDFDocument.load(arrayBuffer);
  if (pageNum > pdf.getPageCount()) { alert("Page number exceeds total pages (" + pdf.getPageCount() + ")!"); return; }
  var newPdf = await PDFDocument.create();
  var [copiedPage] = await newPdf.copyPages(pdf, [pageNum - 1]);
  newPdf.addPage(copiedPage);
  var pdfBytes = await newPdf.save();
  var blob = new Blob([pdfBytes], { type: 'application/pdf' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'page_' + pageNum + '.pdf';
  a.click();
  document.getElementById('pdfsplit_val').textContent = "Extracted page " + pageNum + "!";
  document.getElementById('pdfsplit_result').style.display='block';
}

// ========== JPG to PDF ==========
async function jpgToPDF() {
  var files = document.getElementById('jpgtopdf_files').files;
  if (files.length < 1) { alert("Please select at least 1 image!"); return; }
  var { PDFDocument } = PDFLib;
  var pdfDoc = await PDFDocument.create();
  for (var i = 0; i < files.length; i++) {
    var arrayBuffer = await files[i].arrayBuffer();
    var imageBytes = new Uint8Array(arrayBuffer);
    var image;
    if (files[i].type === 'image/png') {
      image = await pdfDoc.embedPng(imageBytes);
    } else {
      image = await pdfDoc.embedJpg(imageBytes);
    }
    var page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
  }
  var pdfBytes = await pdfDoc.save();
  var blob = new Blob([pdfBytes], { type: 'application/pdf' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'images.pdf';
  a.click();
  document.getElementById('jpgtopdf_val').textContent = "Converted " + files.length + " images to PDF!";
  document.getElementById('jpgtopdf_result').style.display='block';
}

// ========== PDF to JPG ==========
async function pdfToJPG() {
  var file = document.getElementById('pdftojpg_file').files[0];
  var pageNum = parseInt(document.getElementById('pdftojpg_page').value);
  if (!file) { alert("Please select a PDF file!"); return; }
  if (!pageNum || pageNum < 1) { alert("Enter a valid page number!"); return; }
  
  var arrayBuffer = await file.arrayBuffer();
  var loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  var pdf = await loadingTask.promise;
  if (pageNum > pdf.numPages) { alert("Page number exceeds total pages (" + pdf.numPages + ")!"); return; }
  
  var page = await pdf.getPage(pageNum);
  var viewport = page.getViewport({ scale: 2 });
  var canvas = document.createElement('canvas');
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  var ctx = canvas.getContext('2d');
  await page.render({ canvasContext: ctx, viewport: viewport }).promise;
  
  canvas.toBlob(function(blob) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'page_' + pageNum + '.jpg';
    a.click();
    document.getElementById('pdftojpg_val').textContent = "Page " + pageNum + " converted to JPG!";
    document.getElementById('pdftojpg_result').style.display='block';
  }, 'image/jpeg', 0.95);
}
