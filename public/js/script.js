const likeHandler = async (event) => {
  //event.preventDefault();
  const likeBtn = event.target;
  const likeDisplay = likeBtn.parentElement.lastElementChild;
  let { id, likes: likeCount } = event.target.dataset;
  console.log('like buttons?');
  //   this is if the comment is unliked currently then a click will like and update like
  if (likeBtn.getAttribute('data-liked') === 'false') {
    likeCount++;
    likeBtn.classList.add('btn-dark;');
    likeBtn.setAttribute('data-liked', 'true');
  } else {
    likeCount--;
    likeBtn.classList.add('btn-dark');
    likeBtn.setAttribute('data-liked', 'false');
    // ...
  }

  const response = await fetch(`/api/pet-post/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      likes: likeCount,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  //fetch to update db if success then
  if (response.ok) {
    likeBtn.setAttribute('data-likes', likeCount);
    likeDisplay.textContent = '❤️ Likes: ' + likeCount;
  } else {
    alert('Failed to like post');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', function (event) {
    if (event.target.matches('.like-button')) {
      likeHandler(event);
    }
  });
});
