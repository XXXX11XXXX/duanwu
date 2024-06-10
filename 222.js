// script.js

// 将日期转为Unix时间戳
function dateToTimestamp(date) {
    return new Date(date).getTime();
}

function updateUserInfo() {
    // 获取表单数据
    const gender = document.getElementById('gender').value;
    const birthday = dateToTimestamp(document.getElementById('birthday').value);
    const nickname = document.getElementById('nickname').value;
    const province = document.getElementById('province').value;
    const city = document.getElementById('city').value;
    const signature = document.getElementById('signature').value;

    // 创建要发送的数据对象
    const data = {
        gender: gender,
        birthday: birthday,
        nickname: nickname,
        province: province,
        city: city,
        signature: signature
    };

    // 创建XMLHttpRequest对象
    const xhr = new XMLHttpRequest();
    const url = 'http://www.codeman.ink/api/user/update';

    // 配置请求
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    // 定义请求完成后的回调函数
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) { // 请求已完成
            const resultDiv = document.getElementById('result');
            if (xhr.status === 200) { // 请求成功
                resultDiv.innerHTML = '信息更新成功';
            } else { // 请求失败
                resultDiv.innerHTML = '信息更新失败: ' + xhr.statusText;
            }
        }
    };

    // 发送请求
    xhr.send(JSON.stringify(data));
}
