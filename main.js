
import { analyzePillImage } from './ai.js';

class PillResult extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
            display: block;
            margin-top: 2rem;
        }
        .result-card {
            background-color: rgba(30, 41, 59, 0.8);
            border-radius: 1.5rem;
            padding: 2rem;
            border: 1px solid rgba(59, 130, 246, 0.3);
            backdrop-filter: blur(10px);
            display: flex;
            gap: 1.5rem;
            align-items: center;
        }
        #pillImage {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid #3b82f6;
            box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
        }
        .info {
            flex-grow: 1;
        }
        h3 {
            margin: 0 0 0.5rem 0;
            color: #f8fafc;
            font-size: 1.5rem;
        }
        p {
            margin: 0.2rem 0;
            color: #cbd5e1;
        }
        strong {
            color: #93c5fd;
            font-weight: 500;
        }
      </style>
      <div class="result-card">
        <img id="pillImage" src="" alt="Pill Image">
        <div class="info">
            <h3 id="pillName"></h3>
            <p><strong>성분:</strong> <span id="ingredient"></span></p>
            <p><strong>제조사:</strong> <span id="company"></span></p>
        </div>
      </div>
    `;
  }

  static get observedAttributes() {
    return ['image-src', 'pill-name', 'ingredient', 'company'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'image-src':
        this.shadowRoot.querySelector('#pillImage').src = newValue;
        break;
      case 'pill-name':
        this.shadowRoot.querySelector('#pillName').textContent = newValue;
        break;
      case 'ingredient':
        this.shadowRoot.querySelector('#ingredient').textContent = newValue;
        break;
      case 'company':
        this.shadowRoot.querySelector('#company').textContent = newValue;
        break;
    }
  }
}
customElements.define('pill-result', PillResult);

class PillReferences extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          margin-top: 2rem;
        }
        .references-container {
          background-color: rgba(30, 41, 59, 0.8);
          border-radius: 1.5rem;
          padding: 2rem;
          border: 1px solid rgba(59, 130, 246, 0.3);
        }
        h4 {
          margin: 0 0 1.5rem 0;
          color: #e2e8f0;
          font-size: 1.25rem;
          border-bottom: 1px solid rgba(59, 130, 246, 0.2);
          padding-bottom: 0.75rem;
        }
        .image-gallery {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .image-gallery img {
          width: 100%;
          height: 100px;
          object-fit: cover;
          border-radius: 0.75rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .image-gallery img:hover {
            transform: scale(1.05);
            box-shadow: 0 0 15px rgba(59, 130, 246, 0.4);
        }
        .description-box {
            background-color: rgba(10, 25, 47, 0.5);
            padding: 1rem;
            border-radius: 0.75rem;
            color: #cbd5e1;
            font-size: 0.95rem;
            line-height: 1.6;
            margin-bottom: 1.5rem;
        }
        .external-link {
          display: inline-block;
          background: linear-gradient(145deg, #1e40af, #2563eb);
          color: white;
          text-decoration: none;
          font-weight: 600;
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .external-link:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(37, 99, 235, 0.5);
        }
      </style>
      <div class="references-container">
        <h4 id="referenceTitle"></h4>
        <div class="image-gallery">
          <img class="ref-image" src="" alt="Reference Image 1">
          <img class="ref-image" src="" alt="Reference Image 2">
          <img class="ref-image" src="" alt="Reference Image 3">
        </div>
        <div class="description-box">
            <p id="descriptionText"></p>
        </div>
        <a id="googleSearchLink" class="external-link" href="#" target="_blank" rel="noopener noreferrer">
            Google 이미지에서 더 보기
        </a>
      </div>
    `;
  }

  static get observedAttributes() {
    return ['pill-name', 'image-src', 'description'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'pill-name') {
      this.shadowRoot.querySelector('#referenceTitle').textContent = `'${newValue}' 관련 자료`;
      this.shadowRoot.querySelector('#googleSearchLink').href = `https://www.google.com/search?q=${encodeURIComponent(newValue)}&tbm=isch`;
    }
    if (name === 'image-src') {
        this.shadowRoot.querySelectorAll('.ref-image').forEach(img => img.src = newValue);
    }
    if (name === 'description') {
        this.shadowRoot.querySelector('#descriptionText').textContent = newValue;
    }
  }
}
customElements.define('pill-references', PillReferences);

