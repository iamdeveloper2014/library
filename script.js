class Media{

  constructor(title){
    this._title = title;
    this._isCheckedOut = false,
    this._ratings = [];

  }

  get title(){
    return this._title;
  }

  get isCheckedOut(){
    return this._isCheckedOut;
  }

  get ratings(){
    return this._ratings;
  }

  set isCheckedOut(isCheckedOut){
    this._isCheckedOut = isCheckedOut;
  }

  toggleCheckOutStatus(){
    this._isCheckedOut = !this._isCheckedOut
  }

  getAverageRating(){
    let ratingSum = this.ratings.reduce((currentSum, rating) => currentSum + rating, 0)

    if (this.ratings.length === 0) return 0;

    const ratingArray = this.ratings.length

    let averageRating = ratingSum/ratingArray

    return averageRating;

  }
  
  addRating(rating){

    if(rating>=1&&rating<=5){
      this._ratings.push(rating);
    }
    
  }

}

class Book extends Media{

  constructor(author, title,  pages){
    super(title);

    this._author = author;
    this._pages = pages
  }

  get author(){
    return this._author;
  }

  get pages(){
    return this._pages;
  }

}

class Movie extends Media{

  constructor(director, title, runtime){
    super(title);

    this._director = director;
    this._runtime = runtime;

  }

  get director(){
    return this._director;
  }

  get runtime(){
    return this._runtime;
  }

}

const historyOfEverything = new Book('Bill Bryson', 'A Short History of Nearly Everything', 544)
console.log(historyOfEverything)
historyOfEverything.toggleCheckOutStatus() 
console.log(historyOfEverything.isCheckedOut)
historyOfEverything.addRating(4)
historyOfEverything.addRating(5)
historyOfEverything.addRating(5)
console.log(historyOfEverything.getAverageRating())

const speed = new Movie('Jan de Bont','Speed', 116)
speed.toggleCheckOutStatus() 
console.log(speed.isCheckedOut)
speed.addRating(1)
speed.addRating(1)
speed.addRating(5)
console.log(speed.getAverageRating())

const container = document.getElementById('media-container');

const renderMedia = (mediaItem) => {const card = document.createElement('div');
  card.className = 'card';
  const statusClass = mediaItem.isCheckedOut ? 'checked-out' : 'available';
  const statusText = mediaItem.isCheckedOut ? 'Checked out' : 'Available';
  card.innerHTML = `
    <h2>${mediaItem.title}</h2>
    <p><strong>Type:</strong> ${mediaItem instanceof Book ? 'Book' : 'Movie'}</p>
    <p><strong>Rating:</strong> ${mediaItem.getAverageRating()} / 5</p>
    <p>
      <strong>Status:</strong> 
      <span class="status-badge ${statusClass}">${statusText}</span>
    </p>
  `;

if (mediaItem instanceof Book) {
    card.innerHTML += `<p><strong>Author:</strong> ${mediaItem.author}</p>`;
    card.innerHTML += `<p><strong>Pages:</strong> ${mediaItem.pages}</p>`;
  } else if (mediaItem instanceof Movie) {
    card.innerHTML += `<p><strong>Director:</strong> ${mediaItem.director}</p>`;
    card.innerHTML += `<p><strong>Duration:</strong> ${mediaItem.runtime} min.</p>`;
  }

const toggleBtn = document.createElement('button');
  toggleBtn.className = 'btn';
  toggleBtn.innerText = 'Change status';

toggleBtn.addEventListener('click', () => {
    mediaItem.toggleCheckOutStatus();
    
    container.innerHTML = '';
    renderMedia(historyOfEverything);
    renderMedia(speed);
  });

  card.appendChild(toggleBtn);
  container.appendChild(card);
}

renderMedia(historyOfEverything);
renderMedia(speed);