document.addEventListener('DOMContentLoaded', function() {
    // Your YouTube channel's username
    const CHANNEL_USERNAME = 'TheYadavBhandari';
    const videoContainer = document.getElementById('youtube-video-container');
    const videoTitle = document.getElementById('video-title');
    const videoDescription = document.getElementById('video-description');
    const watchOnYtBtn = document.getElementById('watch-on-yt');
    const prevBtn = document.getElementById('prev-video');
    const nextBtn = document.getElementById('next-video');
    const dotsContainer = document.getElementById('video-dots');
    
    // Sample video data (will be replaced with actual videos from your channel)
    let videos = [
        {
            id: 'UAN45IiAr6Y',
            title: 'Latest Market Analysis',
            description: 'Check out my latest market analysis video',
            thumbnail: 'https://img.youtube.com/vi/UAN45IiAr6Y/maxresdefault.jpg'
        }
    ];
    
    let currentVideoIndex = 0;
    let slideInterval;
    const SLIDE_INTERVAL = 10000; // 10 seconds

    // Function to create video slide with thumbnail that plays on click
    function createVideoSlide(video) {
        return `
            <div class="video-slide" data-video-id="${video.id}">
                <div class="video-thumbnail position-relative">
                    <img src="${video.thumbnail}" alt="${video.title}" class="img-fluid w-100 rounded-3 shadow">
                    <div class="play-button position-absolute top-50 start-50 translate-middle">
                        <div class="play-icon d-flex align-items-center justify-content-center">
                            <i class="bi bi-play-fill fs-1"></i>
                        </div>
                    </div>
                </div>
                <div class="video-iframe d-none">
                    <div class="ratio ratio-16x9 shadow-lg rounded-3 overflow-hidden">
                        <iframe 
                            src="" 
                            title="${video.title}" 
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                        </iframe>
                    </div>
                </div>
            </div>
        `;
    }

    // Function to update video info
    function updateVideoInfo(index) {
        if (!videos[index]) return;
        
        videoTitle.textContent = videos[index].title;
        videoDescription.textContent = videos[index].description || 'Watch my latest market analysis and stock insights';
        watchOnYtBtn.href = `https://youtu.be/${videos[index].id}`;
        
        // Update active dot
        const dots = document.querySelectorAll('.video-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Function to show video at specific index
    function showVideo(index) {
        if (index < 0) index = videos.length - 1;
        if (index >= videos.length) index = 0;
        
        currentVideoIndex = index;
        const slides = document.querySelectorAll('.video-slide');
        
        // Hide all slides and reset to thumbnail view
        slides.forEach((slide, i) => {
            slide.style.display = 'none';
            const thumbnail = slide.querySelector('.video-thumbnail');
            const iframeContainer = slide.querySelector('.video-iframe');
            if (thumbnail && iframeContainer) {
                thumbnail.classList.remove('d-none');
                iframeContainer.classList.add('d-none');
            }
        });
        
        // Show current slide
        if (slides[index]) {
            slides[index].style.display = 'block';
        }
        
        updateVideoInfo(index);
    }

    // Function to create navigation dots
    function createDots() {
        dotsContainer.innerHTML = '';
        videos.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('video-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                resetInterval();
                showVideo(index);
            });
            dotsContainer.appendChild(dot);
        });
    }

    // Function to reset the slide interval
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextVideo, SLIDE_INTERVAL);
    }

    // Navigation functions
    function nextVideo() {
        showVideo(currentVideoIndex + 1);
        resetInterval();
    }

    function prevVideo() {
        showVideo(currentVideoIndex - 1);
        resetInterval();
    }

    // Event listeners for navigation buttons
    if (prevBtn) prevBtn.addEventListener('click', prevVideo);
    if (nextBtn) nextBtn.addEventListener('click', nextVideo);

    // Load videos (using a simple approach without API key)
    function loadVideos() {
        try {
            // Render videos
            videoContainer.innerHTML = videos.map(createVideoSlide).join('');
            
            // Create dots
            createDots();
            
            // Show first video
            showVideo(0);
            
            // Start slideshow
            resetInterval();
            
        } catch (error) {
            console.error('Error loading videos:', error);
            videoContainer.innerHTML = `
                <div class="alert alert-warning">
                    Unable to load videos. Please check back later.
                </div>
            `;
        }
    }

    // Function to handle video play when thumbnail is clicked
    function setupVideoPlayback() {
        document.addEventListener('click', function(e) {
            const thumbnail = e.target.closest('.video-thumbnail');
            if (!thumbnail) return;
            
            const videoSlide = thumbnail.closest('.video-slide');
            if (!videoSlide) return;
            
            const videoId = videoSlide.dataset.videoId;
            const iframeContainer = videoSlide.querySelector('.video-iframe');
            const iframe = iframeContainer.querySelector('iframe');
            
            if (iframe && iframe.src === '') {
                iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            }
            
            thumbnail.classList.add('d-none');
            iframeContainer.classList.remove('d-none');
        });
    }

    // Only run if the elements exist on the page
    if (videoContainer) {
        // Load the YouTube iframe API
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        
        // Load videos
        loadVideos();
        setupVideoPlayback();
    }
});