class PillIdentifier extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 500px;
          margin: 2rem auto;
        }
        .container {
          background-color: rgba(10, 25, 47, 0.7);
          border-radius: 1.5rem;
          padding: 2.5rem;
          text-align: center;
          border: 1px solid rgba(59, 130, 246, 0.3);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2), inset 0 0 15px rgba(59, 130, 246, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
          transition: all 0.5s ease;
        }
        .control-button {
            background: linear-gradient(145deg, #3b82f6, #60a5fa);
            color: white;
            font-size: 1.1rem;
            font-weight: 600;
            padding: 1rem 2.5rem;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
            margin-top: 1rem;
        }
        .control-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.6);
        }
        .control-button:disabled {
            background: #475569;
            cursor: not-allowed;
            box-shadow: none;
            transform: none;
        }

        #fileInput { display: none; }
        #previewContainer {
          display: none;
          margin-top: 2rem;
          position: relative;
          border-radius: 1rem;
          overflow: hidden;
          border: 2px dashed rgba(59, 130, 246, 0.4);
        }
        #imagePreview { width: 100%; height: auto; display: block; }
        .scanner-line {
          position: absolute; top: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.8), transparent);
          box-shadow: 0 0 10px #60a5fa, 0 0 20px #60a5fa;
          animation: scan 3s infinite linear; opacity: 0;
        }
        #statusText { margin-top: 1rem; color: #94a3b8; font-weight: 500; min-height: 24px; }
        #controls, #analysisControls { margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center; }
        .secondary-button { background-color: rgba(255, 255, 255, 0.1); color: #e2e8f0; border: 1px solid rgba(255, 255, 255, 0.2); }
        .secondary-button:hover { background-color: rgba(255, 255, 255, 0.2); }

        @keyframes scan { 
            0% { transform: translateY(0); opacity: 1; } 
            100% { transform: translateY(calc(100% - 4px)); opacity: 1; }
        }
      </style>
      <div class="container">
        <button id="uploadButton" class="control-button">💊 사진 업로드 또는 촬영</button>
        <input type="file" id="fileInput" accept="image/*" capture="environment">
        <div id="previewContainer">
          <img id="imagePreview" src="" alt="Pill preview">
          <div class="scanner-line"></div>
        </div>
        <p id="statusText">분석할 알약 이미지를 선택하세요.</p>
        <div id="analysisControls" style="display: none;">
            <button id="analyzeButton" class="control-button">AI 분석 시작</button>
            <button id="rescanButton" class="control-button secondary-button">다시 선택</button>
        </div>
        <div id="result-container"></div>
      </div>
    `;
  }

  connectedCallback() {
    const uploadButton = this.shadowRoot.querySelector('#uploadButton');
    const fileInput = this.shadowRoot.querySelector('#fileInput');
    const previewContainer = this.shadowRoot.querySelector('#previewContainer');
    const imagePreview = this.shadowRoot.querySelector('#imagePreview');
    const scannerLine = this.shadowRoot.querySelector('.scanner-line');
    const statusText = this.shadowRoot.querySelector('#statusText');
    const analysisControls = this.shadowRoot.querySelector('#analysisControls');
    const analyzeButton = this.shadowRoot.querySelector('#analyzeButton');
    const rescanButton = this.shadowRoot.querySelector('#rescanButton');
    const resultContainer = this.shadowRoot.querySelector('#result-container');

    const openFileDialog = () => fileInput.click();

    uploadButton.addEventListener('click', openFileDialog);
    rescanButton.addEventListener('click', () => {
        // Reset UI for re-selection
        fileInput.value = ''; // Clear the selected file
        previewContainer.style.display = 'none';
        analysisControls.style.display = 'none';
        resultContainer.innerHTML = '';
        uploadButton.style.display = 'inline-block';
        statusText.textContent = '분석할 알약 이미지를 선택하세요.';
        openFileDialog();
    });

    fileInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        imagePreview.src = URL.createObjectURL(file);
        previewContainer.style.display = 'block';
        scannerLine.style.animation = 'scan 2s infinite cubic-bezier(0.5, 0, 0.5, 1)';
        statusText.textContent = '분석 준비 완료! 버튼을 눌러주세요.';
        uploadButton.style.display = 'none';
        analysisControls.style.display = 'flex';
        resultContainer.innerHTML = '';
        analyzeButton.disabled = false;
        analyzeButton.style.display = 'inline-block';
        rescanButton.textContent = '다시 선택';
      }
    });

    analyzeButton.addEventListener('click', async () => { // Make this async
        statusText.textContent = 'AI가 이미지를 분석 중입니다...';
        analyzeButton.disabled = true;
        rescanButton.disabled = true;
        scannerLine.style.animationDuration = '0.5s';

        // --- New: Call the AI module ---
        const detectedPill = await analyzePillImage(imagePreview.src);

        previewContainer.style.display = 'none';
        statusText.textContent = '분석 완료!';
        analyzeButton.style.display = 'none'; // Hide analyze button
        rescanButton.disabled = false;
        rescanButton.textContent = '새로운 분석하기'; // Change text for clarity

        // Create and append result card
        const result = document.createElement('pill-result');
        result.setAttribute('image-src', detectedPill.imageSrc);
        result.setAttribute('pill-name', detectedPill.pillName);
        result.setAttribute('ingredient', detectedPill.ingredient);
        result.setAttribute('company', detectedPill.company);
        resultContainer.appendChild(result);

        // Create and append reference card
        const references = document.createElement('pill-references');
        references.setAttribute('pill-name', detectedPill.pillName);
        references.setAttribute('image-src', detectedPill.imageSrc);
        references.setAttribute('description', detectedPill.description);
        resultContainer.appendChild(references);
    });
  }
}

customElements.define('pill-identifier', PillIdentifier);
