const loadLessons=() => {
  fetch('https://openapi.programming-hero.com/api/levels/all') //fetch returns a promise.
    .then(res => res.json()) //res.json returns a promise!!
    .then(json => displayLesson(json.data));
};
const removeActiveClass = () => {//this function will remove the active class from all the buttons when click on another button in order to change the color of the button and show that this is the current lesson. note: active class is defined in styles.css file.
  const lessonButtons = document.querySelectorAll('.lesson-btn');
  lessonButtons.forEach(btn => btn.classList.remove("active"));//using forEach loop to remove active class from all the buttons when click on another button in order to change the color of the button and show that this is the current lesson. note: active class is defined in styles.css file.
  // for (let btn of lessonButtons) {
  //   btn.classList.remove("active");
  // }
};
const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then(res => res.json())
    .then((data) => {
      removeActiveClass();//this function will remove the all active class from all the buttons when click on another button in order to change the color of the button and show that this is the current lesson. note: active class is defined in styles.css <file className=""></file>
      const clcikBtn=document.getElementById(`lesson-btn-${id}`);//get the button which is clicked by id and add active class to it in order to change the color of the button and show that this is the current lesson. note: active class is defined in styles.css file.
      clcikBtn.classList.add("active");//using active class to change the color of the button when click and show that this is the current lesson. note: active class is defined in styles.css file.
      displayLevelWord(data.data);

    });
}
const displayLevelWord = (words) => {
  const wordContainer = document.getElementById('word-container');
  wordContainer.innerHTML = "";
  if (words.length == 0) {
    wordContainer.innerHTML = `<div class="text-center col-span-full rounded-xl font-bangla space-y-4 py-10   ">
    <img src="./assets/alert-error.png" alt="Empty state" class="mx-auto w-48" />
      <p class="text-xl font-medium text-gray-400 rounded-xl py-4">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
      <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
    </div>`;
    return;
  }
//   {
//     "id": 105,
//     "level": 2,
//     "word": "Rain",
//     "meaning": "বৃষ্টি",
//     "pronunciation": "রেইন"
// }
  words.forEach(word => {
    console.log(word);
    const cardDiv = document.createElement('div');
    cardDiv.innerHTML = `
    <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
      <h2 class="font-bold text-2xl font-inter">${word.word ? word.word : 'শব্দ পাওয়া যায়নি !!'}</h2>
      <p class="font-semibold font-inter">meaning/pronunciation</p>
      <div class="font-medium text-2xl font-bangla">${word.meaning ? word.meaning : 'অর্থ পাওয়া যায়নি !!'}/${word.pronunciation ? word.pronunciation : 'উচ্চারণ পাওয়া যায়নি !!'}</div>
      <div class="flex justify-between items-center">
        <button class="btn bg-[#1A91FF1A] hover:bg-[#1A91FF70]"><i class="fa-solid fa-circle-info"></i></button>
        <button class="btn bg-[#1A91FF1A] hover:bg-[#1A91FF70]"><i class="fa-solid fa-volume-high"></i></button>
      </div>
    </div>
    `;
    wordContainer.appendChild(cardDiv);

  });
}
const displayLesson = (lessons) => {

  //1. get the container and empty
  const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML ="";//it will stop adding same thing after the click "
  //2.get into every lesson"
  for (let lesson of lessons) {
    console.log(lesson);
    //3.create element
    const btnDiv = document.createElement('div');
    // using console.log(lesson) in  for (let lesson of lessons),we get   (id ,lessonName ,level_no) and apply that as expression inside the quote in order to display the name of the lesson on screen using ${lesson.lessonName/level_no}

    btnDiv.innerHTML = `
    <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
    `; //lesson-btn? এটা button এ add করা হয়েছে যাতে যখন কোনো button এ click করবেন, তখন সেই specific lesson এর number টা loadLevelWord function এ পাঠানো হবে। loadLevelWord function এ সেই number টা API থেকে data fetch করার জন্য ব্যবহার করা হবে।
    //note: পরে এই function এর ভিতরে আরো code লিখবেন যেটা সেই specific lesson এর words বা content API থেকে fetch করবে। এটা হলো প্রথম step - কোন lesson এ click হলো সেটা track করা।
    //4.append into the container
    levelContainer.append(btnDiv);
  }

};
loadLessons();
