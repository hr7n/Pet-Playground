const createPetFormHandler = async (event) => {
  event.preventDefault();

  const form = document.querySelector('#pet-submit');
  const formData = new FormData(form);
  console.log('formDataaaa', formData);
  try {
    const response = await fetch('/api/pets/', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const petData = await response.json();
      console.log('petDATA', petData);
      document.location.replace(`/profile/${petData.username}`);
    } else {
      errorData = await response.json();
      console.error('Error:', response.status, errorData);
      alert('Failed to Create New Pet');
      // console.log(response.json);
    }
  } catch (error) {
    console.error('Network Error:', error);
    alert('Network Error: Failed to create new pet');
  }
};

document
  .querySelector('#pet-submit')
  .addEventListener('submit', createPetFormHandler);
