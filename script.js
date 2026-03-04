const loadLessons=() => {
  fetch('https://openapi.programming-hero.com/api/levels/all') //fetch returns a promise.
    .then(res => res.json()) //res.json returns a promise!!
    .then(json => displayLesson(json.data));
};
const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then(res => res.json())
    .then((data)=> displayLevelWord(data.data));
}
const displayLevelWord = (words) => {
  console.log(words)
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
    <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
    `; //- এটা button এ add করা হয়েছে যাতে যখন কোনো button এ click করবেন, তখন সেই specific lesson এর number টা
    //note: পরে এই function এর ভিতরে আরো code লিখবেন যেটা সেই specific lesson এর words বা content API থেকে fetch করবে। এটা হলো প্রথম step - কোন lesson এ click হলো সেটা track করা।
    //4.append into the container
    levelContainer.append(btnDiv);
  }

};
loadLessons();
