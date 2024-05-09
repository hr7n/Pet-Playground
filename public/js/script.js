const likeHandler = async (event) => {
  const likeBtn = event.target.closest('.like-button');
  const icon = likeBtn.querySelector('i');
  const likeCountSpan = likeBtn.querySelector('.like-count');
  let { id, likes: likeCount } = likeBtn.dataset;

  const liked = likeBtn.getAttribute('data-liked') === 'true';
  likeCount = parseInt(likeCount, 10) + (liked ? -1 : 1);

  const response = await fetch(`/api/pet-post/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ likes: likeCount }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    likeBtn.setAttribute('data-likes', likeCount);
    likeBtn.setAttribute('data-liked', !liked);
    likeCountSpan.textContent = likeCount;
    icon.classList.add(liked ? 'far fa-heart' : 'fas fa-heart');
  } else {
    alert('Failed to like post');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', function (event) {
    if (event.target.matches('.like-button, .like-button *')) {
      likeHandler(event);
    }
  });
});
