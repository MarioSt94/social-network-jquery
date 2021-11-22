$(function(){

    function App(){
        this.users = [];
        this.LoggedInAs = '';
        this.currentPage = {url:'home'};
        this.LoggedInAsObject = null;//REMOVE THIS AT THE END
        this.posts =[
            post={
                comments: [],
                content: "Chuck Norris doesn’t read books. He stares them down until he gets the information he wants.",
                id: 5,
                likedBy: [],
                nameOfUser: `<a href='' data-user="jch@email.com">Jimmy chonga</a>`,
                postedBy: "jch@email.com",
                time: "26/April/2021 - 0:40"
            },
            post ={
                comments: [],
                content: "Happy Birthday gals <img src='img/IMG_8617.jpg'>",
                id: 4,
                likedBy: [],
                nameOfUser: `<a href='' data-user="johndoe@email.com">John Doe</a>`,
                postedBy: "johndoe@email.com",
                time: "28/April/2021 - 00:00"
            },
            post ={
                comments: [],
                content: "Time waits for no man. Unless that man is Chuck Norris.",
                id: 3,
                likedBy: [],
                nameOfUser: `<a href='' data-user="jch@email.com">Jimmy chonga</a>`,
                postedBy: "jch@email.com",
                time: "26/April/2021 - 0:40"
            },
            post ={
                comments: [],
                content: "Jel zna neko sta voli Mile?",
                id: 2,
                likedBy: [],
                nameOfUser: `<a href='' data-user="lepabrena@email.com">Lepa Brena</a>`,
                postedBy: "lepabrena@email.com",
                time: "26/April/2021 - 0:40"
            },
            post={
                comments: [],
                content: "If you want a list of Chuck Norris’ enemies, just check the extinct species list.",
                id: 1,
                likedBy: [],
                nameOfUser: `<a href='' data-user="johndoe@email.com">John Doe</a>`,
                postedBy: "johndoe@email.com",
                time: "26/April/2021 - 0:40"
            },
            post={
                comments: [],
                content: "Здраво на сите",
                id: 0,
                likedBy: [],
                nameOfUser: `<a href='' data-user="lepabrena@email.com">Lepa Brena</a>`,
                postedBy: "lepabrena@email.com",
                time: "26/April/2021 - 0:40"
            }
        ];
        this.postid = this.posts.length;

        this.addUser = function(user){
            let doesItExist = this.checkIfUserExists(user.email);
            if(doesItExist == false){
                this.users.push(user);
            } else{
                alert("email adress already in use");
            }
        }

        this.checkIfUserExists = function(email){
            if(this.users.length > 0){
                for(let user of this.users){
                    if(user.email == email){
                        return true;
                    } 
                }
                return false;
            } else {
                return false;
            }
        }


        this.validation = function(name, email, pass, repass){
            
            if(name.length>2 && email.length>6 && pass.length>4 && pass == repass){
                
                return true;
                
            } else{
                return false;
            }
        }

        this.login = function(email, password){
            login = false;
            for(let user of this.users){
                if(user.email == email && user.password == password){
                    this.LoggedInAs = user.email;
                    this.LoggedInAsObject = this.returnLoggedInAs();
                    app.renderPosts();
                    this.pageSwitcher("home");
                    login = true;
                    break;
                } else {
                    
                }
            }
            if(login = false){
                alert('wrong cridentials');
            }
        }

        this.posting = function (post){
            post.id = this.postid;
            this.postid++;
            post.postedBy = this.LoggedInAs;
            post.nameOfUser = this.users[this.searchArrayPostion(this.LoggedInAs, this.users)].name;
            post.likedBy = [];
            post.comments = [];
            this.posts.unshift(post);
            this.pageSwitcher(this.currentPage.url, this.currentPage.userToShow);
        }

        this.pageSwitcher = function(newActivePage, userToShow = this.LoggedInAs){
            let pages = ['login-register', 'home', 'myProfile'];
            $('.result-search').addClass('hidden');
            for(let page of pages){
                $(`#${page}`).removeClass("hidden");
                if(page == newActivePage){
                    this.currentPage.url=newActivePage;
                    this.currentPage.userToShow = userToShow;
                    
                    $(`#${page}`).removeClass("hidden");
                    if(page == 'myProfile'){
                        $(`#${page}`).attr('data-user', `${userToShow}`);
                        this.renderPosts(userToShow);

                    }else{
                        this.renderPosts();
                    }
                } else {
                    $(`#${page}`).addClass("hidden");
                }
            }
        }

        this.showName = function(){
            html +=`<h2>${this.currentPage.userToShow}</h2>`
        }

        this.postToRender = function(specificUser = 'none'){
            this.peopleYouMightKnow();
            postsToRender = [];
            userFriends = this.users[this.searchArrayPostion(this.LoggedInAs, this.users)].friends;
            
            if(specificUser == 'none'){

                for(let post of this.posts){

                    for(let item of userFriends){
                        if(item == post.postedBy){
                            postsToRender.push(post);
                        }
                        
                    }
                }
            } else {
                for(let post of this.posts){
                    if(specificUser == post.postedBy){
                        postsToRender.push(post);
                    }
                }
            }
            return postsToRender;
        }

        this.renderPosts = function(userToView = ''){
            postsToRender =[];
            html = '';
            
            if(userToView.length > 0){
                postsToRender = this.postToRender(userToView);
            } else {

                postsToRender = this.postToRender();
            }

            for(let post of postsToRender){
                html+= `
                <li class="post" id=${post.id}>
                        <h4>${post.nameOfUser}</h4>
                        <p>${post.time}</p>
                        <hr>
                        
                        <p class="post-content">${post.content}</p>
                        
                        `
                        if(post.likedBy.length>0){
                            html+= `<p class="post-liked-by"> Likes:`;
                            for(let like of post.likedBy){
                                html+=`${like} `;
                            }
                            html+=`</p>`;
                        }
                        
                html+=`
                        <button class="like-btn">Like</button>
                        
                        <div class="post-comment-section">
                            
                            <div class="your-comment">
                                <input type="text" class="your-comment-field" placeholder="enter your comment here">
                                <input type="submit" class="your-comment-submit" value="comment">
                            </div>
                            <h5>Comments:</h5>
                            <div class="left-comments">`;
                    if(post.comments.length > 0){
                        for(comment of post.comments){
                            html+=`
                                    
                                        <div class="comment">
                                            <div>
                                                <p class="comment-name-and-date">${comment.name} ${comment.currentTime}</p>
                                            </div>
                                            <div>
                                                
                                                <p  class="comment-content">${comment.content}</p>
                                            </div>
                                        </div>
                                    
                            
                            `
                        }
                    }
                html+=`
                        </div>
                    </div>
                        
                    </li>
                `
            }
            

            $('.post-list').html(html);
        }

        this.searchArrayPostion = function(lookingFor, lookingIn){
            let index=0;
            for(let item of lookingIn){
                if(item.email == lookingFor){
                    return index;
                }
                index++
            }
        }

        this.returnLoggedInAs = function(){
            index = this.searchArrayPostion(this.LoggedInAs, this.users);
            return this.users[index];
            
        }

        this.addFriend = function(friendToAdd){
            index = this.searchArrayPostion(this.LoggedInAs, this.users);
            this.users[index].friends.push(friendToAdd);
            index = this.searchArrayPostion(friendToAdd, this.users);
            this.users[index].friends.push(this.LoggedInAs);
            this.pageSwitcher(this.currentPage.url, this.currentPage.userToShow);
        }

        this.likePost = function(id){
        indexOfUser = this.searchArrayPostion(this.LoggedInAs, this.users);
        nameOfUser = this.users[indexOfUser].name;
        let cont= true;
            
            for(let post of this.posts){
                
                if(post.id == id){
                    for(let i =0; i< post.likedBy.length; i++){
                        if(post.likedBy[i]== nameOfUser){
                            post.likedBy.splice(i, 1);
                            cont = false;
                        }
                    }
                    if(cont == true){
                    post.likedBy.push(nameOfUser);
                }
                    this.pageSwitcher(this.currentPage.url, this.currentPage.userToShow);
                }
            
            }
        }

        this.comment = function(content, id){
            indexOfUser=this.searchArrayPostion(this.LoggedInAs, this.users);
            nameOfUser=this.users[indexOfUser].name;
            wrap = new Comment(nameOfUser, content);
            for(let post of this.posts){
                if(id == post.id){
                    post.comments.unshift(wrap);
                }
            }
            this.pageSwitcher(this.currentPage.url, this.currentPage.userToShow);
        }

        this.peopleYouMightKnow = function(){
            html='';
            friends = this.users[this.searchArrayPostion(this.LoggedInAs, this.users)].friends;
            for(user of this.users){

                if(this.LoggedInAs == user.email){
                    continue;
                }
                checkIfFriend = findFriends(user.email, friends);
                if(checkIfFriend == true){
                    continue;
                }

                html+= `
                <li data-user="${user.email}"><a>${user.name}</a><button class="add-friend-btn">add-friend</button></li>
                `
            }
            $("#suggestions").html(html);
            
            html = '';
        }

        this.search = function(input){
            list = [];
            html = '';
            for(user of this.users){
                if(user.name.includes(input)){
                    list.push(user.name);
                }
            }
            for(item of list){
                html+=`
                    <li class="result">${item}</li>
                `
            }
            $('.result-search').removeClass('hidden');
            $('#results').removeClass('hidden');
            $('#results').html(html);
            window.setTimeout(function(){cancelSearch()}, 4000)
        }
    }

    function videoToPost(content){
        if(content.includes('youtube.com/watch') == true){
            video = content.split("v=");
            html = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${video[1]}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            return html;
        }else {
            return content;
        }
    }

    function cancelSearch(){
        canCancelSearch = true;
    }
    let canCancelSearch = false
    function findFriends(email, list){
        for(item of list){
            if(email == item){
                return true;
            }
        } 
        return false;
    }

    function printNav(){
        let html = `
            <h3>The Social network</h3>
            <div id="search">
                <input type="text">
                <button class="search-btn">search</button>
                <div class="result-search hidden">
                    <ol id="results">
                    <li>
                </div>
            </div>
            <div id="buttons-navigation">
                <button id="home-btn" class="nav-btn">Home</button>
                <button id="myprofile-btn" class="nav-btn">My Profile</button>
                <button id="logout-btn" class="nav-btn">Logout</button>
            </div>
        
        `
        $('.nav').html(html);
    }
    printNav();
    function CreateUser(name, email, password){
        this.name = `<a href='' data-user="${email}">${name}</a>`;
        this.email = email;
        this.password = password;
        this.friends =[];
        this.friends.push(email);
    }

    function Post(content, time){
        content = videoToPost(content);
        this.content = content;
        this.time = time;
    }

    function Comment(name, content){
        this.name=name;
        this.content=content;
        this.currentTime=time();
    }



    function time(){
        var today = new Date();
        year=today.getFullYear();
        function getTheMonth(){
            i=today.getMonth()+1;
            switch(i){
                case 1:
                    return 'January';
                case 2: 
                    return 'February'
                case 3:
                    return 'March';
                case 4:
                    return 'April';
                case 5: 
                    return 'May';
                case 6:
                    return 'June';
                case 7:
                    return 'July';
                case 8:
                    return 'August';
                case 9: 
                    return 'September';
                case 10:
                    return 'October';
                case 11: 
                    return 'November';
                case 12:
                    return 'December';
            }
        }
        month = getTheMonth();
        date = today.getDate();
        minutes =today.getMinutes();
        if(minutes <10){
            minutes =`0${minutes}`;
        }
        hours = today.getHours();
        if(hours < 10){
            hours = `0${hours}`;
        }
        clock = today.getHours() + ":" + minutes;
        result = `${date}/${month}/${year} - ${clock}`;
        return result;
    }
    const app = new App();

    app.addUser(new CreateUser("John Doe", "johndoe@email.com", "12345"));
    app.addUser(new CreateUser("Jimmy chonga", "jch@email.com", "12345"));
    app.addUser(new CreateUser("Lepa Brena", "lepabrena@email.com", "12345"));
    app.addUser(new CreateUser("Jhonny Depp", "jd@email.com", "12345"));

    //app.addFriend('jch@email.com');
    //app.addFriend('lepabrena@email.com');

    

    
    $(document).on("click","#register-btn", function(e){
        e.preventDefault();
        validation = app.validation($("#name").val(),$("#email-register").val(), $("#password-register").val(), $("#repeat-password-register").val());
        if(validation == true){
            app.addUser(new CreateUser($("#name").val(),$("#email-register").val(), $("#password-register").val()))
        } else {
            alert("Make sure your password is 5 charecters long");
        }
    });

    $(document).on("click","#login-btn", function(e){
        e.preventDefault();
        app.login($('#email').val(), $('#password').val());
    })

    $(document).on("click",".nav-btn", function(e){
        e.preventDefault();
        id=$(this).attr('id');
        if(id == 'home-btn'){
            app.pageSwitcher('home');
        }
        if(id == 'myprofile-btn'){
            app.pageSwitcher('myProfile');
        }
        if(id == 'logout-btn'){
            app.pageSwitcher('login-register');
        }
    })

    $(document).on("click",".post-btn", function(e){
        e.preventDefault();
        id=$(this).attr('id');
        currentTime = time();
        if(id == "post-btn-home"){
            app.posting(new Post($('#post-field-home').val(), currentTime));
        }
    })

    $(document).on("click", "a", function(e){
        e.preventDefault();
        datauser = $(this).attr('data-user');
        app.pageSwitcher('myProfile', datauser);
    })
    
    
    $(document).on("click", ".like-btn", function(e){
        e.preventDefault();
        id = $(this).parents( "li" ).attr("id");
        app.likePost(id);
    })

    //your-comment-submit

    $(document).on("click", ".your-comment-submit", function(e){
        e.preventDefault();
        id = $(this).parents( "li" ).attr("id");
        content = $(this).siblings('input.your-comment-field').val();
        app.comment(content, id);
    })


    $(document).on("click", ".add-friend-btn", function(e){
        e.preventDefault(); 
        data = $(this).parents("li").attr("data-user");
        app.addFriend(data);
    })

    $(document).on("click", ".search-btn", function(e){
        e.preventDefault();
        search = $(this).siblings('input').val();
        app.search(search);
    })

    
    $(document).on("click", function(e){
        if(canCancelSearch == true){
            if($('.result-search').hasClass("hidden") == false){
                $('.result-search').addClass('hidden');
                canCancelSearch = false;
            }
        }
    })
    
})


