(function () {
  const dropzone = document.querySelector("#resumeDropzone");
  const fileInput = document.querySelector("#resumeFile");
  const status = document.querySelector("#resumeStatus");
  const maxFileSize = 5 * 1024 * 1024;
  const allowedExtensions = /\.(pdf|doc|docx)$/i;

  function showFile(file) {
    if (!allowedExtensions.test(file.name)) {
      status.textContent = "Choose a PDF, DOC, or DOCX file.";
      status.classList.add("is-error");
      fileInput.value = "";
      return;
    }

    if (file.size > maxFileSize) {
      status.textContent = "The file is larger than 5 MB. Choose a smaller resume.";
      status.classList.add("is-error");
      fileInput.value = "";
      return;
    }

    status.classList.remove("is-error");
    status.textContent = `${file.name} selected (${formatSize(file.size)}). This demo does not upload or save it.`;
  }

  function formatSize(bytes) {
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  fileInput.addEventListener("change", () => {
    const [file] = fileInput.files;
    if (file) showFile(file);
  });

  ["dragenter", "dragover"].forEach((eventName) => {
    dropzone.addEventListener(eventName, (event) => {
      event.preventDefault();
      dropzone.classList.add("is-dragging");
    });
  });

  ["dragleave", "drop"].forEach((eventName) => {
    dropzone.addEventListener(eventName, (event) => {
      event.preventDefault();
      dropzone.classList.remove("is-dragging");
    });
  });

  dropzone.addEventListener("drop", (event) => {
    const [file] = event.dataTransfer.files;
    if (file) showFile(file);
  });
})();
