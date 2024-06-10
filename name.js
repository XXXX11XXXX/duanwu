document.addEventListener('DOMContentLoaded', function () {
    const currentUsernameElement = document.getElementById('current-username');
    const newUsernameInput = document.getElementById('new-username');
    const updateUsernameButton = document.getElementById('update-username');
  
    // 获取用户详情
    function fetchUserDetails() {
      fetch('http://www.codeman.ink/api/user/detail')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (data && data.username) {
            currentUsernameElement.textContent = Current Username: ${data.username};
          } else {
            console.error('Unexpected response format:', data);
          }
        })
        .catch(error => {
          console.error('Error fetching user details:', error);
        });
    }
  
    // 更新用户名
    function updateUsername() {
      const newUsername = newUsernameInput.value;
      fetch('http://www.codeman.ink/api/user/detail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: newUsername })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          currentUsernameElement.textContent = Current Username: ${newUsername};
          newUsernameInput.value = ''; // 清空输入框
          alert('Username updated successfully!');
        })
        .catch(error => {
          console.error('Error updating username:', error);
          alert('Failed to update username.');
        });
    }
  
    // 监听按钮点击事件
    updateUsernameButton.addEventListener('click', updateUsername);
  
    // 获取用户详情
    fetchUserDetails();
  });
  