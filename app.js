// 1. Render songs 
// 2.Scroll top 
// 3. Play / Pause / seek 
// 4. CD routate
// 5. Next / prev 
// 6. Random
// 7. Next / Repeat when ended
// 8. Active song 
// 9. Scroll active song into view 
// 10.Play song when click 
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const cd = $('.cd')
const heading= $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn= $('.btn-toggle-play')
const player= $('.player')
const playlist = $('.playlist')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn= $('.btn-repeat')
const app ={
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs:[ 
    {
        name: 'Despacito',
        singer: 'Luis Fonsi',
        path:'./assets/music/Luis\ Fonsi\ -\ Despacito\ ft.\ Daddy\ Yankee.mp3',
        image: './assets/img/Despacito.jpg'
    },
    {
        name: 'Shape of you',
        singer: 'Ed Sheeran',
        path:'./assets/music/Ed\ Sheeran\ -\ Shape\ of\ You\ \(Official\ Music\ Video\).mp3',
        image: './assets/img/Shape of you.jpg'
    },
    {
        name: 'Counting Start',
        singer: 'OneRepublic',
        path:'./assets/music/OneRepublic - Counting Stars (Official Music Video).mp3',
        image: './assets/img/one republic.jpg'
    },
    {
        name: 'Photograph',
        singer: 'Ed Sheeran',
        path:'./assets/music/Ed Sheeran - Photograph (Official Music Video).mp3',
        image: './assets/img/photograph.jpg'
    },
    {
        name: 'See you again',
        singer: 'Wiz Khalifa',
        path:'./assets/music/Wiz Khalifa - See You Again ft. Charlie Puth [Official Video] Furious 7 Soundtrack.mp3',
        image: './assets/img/see you again.jpg'
    },
    {
        name: 'Attention',
        singer: 'Charlie Puth',
        path:'./assets/music/Charlie Puth - Attention [Official Video].mp3',
        image: './assets/img/attention.jpg'
    },
    {
        name: 'Sugar',
        singer: 'Maroon 5',
        path:'./assets/music/Maroon 5 - Sugar (Official Music Video).mp3',
        image: './assets/img/sugar.jpg'
    },
    {
        name: 'We don\'t talk anymore',
        singer: 'Ed Sheeran',
        path:'./assets/music/Charlie Puth - We Dont Talk Anymore (feat. Selena Gomez) [Official Video].mp3',
        image: './assets/img/we dont talk anymore.jpg'
    },
    {
        name: 'All of me',
        singer: 'John Legend',
        path:'./assets/music/John Legend - All of Me (Official Video).mp3',
        image: './assets/img/all of me.jpg'
    },
    {
        name: 'Faded',
        singer: 'Alan Walker',
        path:'./assets/music/Alan Walker - Faded.mp3',
        image: './assets/img/faded.jpg'
    },
    {
        name: 'Hello',
        singer: 'Adele',
        path:'./assets/music/Adele - Hello.mp3',
        image: './assets/img/hello.jpg'
    },
    {
        name: 'The Spectre',
        singer: 'Alan Walker',
        path:'./assets/music/Alan Walker - The Spectre.mp3',
        image: './assets/img/the spectre.jpg'
    },
    {
        name: 'Alone',
        singer: 'Alan Walker',
        path:'./assets/music/Alan Walker - Alone.mp3',
        image: './assets/img/alone.jpg'
    },
    {
        name: 'Cry On My Shoulder',
        singer: 'Super Start',
        path:'./assets/music/Cry On My Shoulder - Super Star.mp3',
        image: './assets/img/cry on my shoulder.jpg'
    },
    {
        name: 'I\'m Not The Only One',
        singer: 'Sam Smith',
        path:'./assets/music/Sam Smith - Im Not The Only One (Official Video).mp3',
        image: './assets/img/iam not the only one.jpg'
    },
    ],
    defineProperties: function(){
        // Define current song
        Object.defineProperty(this,'currentSong',{
            get: function(){
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvent: function(){
        const _this = this
        // X??? l?? CD quay
        const cdThumbAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ],{
            duration:10000 //10 seconds
            ,iteration:Infinity
        })
        cdThumbAnimate.pause()
        // Ph??ng to thu nh??? CD
        document.onscroll= function(){
            // Xem k??ch th?????c c???a cd d??ng property offsetWidth
            const cdWidth = cd.offsetWidth 
            document.onscroll= function(){
                const scrollTop = window.scrollY || document.documentElement.scrollTop
                const newCdWidth = cdWidth - scrollTop
                cd.style.width= newCdWidth > 0 ? newCdWidth + 'px' : 0
                cd.style.opacity = newCdWidth / cdWidth
            }
        }
        // Khi click Play Button
        playBtn.onclick = function(){
            if(_this.isPlaying){
                audio.pause()
            }else{
                audio.play()
            }
        }
        // Khi B??i h??t ???????c Play
        audio.onplay = function(){
            _this.isPlaying= true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }
        // Khi B??i h??t ???????c Pause
        audio.onpause = function(){
            _this.isPlaying= false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }
        // Khi ti???n ????? b??i h??t thay ?????i
        audio.ontimeupdate = function(){
            if(audio.duration){
                const progressPercent = Math.floor((audio.currentTime / audio.duration) * 100)
                progress.value = progressPercent
            }
            // console.log(audio.currentTime / audio.duration * 100)
            // currentTime: Th???i gian hi???n t???i
            // Duration: T???ng s??? gi??y c???a b??i h??t
        }
        // X??? l?? khi tua b??i h??t
        progress.onchange= function(e){
            const seekTime = (audio.duration / 100) * e.target.value
            audio.currentTime = seekTime
        }
        // Khi next b??i h??t
        nextBtn.onclick= function(){
            if(_this.isRandom){
                _this.playRandomSong()
            }else{
                _this.nextSong()
            }

            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }
        // Khi prev B??i h??t
        prevBtn.onclick = function(){
            if(_this.isRandom){
                _this.playRandomSong()
            }else{
                _this.prevSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }
        // Random button
        randomBtn.onclick= function(){
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle('active',_this.isRandom)
            // Toggle('class' , boolean) : N???u boolean = true th?? add class ko th?? ng?????c l???i
        }
        // X??? l?? next Song khi audio ended
        audio.onended = function(){
            if(_this.isRepeat){
                audio.play()
            }else{
                nextBtn.click() // T??? click
            }
        }
        // X??? l?? khi ???n n??t repeat ????? l???p l???i 1 song
        repeatBtn.onclick= function(){
            _this.isRepeat = !_this.isRepeat
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }
        // L???ng nghe h??nh vi click v??o playlist
        playlist.onclick = function(e){
            const songNode = e.target.closest('.song:not(.active)')
            if(e.target.closest('.song:not(.active)') || e.target.closest('.option')){     //closest target ?????n ch??nh n?? ho???c th??? cha c???a n?? (closest('.class'))
                // X??? l?? khi click v??o song
                if(e.target.closest('.song:not(.active)')){
                    // console.log(songNode.getAttribute('data-index')) //Ho???c c?? th??? d??ng songNode.dataset.index
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                }
                // X??? l?? khi click v??o option
                else if(e.target.closest('.option')){
                    alert('Kh??ng th??? t???i nh???c v?? l?? do b???n quy???n!')
                }
            }
        }

    },
    scrollToActiveSong: function(){
        setTimeout(()=>{
            $('.song.active').scrollIntoView({
                bahavior: 'smooth',
                block:'nearest'
            })
        },300)
    },
    loadCurrentSong: function(){
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage =  `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    nextSong:function(){
        this.currentIndex++
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0;
        }
        this.loadCurrentSong()
    },
    playRandomSong: function(){
        let newIndex
        do{
            newIndex = Math.floor(Math.random() * this.songs.length)
        }while(newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    prevSong: function(){
        this.currentIndex--
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length -1 
        }
        this.loadCurrentSong()
    },
    render: function(){
        const htmls= this.songs.map((song,index) =>{
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index= "${index}">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>
            `
        })
        $('.playlist').innerHTML = htmls.join('')
    },
    start: function(){
        // ?????nh ngh??a c??c thu???c t??nh cho Object
        this.defineProperties()
        // L???ng nghe v?? x??? l?? c??c s??? ki???n
        this.handleEvent()
        // T???i th??ng tin b??i h??t ?????u ti??n v??o UI khi ch???y
        this.loadCurrentSong()
        // Render playlist
        this.render()
    }
}
app.start()
