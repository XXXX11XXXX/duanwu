// script.js

function uploadAvatar() {
    // 获取文件输入元素
    const imgFile = document.getElementById('imgFile').files[0];

    if (!imgFile) {
        document.getElementById('result').innerHTML = '请选择一个文件';
        return;
    }

    // 创建一个新的FormData对象
    const formData = new FormData();
    formData.append('imgFile', imgFile);

    // 创建XMLHttpRequest对象
    const xhr = new XMLHttpRequest();
    const url = 'http://www.codeman.ink/api/avatar/upload';

    // 配置请求
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + token); // 设置认证头，如果需要

    // 定义请求完成后的回调函数
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) { // 请求已完成
            const resultDiv = document.getElementById('result');
            if (xhr.status === 200) { // 请求成功
                resultDiv.innerHTML = '头像上传成功';
            } else { // 请求失败
                resultDiv.innerHTML = '头像上传失败: ' + xhr.statusText;
            }
        }
    };

    // 发送请求
    xhr.send(formData);
}
