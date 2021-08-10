let url =  "https://hakema-server.herokuapp.com";

function displayPost(){
    fetch(`${url}/posts`)
    .then(res => res.json())
    .then(data => appendPost(data))
    .catch(err => console.log(err));
}


function appendPost(data){
    let container = document.getElementById("posts");
    for (let i = 0; i < data.length; i++){
        let post = data[i]
        let postDiv = document.createElement("div");
        let author = document.createElement("div");
        author.textContent = post.author;
        postDiv.appendChild(author);
        let title = document.createElement("div");
        title.textContent = post.title;
        postDiv.appendChild(title);
        let text = document.createElement("div");
        text.textContent = post.text;
        postDiv.appendChild(text);
        let commentBtn = document.createElement("button");
        commentBtn.textContent = "Comment";
        commentBtn.setAttribute("class", "comment-btn");
        let commentForm = document.createElement("input");
        commentForm.setAttribute("type","text");
        commentForm.setAttribute("class","comment-form");
        postDiv.appendChild(commentForm);
        postDiv.appendChild(commentBtn);
        commentBtn.addEventListener('click', e =>  makeComment(e));
        let commentSection = document.createElement("div");
        postDiv.appendChild(commentSection);
        commentSection.setAttribute("class", "comment");
        for (let x = 0; x < post.comments.length; x++ ){
            let comments = document.createElement("div");
            comments.textContent = post.comments[x];
            commentSection.appendChild(comments);
        }
        postDiv.setAttribute("class", "post");
        postDiv.setAttribute("id", post.id)
        container.appendChild(postDiv);
    }
    container.setAttribute("class", "post-container");
};

function makeComment(e){
    let commentInput = document.getElementsByClassName('comment-form').value;
    const data = commentInput
    const postId = commentInput.closest(".post-container").id
    fetch(`https://hakema-server.herokuapp.com/posts/${postId}`,{
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

displayPost();