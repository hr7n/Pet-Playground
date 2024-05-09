const addCommentPostFormHandler = async (event) => {
  event.preventDefault();

  const id = event.target.dataset.id;
  const commentInput = document.querySelector(`#commentInput${id}`);
  const comment = commentInput.value.trim();

  if (!comment) {
    alert('Please enter a comment before submitting.');
    return;
  }

  const response = await fetch(`/api/comments/${id}`, {
    method: 'POST',
    body: JSON.stringify({ comment }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    const { commentData, findPet } = await response.json();
    const commentListInput = document.querySelector(`#commentList${id}`);
    const liEl = document.createElement('li');
    liEl.innerHTML = `<strong>${findPet.username}</strong>: ${comment}`;
    commentListInput.append(liEl);
    commentInput.value = '';
  } else {
    alert('Failed to create new Comment');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', function (event) {
    if (event.target.matches('.commentButton')) {
      addCommentPostFormHandler(event);
    }
  });
});
