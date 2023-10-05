const editPostFormHandler = async (event) => {
  event.preventDefault();

  const postid = event.target.dataset.postid;
  console.log(postid);
  const title = document.querySelector(`#title${postid}`).value.trim();
  const caption = document.querySelector(`#caption${postid}`).value.trim();
  const petUserName = location.href.substring(
    location.href.lastIndexOf("/") + 1
  );

  const response = await fetch(`/api/pet-post/${postid}`, {
    method: "POST",
    body: JSON.stringify({
      title,
      caption,
      // picture,
    }),
    headers: { "Content-Type": "application/json" },
  });

  console.log(response);

  if (response.ok) {
    document.location.replace(`/profile/${petUserName}`);
  } else {
    alert("Failed to edit new Post");
  }
};
const submitEditBtns = document.querySelectorAll(".editSubmitBtn");
for (const submitEditBtn of submitEditBtns) {
  submitEditBtn.addEventListener("click", editPostFormHandler);
}
