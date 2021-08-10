// const commentBtn = document.querySelector(".comment-btn");

// commentBtn.addEventListener('click', post);

function makeComment(e){
    let commentInput = document.getElementsByClassName('comment-form').value;
    const data = commentInput
    const postId = commentInput.closest(".post-container").id
    fetch(`https://hakema-server.herokuapp.com${postId}`,{
        method: "POST",
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error)=>{
        console.error('Error:', error);
    });
};
