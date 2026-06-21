class InteractiveCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const title = this.getAttribute('title') || 'Default Title';
        const message = this.getAttribute('message') || 'Default Message';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    cursor: pointer;
                }
                .card {
                    padding: 2rem;
                    border-radius: 15px;
                    background: #ffffff;
                    box-shadow: 
                        0 10px 20px rgba(0,0,0,0.1), 
                        0 6px 6px rgba(0,0,0,0.15);
                    transition: all 0.3s ease-in-out;
                    text-align: center;
                }
                .card:hover {
                    transform: translateY(-5px);
                    box-shadow: 
                        0 15px 30px rgba(0,0,0,0.15), 
                        0 10px 10px rgba(0,0,0,0.2);
                }
                .card.clicked {
                    box-shadow: 
                        0 0 30px 10px var(--glow-color, rgba(0, 123, 255, 0.5)),
                        0 10px 20px rgba(0,0,0,0.1);
                }
                h3 {
                    font-size: 1.8rem;
                    color: var(--primary-color, #007bff);
                    margin: 0 0 0.5rem 0;
                }
                p {
                    font-size: 1.1rem;
                    margin: 0;
                }
            </style>
            <div class="card">
                <h3>${title}</h3>
                <p>${message}</p>
            </div>
        `;

        this.cardElement = this.shadowRoot.querySelector('.card');
    }

    connectedCallback() {
        this.addEventListener('click', () => {
            this.cardElement.classList.toggle('clicked');
        });
    }
}

customElements.define('interactive-card', InteractiveCard);
