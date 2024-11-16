class Modal {
    constructor(modalID) {
        this.modalID = modalID;
        this.modal = document.getElementById(this.modalID);
        this.close = document.querySelectorAll('.close-' + this.modalID);
        this.open = document.querySelectorAll('.open-' + this.modalID);
    }

    init() {
        this.modal.style.display = 'none';
        this.modal.style.opacity = 0;
        this.modal.classList.add('modal-hidden');

        this.events();
    }

    events() {
        this.open.forEach((open) => {
            open.addEventListener('click', (e) => {
                e.preventDefault();
                this.openModal();
            });
        });

        this.close.forEach((close) => {
            close.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeModal();
            });
        });
        const closemodal = this.modal.querySelector('.close-modal');
        if (closemodal) {
            closemodal.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeModal();
            });
        }

        document.querySelectorAll('[data-modal-open="#' + this.modalID + '"]').forEach((open) => {
            open.addEventListener('click', (e) => {
                e.preventDefault();
                this.openModal();
            });
        });
        document.querySelectorAll('[data-modal-toggle="#' + this.modalID + '"]').forEach((toggle) => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleModal();
            });
        });


    }

    toggleModal() {
        if (this.modal.classList.contains('modal-visible')) {
            this.closeModal();
        } else {
            this.openModal();
        }
    }

    openModal() {
        const activeModal = document.querySelector('.modal-visible');
        if(activeModal) return;
        const overlay = document.querySelector('.overlay');
        if (overlay) {
            overlay.remove();
        }
        this.modal = document.getElementById(this.modalID);
        this.modal.style.display = 'block';
        if (this.modal.classList.contains('modal-visible')) {
            return;
        }
        const body = document.querySelector('body');
        body.style.overflow = 'hidden';
        setTimeout(() => {
            this.modal.style.opacity = 1;
            this.modal.classList.remove('modal-hidden');
            this.modal.classList.add('modal-visible');
            this.createOverlay();
        }, 10);
    }

    closeModal() {
        const body = document.querySelector('body');
        body.style.overflow = 'auto';
        this.modal.style.opacity = 0;
        this.modal.classList.add('modal-hidden');
        this.modal.classList.remove('modal-visible');
        setTimeout(() => {

            this.modal.style.display = 'none';
        this.removeOverlay();
        }, 30);
    }

    closeModelName(nameModal) {
        const modal = document.getElementById(nameModal);
        modal.style.opacity = 0;
        setTimeout(() => {
            modal.classList.remove('modal-visible');
            modal.classList.add('modal-hidden');
            modal.style.display = 'none';
        }, 500);
        this.removeOverlay();
    }

    createOverlay() {
        const IsOverlay = document.querySelector('.overlay');
        if (IsOverlay) return;
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);
        if(this.modalID === 'itemModal') {
            overlay.style.backgroundColor = 'rgba(255,255,255,0.5)';
        }
        setTimeout(() => {
            overlay.classList.add('overlay-visible');
        }, 10);
        overlay.addEventListener('click', () => {
            this.closeModal();
        });
    }

    removeOverlay() {
        const overlay = document.querySelector('.overlay');
        if (overlay) {
            overlay.classList.remove('overlay-visible');
            setTimeout(() => {
                overlay.remove();
            }, 500); // Задержка для завершения анимации
        }
    }
}

export default Modal;
