// Role Text Animation
const roles = ['Game Developer', 'Software Engineer'];
const roleText = document.getElementById('roleText');

if (roleText) {
  let roleIndex = 0;
  const updateRole = () => {
    roleText.classList.remove('show');

    setTimeout(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      roleText.textContent = roles[roleIndex];
      roleText.classList.add('show');
    }, 220);
  };

  setInterval(updateRole, 3000);
  updateRole();
}

// Play showcase media on hover
document.querySelectorAll('.content-box').forEach(box => {
  const video = box.querySelector('.showcase-section video');
  const image = box.querySelector('.showcase-section img[data-animated-src]');

  if (video) {
    let thumbnailTime = null;
    const initThumbnail = () => {
      const pauseTime = video.dataset.pauseTime;
      thumbnailTime = pauseTime !== undefined ? parseFloat(pauseTime) : Math.random() * video.duration;
      video.currentTime = thumbnailTime;
      video.pause();
    };

    if (video.readyState >= 1) {
      initThumbnail();
    } else {
      video.addEventListener('loadedmetadata', initThumbnail, { once: true });
    }

    box.addEventListener('mouseenter', () => {
      video.play();
    });

    box.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = thumbnailTime;
    });
  }

  if (image) {
    const animatedSrc = image.dataset.animatedSrc;
    const staticSrc = image.dataset.staticSrc || image.getAttribute('src');

    box.addEventListener('mouseenter', () => {
      if (animatedSrc) {
        image.src = animatedSrc;
      }
    });

    box.addEventListener('mouseleave', () => {
      if (staticSrc) {
        image.src = staticSrc;
      }
    });
  }

});
