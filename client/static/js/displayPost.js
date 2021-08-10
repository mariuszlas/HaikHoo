function displayPost(){
    fetch(`http://localhost:3000/posts`)
    .then(res => res.json())
    .then(data => appendPost(data))
    function appendPost(data){
        let container = document.getElementById("posts");
        for (let i = 0; i < data.length; i++){
            let post = data[i]
            let div = document.createElement("div");
            div.setAttribute("class", "post");
            div.textContent = `${post.author} ${post.title} ${post.text}`
            let commentBtn = document.createElement("button");
            commentBtn.textContent = "Comment";
            commentBtn.setAttribute("class", "comment-btn");
            let commentForm = document.createElement("input");
            commentForm.setAttribute("type","text");
            commentForm.setAttribute("class","comment-form");
            container.appendChild(div);
            container.appendChild(commentForm);
            container.appendChild(commentBtn);
            commentBtn.addEventListener('click', makeComment());
            let commentSection = document.createElement("div");
            commentSection.setAttribute("class", "comment");
            for (let x = 0; x < post.comments.length; x++ ){
                let comments = document.createElement("div");
                comments.textContent = post.comments[x];
                commentSection.appendChild(comments);
            }
            container.appendChild(commentSection);
            container.setAttribute("class", "post-container");
            container.setAttribute("id", post.id);
        }
    }
}

displayPost();