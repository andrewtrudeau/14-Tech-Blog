const loginFormHandler = async (event) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();

  // Gather the data from the form elements on the page
  const title = document.querySelector('#title').value.trim();
  const content = document.querySelector('#content').value.trim();
  const editType = document.querySelector('#editType').value.trim();
  const postID = document.querySelector('#postID').value.trim();

  if (title && content) {
    const user_id = document.querySelector('#userID').value.trim();
    const user_name = document.querySelector('#userName').value.trim();
    let today = new Date();
    let date_created = today.toLocaleDateString();

    let response;
    if (editType === "POST")
      response = await fetch('/api/posts/', {
        method: 'POST',
        body: JSON.stringify({ title, content, user_id, date_created, user_name }),
        headers: { 'Content-Type': 'application/json' },
      });
    else if (editType === "PUT")
      response = await fetch(`/api/posts/${postID}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content, date_created }),
        headers: { 'Content-Type': 'application/json' },
      });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed To Post');
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
