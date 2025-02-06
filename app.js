document.addEventListener('DOMContentLoaded', ()=> {
    // deklarasi index
    let currentIndex = 0;
    const items = document.querySelectorAll(".carousel-item");
    const controls = document.querySelectorAll(".carousel-control .items");
    function setClasses(newIndex){
        items.forEach((item,i) => {
            item.classList.remove("active", "previous", "next", "move-left", "move-right", "enter-left", "enter-right");
            if(i == newIndex) {
                item.classList.add("active");
            }else if(i === (newIndex - 1 + items.length) % items.length) {
                item.classList.add("previous")
            }else if(i === (newIndex + 1 )% items.length ) {
                item.classList.add("next")
            }
        })
        controls.forEach((control, i)=> {
            control.classList.toggle("active", i === newIndex);
        })

        currentIndex = newIndex;
    }
    function showSlide(newIndex) {
        if(newIndex === currentIndex) return;
        const currentSlide = items[currentIndex];
        const newSlide = items[newIndex];
        //transition direction
        const isNext = newIndex > currentIndex || (currentIndex === items.length - 1 && newIndex === 0);
        //remove exisiting transisitipn
        currentSlide.classList.remove("move-left", "move-right", "enter-left", "enter-right");
        newSlide.classList.remove("move-left", "move-right", "enter-left", "enter-right");
        //aply transition class
        if(isNext) {
            currentSlide.classList.add("move-left");
            newSlide.classList.add("enter-right");
        }else{
            currentSlide.classList.add("move-right");
            newSlide.classList.add("enter-left");
        }
        setTimeout(() => {
            setClasses(newIndex);
        }, 500); //transition duration 500 => 0.5s

    }
    function goToNextSlide(){
        const newIndex = (currentIndex + 1) % items.length;
        showSlide(newIndex);
    }
    function goToPreviousSlide(){
        const newIndex = (currentIndex - 1 % items.length) % items.length;
        showSlide(newIndex);
    }

    controls.forEach((control) => {
        control.addEventListener("click", ()=>{
            const index = parseInt(control.getAttribute("data-index"));
        if (!isNaN(index)) {
            showSlide(index);
        }
        });
    });

    items.forEach((item) => {
        item.addEventListener("click", () => {
            if(item.classList.contains("previous")){
                goToPreviousSlide();
            }else if(item.classList.contains("next")){
                goToNextSlide();
            }
        })
    })

    console.log('items carousel', items)
    setClasses(0);
});