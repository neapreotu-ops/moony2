// ==========================================================================
// 1. MOVIE DATASET WITH ASSIGNED STREAMING VIDEO EMBEDS
// ==========================================================================
const movieData = {
    topSearches: [
        { title: "Venom", image: "https://i.ebayimg.com/images/g/rf4AAOSwsQBkxxVm/s-l1600.webp", video: "https://filesun.sbs/embed/movie/tt1270797" },
        { title: "Take Charge of My Heart", image: "img/takecharge.jpg", video: "https://youtube.com" },
        { title: "Hollywood Arts", image: "img/hollywoodarts.jpg", video: "https://youtube.com" },
        { title: "The Vampire Diaries", image: "img/vampirediaries.jpg", video: "https://youtube.com" },
        { title: "The Neighbor", image: "img/theneighbor.jpg", video: "https://youtube.com" }
    ],
    continueWatching: [
        { title: "Lego Ninjago", image: "img/legoninjago.jpg", progress: "40%", video: "https://youtube.com" },
        { title: "Jujutsu Kaisen", image: "img/jujutsukaisen.jpg", progress: "85%", video: "https://youtube.com" },
        { title: "Once Upon a Crime", image: "img/onceuponacrime.jpg", progress: "15%", video: "https://youtube.com" },
        { title: "Rick and Morty", image: "img/rickandmorty.jpg", progress: "60%", video: "https://youtube.com" }
    ],
    shortHits: [
        { title: "Haunted Hotel", image: "img/hauntedhotel.jpg", video: "https://youtube.com" },
        { title: "My Hero Academia", image: "img/myheroacademia.jpg", video: "https://youtube.com" },
        { title: "Hajime no Ippo", image: "img/hajimenoippo.jpg", video: "https://youtube.com" },
        { title: "Vinland Saga", image: "img/vinlandsaga.jpg", video: "https://youtube.com" }
    ],
    koreanDramas: [
        { title: "100 Days of Deception", image: "img/100daysofdeception.jpg", video: "https://youtube.com" },
        { title: "Weak Hero", image: "img/weakhero.jpg", video: "https://youtube.com" },
        { title: "Squid Game", image: "img/squidgame.jpg", video: "https://youtube.com" }
    ]
};

// ==========================================================================
// 2. DYNAMIC SLIDER RENDER ENGINE WITH OVERLAY BINDINGS
// ==========================================================================
function populateRow(containerId, moviesList) {
    const rowContainer = document.getElementById(containerId);
    if (!rowContainer) return;

    moviesList.forEach((movie, index) => {
        const card = document.createElement('div');
        card.classList.add('movie-card');

        if (index === 0) {
            card.classList.add('first-card');
        } else if (index === moviesList.length - 1) {
            card.classList.add('last-card');
        }

        const img = document.createElement('img');
        img.src = movie.image;
        img.alt = movie.title;
        card.appendChild(img);

        if (movie.progress) {
            const progressContainer = document.createElement('div');
            progressContainer.classList.add('progress-bar-container');
            
            const progressFill = document.createElement('div');
            progressFill.classList.add('progress-bar-fill');
            progressFill.style.width = movie.progress;
            
            progressContainer.appendChild(progressFill);
            card.appendChild(progressContainer);
        }

        const previewDetails = document.createElement('div');
        previewDetails.classList.add('preview-details');
        previewDetails.innerHTML = `
            <div class="preview-buttons">
                <div class="left-btns">
                    <button class="icon-btn play-btn-trigger"><i class="fas fa-play"></i></button>
                    <button class="icon-btn add"><i class="fas fa-plus"></i></button>
                    <button class="icon-btn like"><i class="fas fa-thumbs-up"></i></button>
                </div>
                <button class="icon-btn down"><i class="fas fa-chevron-down"></i></button>
            </div>
            <div class="preview-meta">
                <span class="match-score">98% Compatibile</span>
                <span class="badge-age">16+</span>
                <span>${movie.progress ? '7 Stagioni' : 'Film'}</span>
                <span class="hd">HD</span>
            </div>
            <div class="preview-genres">
                <span>Emozionante</span> • <span>Azione</span> • <span>Dramma</span>
            </div>
        `;
        card.appendChild(previewDetails);

        const playBtn = previewDetails.querySelector('.play-btn-trigger');
        playBtn.addEventListener('click', (event) => {
            event.stopPropagation(); 
            openFullscreenVideo(movie);
        });

        card.addEventListener('click', () => {
            openFullscreenVideo(movie);
        });

        rowContainer.appendChild(card);
    });
}

// ==========================================================================
// 3. CINEMATIC MODAL CONTROLLER PIPELINE (LAUNCH & TERMINATE PLAYER)
// ==========================================================================

