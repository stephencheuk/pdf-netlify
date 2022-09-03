const bot = require('../bot')

function generateTimeStampFileName() {
  const fileName = `${Date.now().toString()}.pdf`;
  return fileName;
}

exports.handler = async function (event, context) {

  // const pdfFileName = generateTimeStampFileName();

  // const pdf = await bot({ url: "https://www.google.com" }, { width: 780, height: 1115 });
  const pdf = await bot({ file: "./pdf.htm" }, { width: 780, height: 1115 });

  const response = {
    headers: {
      "Content-type": "application/pdf",
    },
    statusCode: 200,
    body: pdf.toString("base64"),
    isBase64Encoded: true
  };

  context.succeed(response);

  // return {
  //   statusCode: 200,
  //   body: JSON.stringify({
  //     'status': 'ok'
  //   })
  // }

  // return {
  //   statusCode: 201,
  //   ContentType: 'application/pdf',
  //   body: Buffer.from(pdf, 'binary')
  // }
}