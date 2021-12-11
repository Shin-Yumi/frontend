class SmoothScroll {
    constructor(options) {
        this.opt = options || {}
        this.el = this.opt.el ? this.opt.el : '.smooth-scroll'
        this.speed = this.opt.speed ? this.opt.speed : 0.1
        this.init()
    }
    
    init() {
        this.scrollY = 0
        this.smoothScroll = document.querySelectorAll(this.el)[0]
        this.smoothScroll.classList.add('smooth-scroll')
        this.events()
        this.update()
        this.animate()
    }
    
    update() {
        if (this.smoothScroll === null) return
        document.body.style.height = `${this.smoothScroll.getBoundingClientRect().width* 0.918}px`
    }
    
    pause() {
        document.body.style.overflow = 'hidden'
        cancelAnimationFrame(this.raf)
    }
    
    play() {
        document.body.style.overflow = 'inherit'
        this.raf = requestAnimationFrame(this.animate.bind(this))
    }
    
    destroy() {
        this.smoothScroll.classList.remove('smooth-scroll')
        this.smoothScroll.style.transform = 'none'
        document.body.style.overflow = 'inherit'
        window.removeEventListener('resize', this.update)
        cancelAnimationFrame(this.raf)
        delete this.smoothScroll
    }
    
    animate() {
        this.scrollY += (window.scrollY - this.scrollY) * this.speed
        console.log(scrollY)
        this.smoothScroll.style.transform = `translate3d(${-this.scrollY}px,0,0)`
        this.raf = requestAnimationFrame(this.animate.bind(this))
    }
    
    scrollTo(y) {
        window.scrollTo(0, y)
    }
    
    staticScrollTo(y) {
        cancelAnimationFrame(this.raf)
        this.scrollY = y
        window.scrollTo(0, y)
        this.smoothScroll.style.transform = `translate3d(0,${-y}px,0)`
        this.play()
    }
    
    events() {
        window.addEventListener('load', this.update.bind(this))
        window.addEventListener('resize', this.update.bind(this))
    }
    }
    
    const smoothScroll = new SmoothScroll({
    el: '#contents',
    speed: 0.05
    })