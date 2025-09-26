const movies = [
  {
    id: 1,
    title: "Inception",
    genre: "Sci-Fi",
    description: "A thief uses dream-sharing technology to steal information.",
    poster:
      "inception.png",
    reviews: [],
  },
  {
    id: 2,
    title: "The Dark Knight",
    genre: "Action",
    description: "Batman faces the Joker, a criminal mastermind.",
    poster: "https://m.media-amazon.com/images/I/51crsE0jeXL._AC_SY445_.jpg",
    reviews: [],
  },
  {
    id: 3,
    title: "Finding Nemo",
    genre: "Animation",
    description: "A clownfish searches for his lost son.",
    poster: "https://m.media-amazon.com/images/I/51EpIWOts8L._AC_SY445_.jpg",
    reviews: [],
  },
  {
    id: 4,
    title: "Avengers: Endgame",
    genre: "Action",
    description:
      "Superheroes band together to defeat Thanos and restore the universe.",
    poster: "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SY679_.jpg",
    reviews: [],
  },
  {
    id: 5,
    title: "Interstellar",
    genre: "Sci-Fi",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster: "https://m.media-amazon.com/images/I/91dSMhdIzTL._AC_SY679_.jpg",
    reviews: [],
  },
  {
    id: 6,
    title: "Joker",
    genre: "Drama",
    description:
      "A failed comedian turns to a life of crime and chaos in Gotham City.",
    poster: "https://m.media-amazon.com/images/I/81gK4u7ZbGL._AC_SY679_.jpg",
    reviews: [],
  },
  {
    id: 7,
    title: "Shrek",
    genre: "Animation",
    description:
      "An ogre embarks on a quest to save a princess with the help of a wisecracking donkey.",
    poster: "https://m.media-amazon.com/images/I/51A34b6rGoL._AC_SY445_.jpg",
    reviews: [],
  },
  {
    id: 8,
    title: "Titanic",
    genre: "Romance",
    description: "A young couple falls in love aboard the doomed RMS Titanic.",
    poster: "https://m.media-amazon.com/images/I/71u-1K4dA1L._AC_SY679_.jpg",
    reviews: [],
  },
  {
    id: 9,
    title: "Gladiator",
    genre: "Drama",
    description:
      "A betrayed Roman general seeks revenge against the corrupt emperor who murdered his family.",
    poster: "https://m.media-amazon.com/images/I/51DKlGExUzL._AC_SY445_.jpg",
    reviews: [],
  },
  {
    id: 10,
    title: "Forrest Gump",
    genre: "Comedy",
    description:
      "The life journey of a slow-witted but kind-hearted man from Alabama.",
    poster: "https://m.media-amazon.com/images/I/81xTx-LI7bL._AC_SY679_.jpg",
    reviews: [],
  },
  {
    id: 11,
    title: "Toy Story",
    genre: "Animation",
    description:
      "Toys come to life and embark on fun adventures when humans aren't around.",
    poster: "https://m.media-amazon.com/images/I/91tTnClOqQL._AC_SY679_.jpg",
    reviews: [],
  },
  {
    id: 12,
    title: "The Lion King",
    genre: "Animation",
    description:
      "A young lion prince flees his kingdom only to learn the true meaning of responsibility and bravery.",
    poster: "https://m.media-amazon.com/images/I/81D+KJkO3hL._AC_SY679_.jpg",
    reviews: [],
  },
];

// Render movie cards in a flexible grid
function renderMovies(filter = "") {
  const list = $("#movieList");
  list.empty();
  let filtered = movies;
  if (filter) {
    const f = filter.toLowerCase();
    filtered = movies.filter(
      (m) =>
        m.title.toLowerCase().includes(f) || m.genre.toLowerCase().includes(f)
    );
  }
  // ALWAYS render movies (even if filter is empty)
  filtered.forEach((movie, idx) => {
    let card = `<div class="movie-card-wrapper">
      <div class="card movie-card">
        <img src="${movie.poster}" alt="${movie.title}" class="movie-poster card-img-top" />
        <div class="card-body d-flex flex-column">
          <h5 class="card-title text-center">${movie.title}</h5>
          <p class="text-center"><span class="badge bg-secondary">${movie.genre}</span></p>
          <p class="card-text text-center mb-3">${movie.description}</p>
          <div class="d-flex justify-content-center mt-auto">
            <button class="btn btn-success btn-sm me-2" data-id="${movie.id}" data-bs-toggle="modal" data-bs-target="#reviewModal">Add Review</button>
            <button class="btn btn-info btn-sm" data-id="${movie.id}" id="viewReviewsBtn">View Reviews</button>
          </div>
        </div>
      </div>
    </div>`;
    list.append(card);
  });
}

function renderReviewsInModal(reviews, movieTitle) {
  const container = $("#reviewsContainer");
  if (reviews.length === 0) {
    container.html("<p>No reviews yet.</p>");
  } else {
    const reviewsHtml = reviews
      .map(r => `<div class="review-entry">
        <strong>${r.reviewer}</strong>
        <span class="star-rating">${"★".repeat(r.rating)}</span>
        <p>${r.comment}</p>
      </div>`)
      .join("");
    container.html(reviewsHtml);
  }
  $("#viewReviewsLabel").text(Reviews for "${movieTitle}");
  const modal = new bootstrap.Modal(document.getElementById("viewReviewsModal"));
  modal.show();
}

$("#searchInput").on("input", function () {
  renderMovies($(this).val());
});

$("#movieList").on("click", "button[data-bs-target='#reviewModal']", function () {
  $("#movieId").val($(this).data("id"));
});

$("#movieList").on("click", "button#viewReviewsBtn", function () {
  const movieId = $(this).data("id");
  const movie = movies.find(m => m.id === movieId);
  renderReviewsInModal(movie.reviews, movie.title);
});

$("#reviewForm").on("submit", function (e) {
  e.preventDefault();
  const movieId = parseInt($("#movieId").val());
  const reviewer = $("#reviewer").val();
  const rating = parseInt($("#rating").val());
  const comment = $("#comment").val();
  const movie = movies.find(m => m.id === movieId);
  movie.reviews.push({ reviewer, rating, comment });
  $("#reviewModal").modal("hide");
  $(this)[0].reset();
  showToast("Review submitted!");
  renderMovies($("#searchInput").val());
});

function showToast(msg) {
  let toast = $(
    `<div class="toast align-items-center text-bg-success border-0 position-fixed bottom-0 end-0 m-4" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">${msg}</div>
        </div>
      </div>`
  );
  $("body").append(toast);
  toast.toast({ delay: 1500 });
  toast.toast("show");
  setTimeout(() => toast.remove(), 1800);
}

$(document).ready(function () {
  renderMovies();  // Show all movies by default
});