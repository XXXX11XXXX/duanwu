
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const mainContent = document.querySelector('main');

    let initialX = null; // 鼠标初始位置
    let threshold = 50; // 滑动阈值，根据需要调整

    // 鼠标移动时记录初始位置
    document.addEventListener('mousemove', function(e) {
        if (initialX === null) {
            initialX = e.clientX;
        }
    });

    // 鼠标释放时检查滑动
    document.addEventListener('mouseup', function(e) {
        if (initialX !== null) {
            const deltaX = e.clientX - initialX;
            initialX = null; // 重置初始位置

            if (deltaX > threshold) { // 从左到右滑动
                // 显示侧边栏和遮罩层
                sidebar.style.transform = 'translateX(0)';
                overlay.style.display = 'block';
                mainContent.style.marginLeft = sidebar.offsetWidth + 'px';
            } else if (deltaX < -threshold) { // 从右到左滑动
                // 隐藏侧边栏和遮罩层
                sidebar.style.transform = 'translateX(-100%)';
                overlay.style.display = 'none';
                mainContent.style.marginLeft = '0';
            }
        }
    });

    // 点击遮罩层时隐藏侧边栏
    overlay.addEventListener('click', function() {
        sidebar.style.transform = 'translateX(-100%)';
        overlay.style.display = 'none';
        mainContent.style.marginLeft = '0';
    });
});