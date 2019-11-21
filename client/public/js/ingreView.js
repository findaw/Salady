
        const ingreTable = document.getElementById("ingreTable");
        ingreTable.addEventListener("click", e=>{
            console.log(e.target.className);
        
            if(e.target.className === "modifyBtn"){

                let input = e.target.parentNode.previousSibling;
                console.log(input.value);
                input.disabled = false;
                
                e.target.style.display = "none";    
                //saveBtn
                e.target.nextSibling.style.display = "inline-block";
                
            }else if(e.target.className === "saveBtn"){
                let input = e.target.parentNode.previousSibling;
                console.log(input);
                
                fetch("/api/modify/ingredient", {
                    method:"POST",
                    headers:{
                        "Content-Type" :"application/json",
                    },
                    body:JSON.stringify({
                        id : input.getAttribute("data-id"),
                        key : input.className,
                        data : input.value,
                    }),
                }).then(res=>{
                    console.log(res);
                });
                
                input.disabled = true;

                e.target.style.display = "none";
                //modifyBtn
                e.target.previousSibling.style.display = "inline-block";
            }
        })