function renderPlayerUI(movie) {
    const modal = document.getElementById('movieModal');
    const trendContainer = modal.querySelector('.trend-container');
    const playerVideoTitle = document.getElementById('playerVideoTitle');

    if (playerVideoTitle) {
        playerVideoTitle.innerText = `${movie.title} • S1 E1`;
    }

    trendContainer.innerHTML = `
        <iframe id="videoPlayer" src="${movie.video}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen style="width:100%; height:100%;"></iframe>
    `;

    modal.style.display = 'block';
}

function clearPlayerUI() {
    const modal = document.getElementById('movieModal');
    const trendContainer = modal.querySelector('.trend-container');
    
    if (modal) modal.style.display = 'none';
    if (trendContainer) trendContainer.innerHTML = ''; 
}

function openFullscreenVideo(movie) {
    renderPlayerUI(movie);
    history.pushState({ videoActive: true, movieData: movie }, "");
}

function terminateVideoPlayer() {
    clearPlayerUI();
    if (history.state && history.state.videoActive) {
        history.back();
    }
}

// ==========================================================================
// 4. MAIN GLOBAL DEPLOYMENT HISTORY ROUTER
// ==========================================================================
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.videoActive) {
        renderPlayerUI(event.state.movieData);
    } else {
        clearPlayerUI();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    populateRow('rowTopSearches', movieData.topSearches);
    populateRow('rowContinueWatching', movieData.continueWatching);
    populateRow('rowShortHits', movieData.shortHits);
    populateRow('rowKoreanDramas', movieData.koreanDramas);

    const backBtn = document.getElementById('closeModal');
    if (backBtn) {
        backBtn.addEventListener('click', terminateVideoPlayer);
    }

    // Initialize Netflix-style Search Controller
    initNetflixSearchEngine();
});

// ==========================================================================
// 5. IMMERSIVE NETFLIX GRID SEARCH CONTROLLER
// ==========================================================================
function initNetflixSearchEngine() {
    const searchContainer = document.getElementById('searchContainer');
    const searchInput = document.getElementById('searchInput');
    const searchIcon = document.getElementById('searchIcon');
    const clearSearch = document.getElementById('clearSearch');
    
    const homepageView = document.getElementById('homepageView');
    const heroBanner = document.getElementById('heroBanner');
    const searchGridView = document.getElementById('searchGridView');

    if (!searchContainer || !searchInput || !searchIcon || !clearSearch) return;

    // Slide search open on icon tap
    searchIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        searchContainer.classList.add('active');
        searchInput.focus();
    });

    // Handle incoming typing updates
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();
        
        if (query === '') {
            clearSearch.style.display = 'none';
            exitSearchMode();
        } else {
            clearSearch.style.display = 'block';
            enterSearchMode(query);
        }
    });

    // Clear content when 'X' button is clicked
    clearSearch.addEventListener('click', (e) => {
        e.stopPropagation();
        searchInput.value = '';
        clearSearch.style.display = 'none';
        searchInput.focus();
        exitSearchMode();
    });

    // Close and minimize input container on outside tap if empty
    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target) && searchInput.value.trim() === '') {
            searchContainer.classList.remove('active');
            exitSearchMode();
        }
    });

    function enterSearchMode(query) {
        if (heroBanner) heroBanner.style.display = 'none';
        if (homepageView) homepageView.style.display = 'none';
        if (searchGridView) searchGridView.style.display = 'block';

        executeNetflixGridSearch(query);
    }

    function exitSearchMode() {
        if (heroBanner) heroBanner.style.display = 'flex';
        if (homepageView) homepageView.style.display = 'block';
        if (searchGridView) searchGridView.style.display = 'none';
    }
}

// FLATTENS CATEGORIES, FILTERS DUPLICATES & ASSEMBLES DYNAMIC GRID VIEWS
function executeNetflixGridSearch(query) {
    const gridContainer = document.getElementById('netflixGridResults');
    const ribbonTags = document.getElementById('ribbonTags');
    if (!gridContainer || !ribbonTags) return;

    // Collect all movies across categories
    let allMovies = [];
    for (const [category, movies] of Object.entries(moviesData)) {
        allMovies = allMovies.concat(movies);
    }

    // Filter movies based on search query
    const filteredMovies = allMovies.filter(movie => 
        movie.title.toLowerCase().includes(query) ||
        movie.description.toLowerCase().includes(query)
    );

    // Display filtered movies in grid
    displayNetflixGridResults(filteredMovies, gridContainer);

    // Update ribbon tags
    updateRibbonTags(filteredMovies, ribbonTags);
}