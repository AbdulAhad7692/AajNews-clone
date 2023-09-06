import { auth, signOut } from "./firebase.js";


const signOutButton = document.getElementById('sign-out')
const signOutUser = () => {
    signOut(auth).then(() => {
        location.href = 'auth.html'
    }).catch((error) => {
        // An error happened.
    });
}
signOutButton.addEventListener('click', signOutUser)


const publish_blog = document.getElementById('publish-blog')
const publishBlog = () => {
    const title = document.getElementById('blog-title').value;
    const blogBox = document.getElementById('blog-box');
    let blogList = document.createElement('li')
    const blog = blogBox.innerHTML;
    let date = new Date()
    let username = 'Ahad'

    //if conditions

    if (title.length > 50) {
        Swal.fire({
            title: 'title should not exceed more than 50 characters',
            showCancelButton: false, // No cancel button
            confirmButtonText: 'OK',
            confirmButtonColor: '#FF5733' // Change the button color here
          });
          
        return
    }

    if (title.length < 3) {
        Swal.fire('Title must be greater than 2 character')
        return
    }



    blogList.className = 'list'
    blogList.innerHTML += `
    <div class="published-blog-container">
      <div class="published-blog">
        <div class="profile">
          <img src="example.jpeg" class="img">
  
          <div>
            <div class="title-div">
              <p id="blog-title" class="blog-title">${title}</p>
              <img src='editicon.png' height='20px' style="margin-left: 10px;" >
            </div>
            <div class="name-time">
              <p class="name">${username}</p>
              <p class="time">${moment(date).format('lll')}</p>
            </div >
          </div >
        </div >
        <div class="blog-content">
          <div contenteditable="false" class="blog-main-div">${blog}</div>
        </div>
        <div class="btn-div">
          <button class="btn" id="edit-blog">Edit</button>
          <button class="btn">delete</button>
        </div>
      </div >
    </div >
    `
    list.appendChild(blogList)
}
publish_blog.addEventListener('click', publishBlog)

// edit blog //

// Add a click event listener to the document
document.addEventListener('click', function (event) {
    // Check if the clicked element is the "Edit" or "Save" button
    if (event.target && event.target.id === 'edit-blog') {
        const editButton = event.target;
        const blogContent = editButton.closest('.published-blog-container').querySelector('.blog-main-div');
        if (editButton.textContent === 'Edit') {
            editButton.textContent = 'Save';
            blogContent.contentEditable = 'true';
            blogContent.style.border = '1px solid gray'

        } else if (editButton.textContent === 'Save') {
            editButton.textContent = 'Edit';
            blogContent.contentEditable = 'false';
            blogContent.style.border = 'none'
        }
    }
});

