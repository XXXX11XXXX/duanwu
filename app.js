const apiBaseUrl = 'http://www.codeman.ink/api/';
async function generateQRKey() {
  const response = await fetch(`${apiBaseUrl}/login/qr/key`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const { key } = await response.json();
  return key;
}
async function createQRCode(key) {
  const response = await fetch(`${apiBaseUrl}/login/qr/create?key=${key}&qrimg=true`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const { qrimg } = await response.json();
  return qrimg;
}
async function checkQRStatus(key) {
  const checkStatus = setInterval(async () => {
    const response = await fetch(`${apiBaseUrl}/login/qr/check?key=${key}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const { status } = await response.json();
    document.getElementById('qrStatus').textContent = `二维码状态: ${status}`;
    
    if (status === 803) {
      clearInterval(checkStatus);
      alert('二维码扫描成功，请在手机上完成登录。');
    }
  }, 5000); 
}
async function main() {
  try {
    const key = await generateQRKey();
    const qrimg = await createQRCode(key);
    const qrCodeImage = document.getElementById('qrCodeImage');
    qrCodeImage.src = `data:image/png;base64,${qrimg}`;
    qrCodeImage.style.display = 'block'; 
    await checkQRStatus(key);
  } catch (error) {
    console.error('请求失败:', error);
  }
}
document.addEventListener('DOMContentLoaded', main);