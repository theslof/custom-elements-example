const styles = `
.wrapper {
  width: 100%;
  height: 100%;
  max-height: 44px;
  border: thin solid #222;
  overflow-y: hidden;
  border-radius: 4px;
  box-sizing: border-box;
  transition: max-height 250ms ease
}

.title {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 8px;
  font-size: 20px;
  cursor: pointer;
  user-select: none;
}

.accordion {
  padding: 0 8px 8px;
}
`

class JtAccordion extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })

    this.styleNode = document.createElement('style')
    this.styleNode.textContent = styles

    this.wrapperEl = document.createElement('div')
    this.wrapperEl.classList.add('wrapper')

    this.titleEl = document.createElement('h1')
    this.titleEl.classList.add('title')
    this.titleEl.textContent = this.getAttribute('title')
    this.titleEl.onclick = this.toggleAccordion.bind(this)

    this.accordionEl = document.createElement('div')
    this.accordionEl.classList.add('accordion')

    this.slotEl = document.createElement('slot')
    this.accordionEl.appendChild(this.slotEl)

    this.wrapperEl.append(this.titleEl, this.accordionEl)
    this.shadowRoot.append(this.styleNode, this.wrapperEl)

    this.open = false
  }

  toggleAccordion() {
    this.open = !this.open
    if (this.open) {
      this.wrapperEl.style.maxHeight = this.titleEl.offsetHeight + this.accordionEl.offsetHeight + 'px'
    } else {
      this.wrapperEl.style.maxHeight = this.titleEl.offsetHeight + 'px'
    }
  }
}

customElements.define('jt-accordion', JtAccordion)
