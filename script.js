const player = document.querySelector(".player");
      const video = player.querySelector(".viewer");
      const progress = player.querySelector(".progress");
      const progressBar = player.querySelector(".progress__filled");
      const toggle = player.querySelector(".toggle");
      const ranges = player.querySelectorAll(".player__slider");
      const skipButtons = player.querySelectorAll("[data-skip]");

      // Toggle play/pause
      function togglePlay() {
        const method = video.paused ? "play" : "pause";
        video[method]();
      }

      // Update play/pause button
      function updateButton() {
        const icon = video.paused ? "►" : "❚ ❚";
        toggle.textContent = icon;
      }

      // Skip video by specific time
      function skip() {
        video.currentTime += parseFloat(this.dataset.skip);
      }

      // Handle range inputs (volume and playback speed)
      function handleRangeUpdate() {
        video[this.name] = this.value;
      }

      // Update progress bar
      function handleProgress() {
        const percent = (video.currentTime / video.duration) * 100;
        progressBar.style.width = `${percent}%`;
      }

      // Scrub video to specific time
      function scrub(e) {
        const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
        video.currentTime = scrubTime;
      }

      // Event listeners
      video.addEventListener("click", togglePlay);
      video.addEventListener("play", updateButton);
      video.addEventListener("pause", updateButton);
      video.addEventListener("timeupdate", handleProgress);

      toggle.addEventListener("click", togglePlay);

      skipButtons.forEach((button) => button.addEventListener("click", skip));
      ranges.forEach((range) =>
        range.addEventListener("change", handleRangeUpdate)
      );
      ranges.forEach((range) =>
        range.addEventListener("mousemove", handleRangeUpdate)
      );

      let mousedown = false;
      progress.addEventListener("click", scrub);
      progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
      progress.addEventListener("mousedown", () => (mousedown = true));
      progress.addEventListener("mouseup", () => (mousedown = false));